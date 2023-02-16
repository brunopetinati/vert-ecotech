import ProjectsTable from "../projects_table";
import DefaultButton from "../default_button";
import { TableContainer } from "./styles";

const Projects = () => {

  return (
    <>
      <DefaultButton text={'Adicionar Projeto'} />
      <TableContainer>
        <ProjectsTable />
      </TableContainer>
    </>
  );
};

export default Projects;
