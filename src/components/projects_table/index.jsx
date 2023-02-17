import { Table, THead, TR, TH, TD, Wrapper} from './styles'

//const TableComponent = ({ data }) => {
const ProjectsTable = () => {

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
            <TH>Projeto</TH>
            <TH>Área Total</TH>
            <TH>Créditos Disponíveis</TH>
            <TH>Créditos Vendidos</TH>
            <TH>Data de início</TH>
            <TH>Data de término</TH>
            <TH>Crédito Total</TH>
            <TH>Produção Regular</TH>
            <TH>Estágio</TH>
            <TH></TH>
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
              <TD>{row.column7}</TD>
              <TD>{row.column8}</TD>
              <TD>{row.column9}</TD>
              <TD>{row.column10}</TD>            
            </TR>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ProjectsTable;
