import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonContainer, Button } from "./styles";
import ProjectTabs from "../../components/project_tabs";
import Intel from "./intel";
import EnvironmentalEngineering from "./environmental_engineering";


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

  return (
    <ProjectTabs tabs={tabs} />
  )
};

export default ProjectIntern;