import ProjectsTable from "../projects_table";
import Card from "../projects_cards"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, ButtonContainer, TableContainer, Input, StyledSelect, MarginForCelphone, StyledButtonAdicionarProjeto, Label } from "./styles";
import { storeProjects } from "../../store/modules/app_data/actions";
import { currentUrl } from '../../constants/global';
import { useNavigate } from "react-router-dom";

import { ShowInput,
  Row,
  LeftColumn,
  RightColumn,
  IndexContainer
 } from "./styles";

const Projects = () => {
  const collapsed = useSelector((state) => state.sidebar);
  const app_status = useSelector((state) => state.app_status.status);
  const layoutProjects = useSelector((state) => state.layout.cardsLayoutProjects);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedColumn, setSelectedColumn] = useState('Nome');
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (projects.length === 0) {
      const fetchProjects = async () => {
        try {
          const token = sessionStorage.getItem('Authorization');
          let response;
          if (currentUser.user_type === 'ADM') {
            response = await axios.get(`${currentUrl}/api/projects/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            response = await axios.get(`${currentUrl}/api/projects/${currentUser.id}/by_user/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
          setProjects(response.data);
          dispatch(storeProjects(response.data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    }
  }, [app_status, currentUser.id, currentUser.user_type, currentUrl, dispatch, projects]);

  const filteredProjects = projects.filter((project) => {
    if (!searchValue) {
      return true;
    }
    if (selectedColumn === 'Nome' && project.title.toLowerCase().includes(searchValue.toLowerCase())) {
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/project_register');
  }  

  return (
    <IndexContainer>
<Container collapsed={collapsed}>
      <Row>
          <LeftColumn>
            <Label>Campo:</Label>
            <StyledSelect id="column-select" onChange={handleColumnChange}>
              <option value="Nome">Nome - Título do Projeto</option>
              <option value="Unidade de Conservação (UC)">Unidade de Conservação (UC)</option>
              <option value="Localidade">Localidade</option>
              <option value="Status da Matrícula">Status da Matrícula</option>
              <option value="Status do Georreferenciamento">Status do Georreferenciamento</option>
              <option value="Situação da Reserva Legal">Situação da Reserva Legal</option>
              <option value="Status CAR">Status CAR</option>
            </StyledSelect>
          </LeftColumn>

          <RightColumn>
            <Label>Valor:</Label>
            <ShowInput
              type="text"
              placeholder="Pesquisar..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </RightColumn>

         <ButtonContainer>
        <StyledButtonAdicionarProjeto onClick={() => handleClick()}>Adicionar Projeto</StyledButtonAdicionarProjeto>
      </ButtonContainer>
        </Row>

      <TableContainer collapsed={collapsed}>

        
        {layoutProjects ? <Card filteredProjects={filteredProjects} /> : <ProjectsTable filteredProjects={filteredProjects} />}
      </TableContainer>

    </Container>
    </IndexContainer>
    
  );
};

export default Projects;

/*
<MarginForCelphone />
*/ 