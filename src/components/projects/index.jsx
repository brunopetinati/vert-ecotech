import ProjectsTable from "../projects_table";
import DefaultButton from "../default_button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, TitleContainer, ButtonContainer, TableContainer } from "./styles";

const Projects = () => {

  const collapsed = useSelector((state) => state.sidebar.status);
  const app_status = useSelector((state) => state.app_status.status);
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('Authorization');
        const response = await axios.get('http://localhost:8000/api/projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('deu certo?', response.data)
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [app_status]);


  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const filteredProjects = projects.filter((project) => {
    if (!searchValue) {
      return true;
    }
    if (selectedColumn === 'Unidade de Conservação' && project.conservation_unit.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false
  });

  return (
    <Container collapsed={collapsed} >
      <ButtonContainer>
        <DefaultButton text={'Adicionar Projeto'} path={'/register_project'} />
      </ButtonContainer>
      <TableContainer>
        <ProjectsTable filteredProjects={filteredProjects} />
      </TableContainer>
    </Container>
  );
};

export default Projects;