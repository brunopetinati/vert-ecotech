import { Table, THead, TR, TH, TD, Wrapper} from './styles'

//const TableComponent = ({ data }) => {
const UsersTable = () => {

  let data = [
  { 'column1':'São Bernardo',
    'column2':'50kha',
    'column3':'300.000',
    'column4':'850.000',
    'column5':'23-12-2022',
    'column6':'23-12-2042',
    'column7':'1.150.000',
    'column8':'250.000/a',
    'column9':'Aprovado',
    'column10':'Badge',
  },
  {'column1':'Akita',
  'column2':'80kha',
  'column3':'100.000',
  'column4':'200.000',
  'column5':'23-12-2022',
  'column6':'23-12-2042',
  'column7':'300.000',
  'column8':'10.000/a',
  'column9':'Aprovado',
  'column10':'Badge',
  },'this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this','this',]

  return (
    <Wrapper>
      <Table>
        <THead>
          <TR>
            <TH>Nome</TH>
            <TH>WhatsApp</TH>
            <TH>Cidade</TH>
            <TH>Estado</TH>
            <TH>Email</TH>
            <TH>Role</TH>
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
    </Wrapper>
  );
};

export default UsersTable;
