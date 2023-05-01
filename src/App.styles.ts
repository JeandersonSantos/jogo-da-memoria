import styled from 'styled-components';
export const Container = styled.div`
    width:100%;
    max-width:750px;//largura máxima para o projeto
    margin:auto;//deixa no meio
    display: flex;//pra ficar ao lado do outro
    padding: 50px 0;//50 em cima e em baixo e 0 na lateral

    @media(max-width:750px){
        flex-direction:column;//um abaixo do outro
    }    
`;
export const Info = styled.div`
    display:flex;
    flex-direction:column;//informação embaixo da outra
    width:auto;//largura automática
    
    @media (max-width:750px){
        margin-bottom:50px;
        align-items:center;
    }
`;
export const LogoLink = styled.a`
    display:block; //para que nada fique ao lado
`;
export const InfoArea = styled.div`
    width:100%;
    margin:10px 0;

    @media(max-width:750px){
        display:flex;//um ao lado da outra
        justify-content:space-around;//disponível na tela igualmente
        text-align:center;//texto centralizado
    }
`;
export const GridArea = styled.div`
    flex:1;//espaço disponível
    display:flex;
    justify-content:flex-end;//joga para p lado direito da tela

    @media(max-width:750px){
        justify-content:center;//para que fique no meio
        margin:0 20px;
    }
`;
