import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import { motion } from 'framer-motion';

const OutsiderCanceled = () => {


  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <h3>Tudo bem! Seu projeto foi salvo com sucesso. Continue mais tarde.</h3>
        
      </motion.div>
    </Container>
  )
};

export default OutsiderCanceled;