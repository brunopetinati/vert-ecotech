import UsersTable from "../users_table/index";
import DefaultButton from "../default_button";
import { useSelector } from "react-redux";
import { Container, TitleContainer, ButtonContainer, TableContainer } from "./styles";

const Users = () => {

  const collapsed = useSelector((state) => state.sidebar.status);
  
  return (
    <Container collapsed={collapsed} >
      <ButtonContainer>
        <DefaultButton text={'Adicionar Usuário'} path={'/register'}/>
      </ButtonContainer>
      <TableContainer>
        <UsersTable />
      </TableContainer>
    </Container>
  );
};

export default Users;