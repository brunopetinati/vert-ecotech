import { useSelector } from "react-redux";
import { Container, SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Settings from "../../components/settings";
import Dashboard from "../../components/dashboard";
import Sidebar from "../../components/sidebar";

import KanbanBoard from "../../components/kanban_board";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {

  const app_status = useSelector((state) => state.app_status.status);
  const navigate = useNavigate();
  
  useEffect(()=> {
    const authorizationToken = sessionStorage.getItem('Authorization');

    if (!authorizationToken) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <Sidebar />
      <SideContainer>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : app_status === "Desenvolvimento" ? <KanbanBoard /> : app_status === "Configurações" ? <Settings /> : app_status === "Dashboard" ? <Dashboard /> : null}
      </SideContainer>
    </Container>
  )
};

export default Welcome;