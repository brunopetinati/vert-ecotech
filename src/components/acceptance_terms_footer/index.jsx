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
          text: 'Parabéns pelo seu cadastro! Tudo ocorreu como o esperado! Insira os dados para logar.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        // função que zera o status redux aqui
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