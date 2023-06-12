import { useDispatch, useSelector } from "react-redux";
import { SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Settings from "../../components/settings";
import StockChart from "../../components/dashboard";
import Sidebar from "../../components/sidebar";

import { Container } from './styles';
import KanbanBoard from "../../components/kanban_board";

const Welcome = () => {

  const app_status = useSelector((state) => state.app_status.status);
  //const user = useSelector((state) => state.user);

  return (
    <Container>
      <Sidebar />
      <SideContainer>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : app_status === "Desenvolvimento" ? <KanbanBoard /> : app_status === "Configurações" ? <Settings /> : app_status === "Dashboard" ? <StockChart /> : null}
      </SideContainer>
    </Container>
  )
};

export default Welcome;