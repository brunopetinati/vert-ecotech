import { FooterContainer, Button } from './styles';
import { useNavigate } from "react-router-dom";
import { currentUrl } from '../../constants/global';
import { userLogin } from "../../store/modules/login/actions";
import axios from "axios";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


const AcceptanceBar = ({path, func, handleSubmit, event, finalObject}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccept = () => {
    if (func) {
      func();
    }
    if (handleSubmit) {

    event.preventDefault();
    axios.post(`http://${currentUrl}:8000/api/signup/`, {...finalObject, accept_terms_of_use: true,
    accept_privacy_politics: true})

      .then(response => {
        console.log('response.data.access', response.data.access);
        sessionStorage.setItem('Authorization', response.data.access);
        dispatch(userLogin(response.data.access, response.data));
        
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.city && error.response.data.city[0] === "This field may not be blank." && error.response.data.state && error.response.data.state[0] === "This field may not be blank.") {
          Swal.fire({
            title: 'Erro!',
            text: 'Verifique o CEP e tente novamente. Caso o erro persista, contate nosso suporte.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'Algo deu errado ao tentar processar sua requisição. Verifique os campos e tente novamente!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('tracking the following error would be important',error);
      }
    });

    }
    navigate(path);
  };

  const handleDecline = () => {
    navigate('/');
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