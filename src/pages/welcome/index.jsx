import { useDispatch, useSelector } from "react-redux";
import Projects from "../../components/projects";
import Sidebar from "../../components/sidebar";

import { Container } from './styles';

const Welcome = () => {

  const app_status = useSelector((state) => state.app_status);

  // criar função que retorna de acordo com o estado o componente
  // state == Projects && Projects etc
  // essa função vai ser um componente que retorna todos os outros

  return (
    <Container>
      <Sidebar />
      <Projects />
    </Container>
  )
};

export default Welcome;