import UsersTable from "../users_table/index";
import UsersCard from "../users_cards";
import DefaultButton from "../default_button";
import { Container, ButtonContainer, TableContainer, Input, StyledSelect, Label, StyledButtonAdicionarUser } from "./styles";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { currentUrl } from '../../constants/global';
import { useNavigate } from "react-router-dom";
import { appStatus } from '../../store/modules/app_status/actions';

const Users = () => {

  const app_status = useSelector((state) => state.app_status.status);
  const layoutUsers = useSelector((state) => state.layout.cardsLayoutUsers);

  const collapsed = useSelector((state) => state.sidebar);

  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get(`${currentUrl}/api/users/`, {
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

  const [selectedColumn, setSelectedColumn] = useState('Nome');
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
  
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(appStatus('cad_new_user'));
    navigate('/welcome');
  }

  return (
    <Container collapsed={collapsed} >

      <div style={{ float: 'left', width: '65vw', height: '80px', textAlign: 'center', marginLeft: '0px' }}>
        <h2>Usuários</h2>
      </div>
      <div style={{ float: 'left' }}>
        <div style={{ float: 'left', marginLeft: '20px', width: '350px', height: '50px' }}>
          <Label style={{ color: '#363636' }}>Campo </Label>
          <StyledSelect id="column-select" onChange={handleColumnChange}>
            <option value="Nome">Nome</option>
            <option value="Email">Email</option>
            <option value="Whatsapp">Whatsapp</option>
            <option value="Localidade">Localidade</option>
            <option value="Acesso">Acesso</option>
          </StyledSelect>
        </div>
        <div style={{ float: 'left', marginLeft: '20px', width: '350px', height: '50px' }}>
          <Label style={{ color: '#363636' }}>Valor </Label>
          <Input type="text" placeholder="Pesquisar..." value={searchValue} onChange={handleSearchChange} />          
        </div>
        <ButtonContainer>
          <StyledButtonAdicionarUser onClick={() => handleClick()}>Novo Usuário</StyledButtonAdicionarUser>
        </ButtonContainer>        
      </div>
      
      <TableContainer>
        {layoutUsers ? <UsersCard filteredUsers={filteredUsers} /> : <UsersTable filteredUsers={filteredUsers} /> }
      </TableContainer>



    </Container>
  );
};

export default Users;