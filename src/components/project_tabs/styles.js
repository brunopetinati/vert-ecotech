import styled from "styled-components";


export const Tab = styled.div`
  position: relative;
  padding: 10px 20px;
  cursor: ${(props) => props.status !== null && 'pointer'};
  margin-right: 1px;
  color: ${(props) => (props.active ? "#fff" : props.status === null ? "#ccc" : "#8bc34a")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background-color: ${(props) => (props.active ? "#8bc34a" : "transparent")};
  border-radius: 9px 9px 0 0;
  z-index: 1;

  &:hover {
    border: ${(props) => (props.status !== null ? `1px solid ${props.active ? "transparent" : "#8bc34a"}` : "none")};
    border-bottom: none;
    cursor: ${(props) => (props.status === null && 'default' )};
  }
`;


export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ collapsed }) => (collapsed ? "95vw" : "85vw")};
`;

export const LinearTabs = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #dae0e7;
  background: #f9f9f9;
  list-style-type: none;
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

export const Content = styled.div`
  width: 100%;
`;
