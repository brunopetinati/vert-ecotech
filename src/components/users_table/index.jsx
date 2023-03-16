import { Table, THead, TR, TH, TD, Wrapper} from './styles'


const UsersTable = ({filteredUsers}) => {

  return (
    <Wrapper>
      
      <Table>
        <THead>
          <TR>
            <TH>Nome</TH>
            <TH>Email</TH>
            <TH>Whatsapp</TH>
            <TH>Localidade</TH>
            <TH>Acesso</TH>
          </TR>
        </THead>
        <tbody>
          {filteredUsers.map((row, index) => (
            <TR key={index}>
              <TD>{row.full_name}</TD>
              <TD>{row.email}</TD>
              <TD>{row.phone}</TD>
              <TD>{row.city + ', ' + row.state}</TD>
              <TD>{row.user_type}</TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Wrapper>);
};

export default UsersTable;