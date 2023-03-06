import { useDispatch, useSelector } from "react-redux";
import { SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Sidebar from "../../components/sidebar";

import { Container } from './styles';

const Welcome = () => {

  const app_status = useSelector((state) => state.app_status.status);

  // criar função que retorna de acordo com o estado o componente
  // state == Projects && Projects etc
  // essa função vai ser um componente que retorna todos os outros

  return (
    <Container>
      <Sidebar />
      <SideContainer>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : null}
      </SideContainer>
    </Container>
  )
};

export default Welcome;