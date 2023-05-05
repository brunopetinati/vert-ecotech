import { FooterContainer, Button } from './styles';
import { useNavigate } from "react-router-dom";

const AcceptanceBar = ({path, func}) => {

  const navigate = useNavigate();

  const handleAccept = () => {
    if (func) {
      func();
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