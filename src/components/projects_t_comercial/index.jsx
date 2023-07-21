import { motion } from 'framer-motion';
import { Label, FileInput, Container, InnerContainer } from '../projects_t_engineering/styles';

const ProjectTabComercial = ({ user, project }) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
            >
      <Container>
      <h1 style={{margin: '32px'}}>Propostas</h1>      

        <InnerContainer>
        </InnerContainer>
      </Container>
    </motion.div>
  )
};

export default ProjectTabComercial;

