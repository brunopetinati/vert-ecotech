import { useDispatch, useSelector } from "react-redux";
import { SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Settings from "../../components/settings";
import Sidebar from "../../components/sidebar";

import { Container } from './styles';

const Welcome = () => {

  const app_status = useSelector((state) => state.app_status.status);
  const user = useSelector((state) => state.user);


  return (
    <Container>
      <Sidebar />
      <SideContainer>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : app_status === "Configurações" ? <Settings /> : null}
      </SideContainer>
    </Container>
  )
};

export default Welcome;