import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MasterContainer, Button } from "./styles";
import ProjectTabs from "../../components/project_tabs";
import Intel from "./intel";
import EnvironmentalEngineering from "./environmental_engineering";
import Sidebar from "../../components/sidebar";

import { SideContainerFlexStart } from "../main_display/styles";
import Projects from "../../components/projects";
import Users from "../../components/users";
import Profile from "../../components/profile";
import KanbanBoard from "../../components/kanban_board";
import Settings from "../../components/settings";
import Dashboard from "../../components/dashboard";

const ProjectIntern = () => {

  const location = useLocation();
  const project = location.state.project;
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  console.log('prestar atenção nesse console', project);

  const handleComeBack = () => {
    navigate('/welcome')
  };

  const handleComeBackKanBan = () => {
    navigate('/analysis_and_development')
  }

  const handleRegister = () => {
    navigate('/edit_intern_project', { state: { project }});
  };


  const tabs = [
  {
    label: "Informações",
    content: <Intel user={user} project={project} />

  },
  {
    label: "Engenharia Ambiental",
    content: <EnvironmentalEngineering user={user} project={project} />
  },
  {
    label: "Comercial",
    content: <p>Em desenvolvimento</p>
  },
  {
    label: "Jurídico",
    content: <p>Em desenvolvimento</p>
  }
];

const ButtonContainer = () => {
  return (
  <ButtonContainer>
    {user.user_type === "ADM" && <Button onClick={() => handleComeBackKanBan()}>Desenvolvimento</Button>}
    <Button onClick={() => handleComeBack()}>Voltar</Button>
    <Button onClick={() => handleRegister()}>Editar Informações</Button>
  </ButtonContainer>
  )
}

const app_status = useSelector((state) => state.app_status.status);


  return (
    <MasterContainer>
      <Sidebar />
      <SideContainerFlexStart>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : app_status === "Desenvolvimento" ? <KanbanBoard /> : app_status === "Configurações" ? <Settings /> : app_status === "Dashboard" ? <Dashboard /> : <ProjectTabs tabs={tabs} />}
      </SideContainerFlexStart>
    </MasterContainer>
  )
};

export default ProjectIntern;