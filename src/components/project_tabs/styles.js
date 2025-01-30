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
  border-radius: 9px 9px 0 0;
  z-index: 1;

  left: ${(props) => (props.position === 'right' ? 'auto' : props.position === 'left' ? '0' : '-10%')};
  transform: ${(props) => (props.position === 'left' ? 'none' : 'translateX(-50%)')};

  &:hover {
    border: ${(props) => (props.status !== null ? `1px solid ${props.active ? "transparent" : "#8bc34a"}` : "none")};
    border-bottom: none;
    cursor: ${(props) => (props.status === null && 'default')};
  }
`;


export const LinearTabs = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center; /* Centraliza os itens */
  align-items: center;
  border-bottom: 1px solid #dae0e7;
  background: #f9f9f9;
  list-style-type: none;
  width: 50%; /* Garante que ocupe todo o espaço disponível */
  margin: 0 auto; /* Centraliza o contêiner */
  margin-bottom: 10px;
  padding-left: 230px; /* Para ajustar conforme necessário */
`;

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
  align-items: flex-start;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 32px;
`;
