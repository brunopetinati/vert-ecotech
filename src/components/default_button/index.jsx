import { StyledButton } from './styles'
import { useNavigate } from "react-router-dom";


const DefaultButton = ({text, path}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  }

  return (
    <StyledButton onClick={() => handleClick(path)}>{text}</StyledButton>
  )

}; 

export default DefaultButton;