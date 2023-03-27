import styled from 'styled-components';


export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  table-layout: fixed;
  border-radius: 20px;
`;

export const THead = styled.thead`
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`;

export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TH = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  width: 100px;
  text-align: center;
  width: 150px;
`;

export const TD = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align:center;
  width: 150px;
`;

export const Wrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  height: 79vh;
`;
