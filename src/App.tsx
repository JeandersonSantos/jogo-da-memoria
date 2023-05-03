import { useEffect, useState } from "react";
import * as C from "./App.styles";

import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";

import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";

import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false); //se o jogo esta em andamento ou não
  const [timeElapsed, setTimeElapsed] = useState<number>(0); //tempo decorrido
  const [moveCount, setMoveCount] = useState<number>(0); //quantidade de movimento
  const [showCount, setShowCount] = useState<number>(0); //quantidade de itens foram exibidas
  const [gridItems, setGridItems] = useState<GridItemType[]>([]); //array com os grids
  useEffect(() => resetAndCreateGrid(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000); // de 1 em 1 segundo executa alguma coisa
    return () => clearInterval(timer); //quando sair da memoria para o time, o return do useffect serve para isso
  }, [playing, timeElapsed]);
  //Verificar se os abertos são iguais
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true); //pega array só com os items que estão com o shown = true
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          //v1 - se ele são iguais torna-los permanente
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) tmpGrid[i].permanentShown = true;
            tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          //v2 - se eles não são iguais feche-os
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShowCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);
  //Verificar se o jogo acabou
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){//o every retorna um bollean , ele analiza a condição inseriada em todos os items do array
      setPlaying(false);
    }
  },[moveCount,gridItems])
  const resetAndCreateGrid = () => {
    //passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    //passo 2 - criar o grid e começar o jogo
    //2.1 - Criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    //2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          //para não preencher a mesma posição duas vezes
          pos = Math.floor(Math.random() * (items.length * 2)); //gera uma posição aleatória
        }
        tmpGrid[pos].item = i;
      }
    }
    //2.3 - jogar no state
    setGridItems(tmpGrid);
    //passo 3 - começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems]; //quando tenho o arry com objetos e eu quero mudar e ele esta no state eu crio um clone dele
      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)} //saber qual foi o item clicado
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};
export default App;
