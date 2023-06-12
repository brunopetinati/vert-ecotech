import styled from 'styled-components';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Stocks } from '../../assets/icons/stocks.svg';
import { ReactComponent as ShoppingCart } from '../../assets/icons/shopping-cart.svg';
import { ReactComponent as Users } from '../../assets/icons/users.svg';
import { ReactComponent as Work } from '../../assets/icons/work.svg';
import { ReactComponent as ComeBack} from '../../assets/gifs/comeback.gif';

export const SidebarContainerOriginal = styled.div`
  background-color: #F9FAFB;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarContainer = styled.div`
  background-color: #F9FAFB;
  height: 100vh;
  width: ${({collapsed}) => collapsed ? "50px" : "250px"};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.5s ease-in-out;
`;

export const SidebarHeader = styled.div`
  background-color: #F9FAFB;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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



  li {
    background-color: red;
  }

  &.active {
    background-color: #1D2228;
    color: white;
  }
`;

export const SidebarFooter = styled.div`
  background-color: #F9FAFB;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* export const StyledShoppingCart = styled(ShoppingCart)`
  fill: ${({active}) => active ? "#fff" : "#000"};
  height: 32px;
  width: 10px;
  transform: scale(2.5);
`; */


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