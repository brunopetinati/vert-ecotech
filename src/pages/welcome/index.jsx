import Projects from "../../components/projects";
import Sidebar from "../../components/sidebar";
import { Container } from './styles';

const Welcome = () => {

  return (
    <Container>
      <Sidebar />
      <Projects />
    </Container>
  )
};

export default Welcome;