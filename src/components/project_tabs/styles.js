import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LinearTabs = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#4CAF50" : "#8BC34A")};
  color: #fff;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 4px;
  margin-right: 5px;

  &:hover {
    background-color: ${(props) => (props.active ? "#4CAF50" : "#7CB342")};
  }
`;


export const Content = styled.div`
  margin-top: 10px;
  width: 100%;
`;