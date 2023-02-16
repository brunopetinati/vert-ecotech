import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 16px;
`;

export const THead = styled.thead`
  background-color: #f2f2f2;
  font-weight: bold;
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
`;

export const TD = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;
