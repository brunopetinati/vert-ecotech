import ProjectsTable from "../projects_table";
import DefaultButton from "../default_button";
import { Container, TitleContainer, ButtonContainer, TableContainer } from "./styles";

const Projects = () => {

  return (
    <Container>
      <TitleContainer>
        <h1>Projetos</h1>
      </TitleContainer>
      <ButtonContainer>
        <DefaultButton text={'Adicionar Projeto'} />
      </ButtonContainer>
      <TableContainer>
        <ProjectsTable />
      </TableContainer>
    </Container>
  );
};

export default Projects;
