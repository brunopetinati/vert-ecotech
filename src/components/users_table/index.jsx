import { Table, THead, TR, TH, TD, Wrapper} from './styles'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

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

  // Filter users based on the selected column and search value
  const filteredUsers = users.filter((user) => {
    if (!searchValue) {
      return true;
    }
    if (selectedColumn === 'Nome' && user.full_name.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Email' && user.email.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Whatsapp' && user.phone.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Localidade' && `${user.city}, ${user.state}`.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Acesso' && user.user_type.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Wrapper>
      <div>
        <label htmlFor="column-select">Select a column to search:</label>
        <select id="column-select" onChange={handleColumnChange}>
          <option value="">---</option>
          <option value="Nome">Nome</option>
          <option value="Email">Email</option>
          <option value="Whatsapp">Whatsapp</option>
          <option value="Localidade">Localidade</option>
          <option value="Acesso">Acesso</option>
        </select>
        <input type="text" placeholder="Search..." value={searchValue} onChange={handleSearchChange} />
      </div>
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