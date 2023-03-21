import ProjectsTable from "../projects_table";
import DefaultButton from "../default_button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, TitleContainer, ButtonContainer, TableContainer, Input, StyledSelect } from "./styles";

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
    if (selectedColumn === 'Localidade' && project.address.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Unidade de Conservação' && project.conservation_unit.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false
  });

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Container collapsed={collapsed} >
      <ButtonContainer>
        <div>
        <Input type="text" placeholder="Pesquisar..." value={searchValue} onChange={handleSearchChange} />
        <StyledSelect id="column-select" onChange={handleColumnChange}>
          <option value="">---</option>
          <option value="Unidade de Conservação">Unidade de Conservação</option>
          <option value="Localidade">Localidade</option>
        </StyledSelect>
        </div>
        <DefaultButton text={'Adicionar Projeto'} path={'/register_project'} />
      </ButtonContainer>
      <TableContainer>
        <ProjectsTable filteredProjects={filteredProjects} />
      </TableContainer>
    </Container>
  );
};

export default Projects;


