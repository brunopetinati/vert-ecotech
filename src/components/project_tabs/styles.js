import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({collapsed}) => collapsed ? '95vw' : '85vw'}
`;

export const LinearTabs = styled.div`
  display: flex;
  flex-direction: row;
  background: linear-gradient(to right, #8bc34a, #d4f7a2);
  width: 100vw;
`;

export const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#4CAF50" : "transparent")};
  color: #fff;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background-color: ${(props) => (props.active ? "#4CAF50" : "#7CB342")};
  }
`;

export const Content = styled.div`
  width: 100vw;
`;