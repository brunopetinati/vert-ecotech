import styled from "styled-components";

export const Tab = styled.div`
  position: relative;
  padding: 10px 20px;
  cursor: ${(props) => props.status !== null && 'pointer'};
  margin-right: 10px;
  margin-top: 10px; /* Adiciona uma margem superior */
  color: ${(props) => (props.active ? "#fff" : props.status === null ? "#ccc" : "#8bc34a")};
  font-weight: ${(props) => (props.active ? "normal" : "normal")};
  background-color: ${(props) => (props.active ? "#8bc34a" : "transparent")};
  border-radius: 15px 15px 0 0;
  z-index: 1;
  //margin: 0 auto;

  display: flex;
  padding-left: 15px;/* Move o label para a direita */
  text-align: right; /* Garante alinhamento do texto */
  //width: 100%; /* Para ocupar toda a largura do contêiner */


/*
  left: ${(props) => (props.position === 'right' ? 'auto' : props.position === 'left' ? '0' : '-10%')};
  transform: ${(props) => (props.position === 'left' ? 'none' : 'translateX(-50%)')};
*/

  &:hover {
    border: ${(props) => (props.status !== null ? `1px solid ${props.active ? "transparent" : "#8bc34a"}` : "none")};
    border-bottom: none;
    cursor: ${(props) => (props.status === null && 'default')};
  }
`;


export const LinearTabs = styled.ul`
  position: fixed;
  top: 0;
  left: ${({ collapsed }) => (collapsed ? "5vw" : "15vw")}; /* Ajusta conforme a sidebar */
  width: ${({ collapsed }) => (collapsed ? "95vw" : "85vw")}; /* Ocupa o espaço restante */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #8bc34a;
  background: #f9f9f9;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 9999;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out; /* Suaviza a animação */
`;



<<<<<<< HEAD
=======

>>>>>>> 05b3e18 (menu ambiental fixed)
export const TabItem = styled.li`
  position: relative;
  padding: 12px 2px 12px 16px;
  margin: 0 8px -1px 0;
  border: 1px solid #dae0e7;
  background: ${(props) => (props.active ? "#fff" : "#f9f9f9")};
  border-radius: 8px 8px 0 0;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#fff" : "#fff")};
  }
`;

export const TabLink = styled.a`
  text-decoration: none;
  color: #333;
`;

export const CloseTab = styled.a`
  width: 16px;
  height: 16px;
  margin: 0 14px 0 12px;
  padding: 3px;
  border-radius: 16px;
  line-height: 16px;
  text-align: center;

  &:hover {
    background: #dae0e7;
  }
`;

// os dois css a seguir estão juntos, pois correspondem 

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  //margin: 0 auto;
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 32px;
`;
