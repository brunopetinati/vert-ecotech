import ProjectsTable from "../projects_table";
import ProjectsCard from "../projects_cards";
import Card from "../projects_cards";
import DefaultButton from "../default_button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, ButtonContainer, TableContainer, Input, StyledSelect } from "./styles";
import { storeProjects } from "../../store/modules/app_data/actions";
import { currentUrl } from '../../constants/global';

const Projects = () => {

  const collapsed = useSelector((state) => state.sidebar.status);
  const app_status = useSelector((state) => state.app_status.status);
  const layoutProjects = useSelector((state) => state.layout.cardsLayoutProjects);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.app_data.projects);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (projects.length === 0) {
      const fetchProjects = async () => {
        try {
          const token = sessionStorage.getItem('Authorization');
          if (currentUser.user_type === 'ADM') {
            const response = await axios.get(`http://${currentUrl}:8000/api/projects/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch(storeProjects(response.data));
          } else {
            const response = await axios.get(`http://${currentUrl}:8000/api/projects/${currentUser.id}/by_user/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch(storeProjects(response.data));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    }
  }, [app_status, currentUser.id, currentUser.user_type, currentUrl, dispatch, projects]);
  


  const [selectedColumn, setSelectedColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const filteredProjects = projects.filter((project) => {
    if (!searchValue) {
      return true;
    }
    if (selectedColumn === 'Localidade' && project.address.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Unidade de Conservação (UC)' && project.conservation_unit.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Status da Matrícula' && project.matricula_status.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Status do Georreferenciamento' && project.georeferencing_status.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Situação da Reserva Legal' && project.reserve_legal_status.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    if (selectedColumn === 'Status CAR' && project.status_car.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    
    return false;
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
          <option value="Unidade de Conservação (UC)">Unidade de Conservação (UC)</option>
          <option value="Localidade">Localidade</option>
          <option value="Status da Matrícula">Status da Matrícula</option>
          <option value="Status do Georreferenciamento">Status do Georreferenciamento</option>
          <option value="Situação da Reserva Legal">Situação da Reserva Legal</option>
          <option value="Status CAR">Status CAR</option>
          </StyledSelect>
        </div>
        <DefaultButton text={'Adicionar Projeto'} path={'/register_project'} />
      </ButtonContainer>
      <TableContainer>
        {layoutProjects ? <Card filteredProjects={filteredProjects} /> : <ProjectsTable filteredProjects={filteredProjects} /> }
      </TableContainer>
    </Container>
  );
};

export default Projects;