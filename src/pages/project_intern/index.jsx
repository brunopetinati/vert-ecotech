import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MasterContainer, Button, ButtonContainer, InnerContainer } from "./styles";
import ProjectTabs from "../../components/project_tabs";
import Intel from "./intel";
import ProjectTabBioAnalysis from "../../components/projects_t_bioanalysis";
import Sidebar from "../../components/sidebar";

import { Container, SideContainer } from "../main_display/styles";
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
    content: <ProjectTabBioAnalysis user={user} project={project} />
  },
  {
    label: "Comercial",
    content: <p style={{height: '100vh'}}></p>
  },
  {
    label: "Jurídico",
    content: <p style={{height: '100vh'}}></p>
  },
  {
    label: "Consolidação",
    content: <p style={{height: '100vh'}}></p>
  }
];

const app_status = useSelector((state) => state.app_status.status);


  return (
    <Container>
      <Sidebar />
      <SideContainer>
        {app_status === 'Projetos' ? <Projects /> : app_status === 'Usuários' ? <Users /> : app_status === 'Meu Perfil' ? <Profile /> : app_status === "Desenvolvimento" ? <KanbanBoard /> : app_status === "Configurações" ? <Settings /> : app_status === "Dashboard" ? <Dashboard /> : <ProjectTabs tabs={tabs} handleRegister={handleRegister} />}
      </SideContainer>
    </Container>
  )
};

export default ProjectIntern;