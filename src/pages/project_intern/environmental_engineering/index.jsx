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
    <div style={{ height: '100vh', width: '100vw'}}>
      {user.user_type === "ADM" && 
      <>        
        <InnerContainer>
        </InnerContainer>
      </>
    }
  </div>          
  );
};

export default EnvironmentalEngineering;