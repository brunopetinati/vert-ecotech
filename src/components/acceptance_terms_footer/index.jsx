import { FooterContainer, Button } from './styles';
import { useNavigate } from "react-router-dom";
import { currentUrl } from '../../constants/global';
import { userLogin } from "../../store/modules/login/actions";
import axios from "axios";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'; 

const AcceptanceBar = ({path, func, registerUser}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finalObject = useSelector((state) => state.app_data.user_first_access);

  const handleAccept = () => {
    if (func) {
      func();
    }

    if (registerUser) {
    axios.post(`${currentUrl}/api/signup/`, {...finalObject})

      .then(response => {
        sessionStorage.setItem('Authorization', response.data.access);
        dispatch(userLogin(response.data.access, response.data));
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seu cadastro foi realizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        // função que zera o status redux aqui        
        console.error('tracking the following error would be important',error);
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }
    navigate(path);
  };

  const handleDecline = () => {
    navigate('/');
    // função que zera redux aqui
  }

  return (
    <FooterContainer>
      <div>Copyright © 2023</div>
      <div style={{ marginBottom: '64px'}}>
        <Button onClick={handleAccept}>Aceitar</Button>
        <Button onClick={handleDecline}>Declinar</Button>
      </div>
    </FooterContainer>
  );
};

export default AcceptanceBar;