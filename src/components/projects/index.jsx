import ProjectsTable from "../projects_table";
import DefaultButton from "../default_button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, TitleContainer, ButtonContainer, TableContainer } from "./styles";

const Projects = () => {

  const collapsed = useSelector((state) => state.sidebar.status);


  return (
    <Container collapsed={collapsed} >
      <TitleContainer>
        <h1>Projetos</h1>
      </TitleContainer>
      <ButtonContainer>
        <DefaultButton text={'Adicionar Projeto'} path={'/register_project'} />
      </ButtonContainer>
      <TableContainer>
        <ProjectsTable />
      </TableContainer>
    </Container>
  );
};

export default Projects;