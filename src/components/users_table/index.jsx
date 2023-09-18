import { Table, THead, TR, TH, TD, Wrapper} from './styles'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UsersTable = ({filteredUsers}) => {

  const navigate = useNavigate();
  const users = useSelector((state) => state.app_data.users);

  const handleClick = (user) => {
    navigate('/intern_user', { state: { user }} );
  };

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
            <TH></TH>
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
              <TD style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {handleClick(users.find(user => user.id === row.id))}}>Visualizar</TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Wrapper>);
};

export default UsersTable;