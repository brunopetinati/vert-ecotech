import { motion } from 'framer-motion';
import { Label, FileInput, Container, InnerContainer, Column } from '../projects_t_engineering/styles';


const ProjectTabLegal = ({ user, project}) => {
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    >
    <Container>
      <InnerContainer>
        <Column>
          <Label htmlFor="duediligence">Duediligence:</Label>
          <FileInput id="duediligence" name="duediligence" />
        </Column>
      </InnerContainer>
    </Container>
  </motion.div>
  )
};

export default ProjectTabLegal;