import { Table, THead, TR, TH, TD, Wrapper} from './styles'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const UsersTable = () => {

  const [users, setUsers] = useState([]);

  const app_status = useSelector((state) => state.app_status);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [app_status]);

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
          {users && users.map((row, index) => (
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
    </Wrapper>
  );
};

export default UsersTable;
