import { InnerContainer, Button, ButtonContainer } from '../styles';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { currentUrl } from '../../../constants/global';


const EnvironmentalEngineering = ({user, project }) => {

  const navigate = useNavigate();

  const startProject = () => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}`, };
    
    axios
    .put(`${currentUrl}/api/projects/${project.id}/update/`, { status: 'started', owner: project.owner }, { headers } )
    .then((response) => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'O projeto foi inicializado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/analysis_and_development');
    })
    .catch((error) => {
      // Handle the error if any
    });
  };

  return (
    <>
      {user.user_type === "ADM" && 
      <>

        <ButtonContainer>
          { project.status === null && <Button onClick={() => startProject()}>Inicializar Processo</Button>}
        </ButtonContainer>
        <InnerContainer>

        </InnerContainer>
      </>
    }
  </>          
  );
};

export default EnvironmentalEngineering;