import { Wrapper, CardContainer, ImageContainer, Image, Title, Info, ScoreContainer, InnerContainer } from "./styles";
import { getStatusCARColor, getStatusMatriculaColor, getScoreColor, transformNumbersToHectares } from '../../constants/functions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DefaultForestImage from '../../assets/default-image2.png';
import { appStatus } from '../../store/modules/app_status/actions';

export const Card = ({filteredProjects}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function getRandomFloat() {
    const num = (Math.random() * 10).toFixed(1);
    return Number(num);
  }

  //const users = useSelector((state) => state.app_data.users);
  const projects = useSelector((state) => state.app_data.projects);

  const handleClick = (project) => {
    dispatch(appStatus(''));
    navigate('/intern_project', { state: { project }});
  };


  return (
    <Wrapper>
      {filteredProjects.map((project, index) => (
      <CardContainer key={index} onClick={() => {handleClick(projects.find(storedProject => storedProject.id === project.id))}}>
        <ImageContainer>
          <Image  src={project.project_image || DefaultForestImage}
          alt={project.title === "default" ? 'Sem Título' : project.title} />
        </ImageContainer>
        <InnerContainer>
          <Title style={{color: getScoreColor(project.score)}}>{project.title === "default" ? 'Sem Título' : project.title}</Title>
          <Info style={{ fontFamily: `"Times New Roman", Times, serif`, fontStyle: 'italic'}}>{transformNumbersToHectares(project.total_area)}</Info>
          <Info style={{ fontFamily: `"Times New Roman", Times, serif`, fontStyle: 'italic'}}>{transformNumbersToHectares(project.legal_reserve_area || '-')}</Info>
          <Info style={{ fontSize: '16px' }}>CAR: <span style={{ color: getStatusCARColor(project.status_car) }}>{project.status_car}</span></Info>
          <Info style={{ fontSize: '16px' }}>Matrícula: <span style={{color : getStatusMatriculaColor(project.matricula_status)}}>{project.matricula_status}</span></Info>          
        </InnerContainer>
        <ScoreContainer style={{color: getScoreColor(project.score)}} score={project.score || '0'}>{project.score || '0'}</ScoreContainer>
      </CardContainer>
      ))}
    </Wrapper>
  );
};

export default Card;