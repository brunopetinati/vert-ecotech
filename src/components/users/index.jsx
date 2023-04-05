import UsersTable from "../users_table/index";
import UsersCard from "../users_cards";
import DefaultButton from "../default_button";
import { Container, ButtonContainer, TableContainer, Input, StyledSelect } from "./styles";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { currentUrl } from '../../constants/global';

const Users = () => {

  const app_status = useSelector((state) => state.app_status.status);
  const layoutUsers = useSelector((state) => state.layout.cardsLayoutUsers);

  const collapsed = useSelector((state) => state.sidebar.status);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get('http://3.145.151.125:8000/api/users/', {
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



  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');


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
    <Container collapsed={collapsed} >
      <ButtonContainer>
        <div>
        <Input type="text" placeholder="Pesquisar..." value={searchValue} onChange={handleSearchChange} />
        <StyledSelect id="column-select" onChange={handleColumnChange}>
          <option value="">---</option>
          <option value="Nome">Nome</option>
          <option value="Email">Email</option>
          <option value="Whatsapp">Whatsapp</option>
          <option value="Localidade">Localidade</option>
          <option value="Acesso">Acesso</option>
        </StyledSelect>
        </div>
        <DefaultButton text={'Adicionar Usuário'} path={'/intern_client_register'}/>
      </ButtonContainer>
      <TableContainer>
        {layoutUsers ? <UsersCard filteredUsers={filteredUsers} /> : <UsersTable filteredUsers={filteredUsers} /> }
      </TableContainer>
    </Container>
  );
};

export default Users;