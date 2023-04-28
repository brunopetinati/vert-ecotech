import { getFullNameById } from '../../store/modules/app_data/thunk';
import { Wrapper, Card, CardHeader, CardBody, CardFooter, Score } from './styles';
import { getStatusCARColor, getStatusMatriculaColor, getScoreColor, transformNumbersToHectares } from '../../constants/functions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DefaultForestImage from '../../assets/default-image2.webp';


const ProjectsCard = ({ filteredProjects }) => {


  const navigate = useNavigate();
  
  function getRandomFloat() {
    const num = (Math.random() * 10).toFixed(1);
    return Number(num);
  }

  //const users = useSelector((state) => state.app_data.users);
  const projects = useSelector((state) => state.app_data.projects);

  const handleClick = (project) => {
    navigate('/intern_project', { state: { project }} );
  };

  return (
    <Wrapper>
      {filteredProjects.map((project, index) => (
        <Card key={index} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}}>
          <CardHeader>{project.title === "default" ? '-' : project.title.captalize()}</CardHeader>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-80px'}}>
            <img src={DefaultForestImage} style={{width: '100%'}}></img>
          </div>
          <CardBody>
            <p>{transformNumbersToHectares(project.total_area)}</p>
            <p>CAR: <span style={{ color: getStatusCARColor(project.status_car) }}>{project.status_car}</span></p>
            <p>Matrícula: <span style={{color : getStatusMatriculaColor(project.matricula_status)}}>{project.matricula_status}</span></p>          
          </CardBody>
          <CardFooter><Score style={{color: getScoreColor(project.score)}} score={project.score || '0'}>{project.score || '0'}</Score></CardFooter>
        </Card>
      ))}
    </Wrapper>
  );
};

export default ProjectsCard;