import styled, { keyframes } from 'styled-components';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Stocks } from '../../assets/icons/stocks.svg';
import { ReactComponent as Users } from '../../assets/icons/users.svg';
import { ReactComponent as Work } from '../../assets/icons/work.svg';


export const SidebarContainer = styled.div`
  background-color: #f6f6f6;
  width: ${({collapsed}) => collapsed ? "5vw" : "20vw"};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.5s ease-in-out;
  height: 100vh;
  position: sticky;
  z-index: 2;

  @media screen and (max-width: 768px) {
    width: ${({ showSidebar }) => (showSidebar ? "15vw" : "0")};
    height: ${({ showSidebar }) => (showSidebar ? "100%" : "0")};
    opacity: ${({ showSidebar }) => (showSidebar ? 1 : 0)};
    transition: height 2.5s ease-in-out, opacity 0.5s ease-in-out;
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
      font-size: 8px;
      word-wrap: break-word;
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
  fill: ${({active}) => active ? "#fff" : "#fff"};
  height: 32px;
  width: 10px;
  transform: scale(2.5);
`;

export const StyledStocks = styled(Stocks)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 10px;
  transform: scale(2.5);
`;

export const StyledUsers = styled(Users)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 10px;
  transform: scale(2.5);
`;

export const StyledSettings = styled(Settings)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 10px;
  transform: scale(2.5);
`;

export const StyledWork = styled(Work)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 10px;
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
