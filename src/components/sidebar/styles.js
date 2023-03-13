import styled from 'styled-components';


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
  transition: all 0.5s ease-in-out;
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


  &:hover {
    background-color: #E5E5E5;
    color: #333;
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
  color: black;
  width: 30px;
  height: 30px;
`;