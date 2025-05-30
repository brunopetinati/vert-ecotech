import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectTabs from "../../components/project_tabs";
import Intel from "./intel";
import ProjectTabAdministration from "../../components/projects_t_administration";
import ProjectTabEngineering from "../../components/projects_t_engineering";
import ProjectTabComercial from "../../components/projects_t_comercial";
import ProjectTabLegal from "../../components/projects_t_legal";
import Sidebar from "../../components/sidebar";

import { Container, SideContainer } from "../main_display/styles";
import Projects from "../../components/projects";
import Users from "../../components/users";
import Profile from "../../components/profile";
import KanbanBoard from "../../components/kanban_board";
import Settings from "../../components/settings";
import Dashboard from "../../components/dashboard";

const   ProjectIntern = () => {

  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const project = location.state.project;
  const user = useSelector((state) => state.user.currentUser);
  const collapsed = useSelector((state) => state.sidebar);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/edit_intern_project', { state: { project }});
  };

  // ATENÇÃO: AQUI ESTÃO OS COMPONENTES RENDERIZADOS NA TELA /intern_project;
  // comentário para facilitar a localização dos componentes internos nas abas do projeto, quando habilitadas pela função startProject().

  const tabs = [
    {
      label: "Informações",
      content: <Intel user={user} project={project} />
    },
    {
      label: "Administrativo",
      content: <ProjectTabAdministration user={user} project={project} />
    },  
    {
      label: "Ambiental",
      content: <ProjectTabEngineering user={user} project={project} />
    },
    {
      label: "Comercial",
      content: <ProjectTabComercial user={user} project={project} />
    },
    {
      label: "Jurídico",
      content: <ProjectTabLegal user={user} project={project} />
    },

  ];

  const tabsForRegularUser = [
    {
      label: "Informações",
      content: <Intel user={user} project={project} />

    }
  ];

  const app_status = useSelector((state) => state.app_status.status);

  return (
    <Container collapsed={collapsed} >
      <Sidebar />
      <SideContainer>
        {
          app_status === 'Projetos' ? <Projects /> : 
          app_status === 'Usuários' ? <Users /> : 
          app_status === 'Meu Perfil' ? <Profile /> : 
          app_status === "Desenvolvimento" ? <KanbanBoard /> : 
          app_status === "Configurações" ? <Settings /> : 
          app_status === "Dashboard" ? <Dashboard /> : 
          <ProjectTabs tabs={currentUser.user_type === "Regular" ? tabsForRegularUser : tabs} handleRegister={handleRegister} project={project} />
        }
      </SideContainer>
    </Container>
  )

};

export default ProjectIntern ;