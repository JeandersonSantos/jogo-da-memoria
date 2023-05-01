import styled from "styled-components";
 export const Container=styled.div`
    width: 200px;
    height: 50px;
    display: flex;//para que o icone fique do lado da label
    background-color: #1550FF;
    border-radius: 10px;
    cursor:pointer;
    opacity: 1;
    transition: all ease .3s;
    &:hover{//quando passar o mause
        opacity: .8;
    }
 `;
 export const IconArea=styled.div`
    height: inherit;//herda a altura
    display: flex;
    justify-content: center;//centraliza
    align-items: center;
    border-right: 1px solid rgba(255,255,255,.2);
    padding: 0 15px;
 `;
 export const Icon=styled.img`
    height: 20px;
 `;
 export const Label=styled.div`
    height: inherit;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;//para ocupar todo espaço disponível
    padding: 0 20px;
 `;