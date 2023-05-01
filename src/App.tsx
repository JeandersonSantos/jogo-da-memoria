import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button';
import {InfoItem}from './components/InfoItem';
const App = ()=>{
const resetAndCreateGrid=()=>{

}
  return(
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
            <img src={logoImage} width="200" alt=""/>
        </C.LogoLink>   
        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label ='Movimentos' value='0'/>
        </C.InfoArea>
        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid}/>         
      </C.Info>
      <C.GridArea>
      ...  
      </C.GridArea>
    </C.Container>
  )
}
export default App;