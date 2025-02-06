import styled, { keyframes } from 'styled-components';

import { ReactComponent as Stocks } from '../../assets/icons/bar-chart-graph-svgrepo-com.svg';
import { ReactComponent as User } from '../../assets/icons/user1.svg';
import { ReactComponent as Users } from '../../assets/icons/users1.svg';
import { ReactComponent as Work } from '../../assets/icons/carbon1.svg';
import { ReactComponent as Settings } from '../../assets/icons/configuracoes7.svg';

export const SidebarContainer = styled.div`
  background-color: #f6f6f6;
  width: ${({ collapsed }) => (collapsed ? "5vw" : "15vw")};
  min-height: 100vh; /* Garante altura mínima de 100% da viewport */
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease-in-out;
  position: relative; /* Permite empurrar o conteúdo */

  /* Garante que o conteúdo principal se ajuste ao lado do sidebar */
  & + main {
    margin-left: ${({ collapsed }) => (collapsed ? "5vw" : "15vw")};
    transition: margin-left 0.3s ease-in-out;
  }

  @media screen and (max-width: 768px) {
    width: ${({ showSidebar }) => (showSidebar ? "65vw" : "0")};
    min-height: 100vh; /* Continua com altura mínima de 100% da tela */
    opacity: ${({ showSidebar }) => (showSidebar ? 1 : 0)};
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
    overflow: hidden;
  }
`;


// mexer nessa altura de 153vh;

export const SidebarHeader = styled.div`
  background-color: #f6f6f6;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarMenuItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column; /* Centraliza o texto ao alterar a direção */
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  padding: ${({ collapsed }) => (collapsed ? "10px" : "10px 20px")};
  font-size: ${({ collapsed }) => (collapsed ? "12px" : "16px")};
  font-weight: 500;
  color: #606f7b;
  cursor: pointer;
  text-align: center;

  &::after {
    width: 80px;
    height: 10px;
    content: attr(data-label);
    position: absolute;
    background-color: rgba(0, 80, 0, 0.7);
    color: white;
    padding: 8px;
    border-radius: 10px;
    top: 10%;
    left: 50%; /* Alinha no centro horizontal */
    transform: translateX(-50%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
    visibility: ${({ collapsed }) => (collapsed ? "visible" : "hidden")};
    box-shadow: 2mm 2mm 2mm rgba(0, 0, 0, 0.5);
  }

  &:hover {
    background-color: lightgrey;
    color: #333;

    &::after {
      opacity: 1;
    }
  }

  &.active {
    background-color: silver;
    color: white;
  }

  @media screen and (max-width: 768px) {
    font-size: 8px;
    word-wrap: break-word;
  }

  /* Remova a função de clique e a mudança de cursor no label */
  &::after {
    pointer-events: none; /* Isso impede que o label receba cliques */
    cursor: default; /* Isso define o cursor de volta para o padrão */
  }
`;


export const SidebarMenuItemDiffer = styled.li` 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #606F7B;
  cursor: pointer;
  padding: ${({collapsed}) => collapsed ? "10px" : "10px 20px"};
  text-align: center;

  &:hover {
    background-color: #E5E5E5;
    color: #333;
  }

  li {
    background-color: red;
  }

  &.active {
    background-color: #1D2228;
    color: white;
  }

  @media screen and (max-width: 768px) {
      display: none;
  }
`;

export const SidebarFooter = styled.div`
  background-color: #f6f6f6;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SidebarIcon = styled.img`
  width: 30px;
`;

export const StyledUser = styled(User)`
  fill: ${({ active }) => (active ? "#fff" : "#000")};
  height: 32px;
  width: 12px;
  transform: scale(2.5);
`;

export const StyledStocks = styled(Stocks)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 12px;
  transform: scale(2.5);
`;

export const StyledUsers = styled(Users)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 12px;
  transform: scale(2.5);
`;

export const StyledSettings = styled(Settings)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 12px;
  transform: scale(2.5);
`;

export const StyledWork = styled(Work)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 12px;
  transform: scale(2.5);
`;

export const FakeBar = styled.div`
  background: red;
  height: 150vh;
  width: ${({collapsed}) => collapsed ? "50px" : "250px"};
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const ButtonForCellPhoneToOpenSidebar = styled.button`
  display: none;
  transform: rotate(0deg);
  transition: transform 0.5s ease;

  @media screen and (max-width: 768px) {
    display: block;
    width: 40px;
    background: #054d00;
    height: 40px;
    border: 2px solid #7eff00;
    border-radius: 100px;
    margin: 8px;
    position: fixed;
    top: 4px;
    z-index: 3;

    &.rotate {
      transform: rotate(360deg);
    }
  }
`;
