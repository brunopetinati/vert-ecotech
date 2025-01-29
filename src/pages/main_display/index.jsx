import { useSelector } from "react-redux";
import { Container, SideContainer } from './styles'
import Profile from '../../components/profile'
import Projects from "../../components/projects";
import Users from "../../components/users"
import Settings from "../../components/settings";
import Dashboard from "../../components/dashboard";
import Sidebar from "../../components/sidebar";

import KanbanBoard from "../../components/kanban_board";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import InternRegisterUser from '../../components/inter_register_user';
import UserIntern from "../../pages/user_intern";


const Welcome = () => {

  const location = useLocation();
  const user = location?.state?.user;

  const app_status = useSelector((state) => state.app_status.status);
  const navigate = useNavigate();

  // Controle do estado do Sidebar (expandido ou colapsado)
  const [collapsed, setCollapsed] = React.useState(false);


  useEffect(() => {
    const authorizationToken = sessionStorage.getItem('Authorization');

    if (!authorizationToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <SideContainer collapsed={collapsed}>
        {

          app_status === 'Projetos' ? <Projects /> :
          app_status === 'Usuários' ? <Users /> :
          app_status === 'Meu Perfil' ? <Profile /> :
          app_status === "Desenvolvimento" ? <KanbanBoard /> :
          app_status === "Configurações" ? <Settings /> :
          app_status === "cad_new_user" ? <InternRegisterUser /> :
          app_status === "edit_user" ? <UserIntern user={user} /> :
          app_status === "Dashboard" ? <Dashboard /> : null
        }
      </SideContainer>
    </Container>
  )
};

export default Welcome;