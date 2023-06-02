import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import { motion } from 'framer-motion';

const OutsiderSuccess = () => {


  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <h3>Parabéns! O seu projeto foi registrado com sucesso!</h3>
        
      </motion.div>
    </Container>
  )
};

export default OutsiderSuccess;