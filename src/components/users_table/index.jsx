import { Table, THead, TR, TH, TD} from './styles'

const UsersTable = () => {

  return (
    <Table>
      <THead>
        <TR>
          <TH>Column 1</TH>
          <TH>Column 2</TH>
          <TH>Column 3</TH>
          <TH>Column 4</TH>
          <TH>Column 5</TH>
          <TH>Column 6</TH>
        </TR>
      </THead>
      <tbody>
        {data.map((row, index) => (
          <TR key={index}>
            <TD>{row.column1}</TD>
            <TD>{row.column2}</TD>
            <TD>{row.column3}</TD>
            <TD>{row.column4}</TD>
            <TD>{row.column5}</TD>
            <TD>{row.column6}</TD>
          </TR>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;