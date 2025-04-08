import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appStatus } from '../../store/modules/app_status/actions';

import {
  StyledTable as Table,
  StyledTableHead as THead,
  StyledTableRow as TR,
  StyledTableHeader as TH,
  StyledTableCell as TD,
  StyledViewLink as ViewLink,
  StyledButtonVisualizar
} from './styles';

const UsersTable = ({filteredUsers}) => {

  const navigate = useNavigate();
  const users = useSelector((state) => state.app_data.users);
  const dispatch = useDispatch();

  const handleClick = (user) => {
    dispatch(appStatus('edit_user'));
    navigate('/welcome', { state: { user }});
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Table>
        <THead>
          <TR>
            <TH>Nome</TH>
            <TH>e-mail</TH>
            <TH>Whatsapp</TH>
            <TH>Localidade</TH>
            <TH>Acesso</TH>
            <TH>Ação</TH>
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
              <TD>
                <StyledButtonVisualizar onClick={() => {handleClick(users.find(user => user.id === row.id))}} style={{ cursor: 'pointer' }}>
                  Visualizar
                </StyledButtonVisualizar>                
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
      </div>
  );
};

export default UsersTable;