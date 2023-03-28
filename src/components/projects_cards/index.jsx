import { useEffect, useState } from 'react';
import { Wrapper, Card, CardHeader, CardBody, CardFooter } from './styles';
import { getStatusCARColor, getStatusMatriculaColor } from '../../constants/functions';

const ProjectsCard = ({ filteredProjects }) => {
  const [owners, setOwners] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };
    fetch('http://localhost:8000/api/users/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setOwners(data);
      })
      .catch((error) => {
        console.error('Error fetching owners', error);
      });
  }, []);


  const getFullNameById = (ownerId) => {
    const ownerObj = owners.find(user => user.id === ownerId);
    if (ownerObj) {
      return ownerObj.full_name;
    }
    return 'unknown';
  };

  return (
    <Wrapper>
      {filteredProjects.map((project, index) => (
        <Card key={index}>
          <CardHeader>{getFullNameById(project.owner)}</CardHeader>
          <CardBody>
            <p>Área de Reserva Legal: {project.legal_reserve_area + ' ha'}</p>
            <p>Área Total: {project.total_area + ' ha'}</p>
            <p>Localidade: {project.address}</p>
            <p>Status CAR: <span style={{ color: getStatusCARColor(project.status_car) }}>{project.status_car}</span></p>
            <p>Status Matrícula: <span style={{color : getStatusMatriculaColor(project.matricula_status)}}>{project.matricula_status}</span></p>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      ))}
    </Wrapper>
  );
};

export default ProjectsCard;
