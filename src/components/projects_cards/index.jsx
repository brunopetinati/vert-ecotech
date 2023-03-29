import { getFullNameById } from '../../store/modules/app_data/thunk';
import { Wrapper, Card, CardHeader, CardBody, CardFooter, Score } from './styles';
import { getStatusCARColor, getStatusMatriculaColor, getScoreColor } from '../../constants/functions';
import { useSelector } from 'react-redux';

const ProjectsCard = ({ filteredProjects }) => {
  
  function getRandomFloat() {
    const num = (Math.random() * 10).toFixed(1);
    return Number(num);
  }

  const users = useSelector((state) => state.app_data.users);

  return (
    <Wrapper>
      {filteredProjects.map((project, index) => (
        <Card key={index}>
          <CardHeader>{getFullNameById(project.owner, users)}</CardHeader>
          <CardBody>
            <p>{project.address}</p>
            <p>Área de Reserva Legal: {project.legal_reserve_area + ' ha'}</p>
            <p>Área Total: {project.total_area + ' ha'}</p>
            <p>Status CAR: <span style={{ color: getStatusCARColor(project.status_car) }}>{project.status_car}</span></p>
            <p>Status Matrícula: <span style={{color : getStatusMatriculaColor(project.matricula_status)}}>{project.matricula_status}</span></p>          
          </CardBody>
          <CardFooter><Score style={{color: getScoreColor(getRandomFloat())}}>{getRandomFloat()}</Score></CardFooter>
        </Card>
      ))}
    </Wrapper>
  );
};

export default ProjectsCard;