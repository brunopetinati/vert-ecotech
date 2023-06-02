import { Container, InnerContainer, ButtonContainer, Column, Button } from './styles'
import { motion } from 'framer-motion';
import GrowingPlantGif from '../../assets/gifs/plant-gworing.gif';


const OutsiderCanceled = () => {

  return (
    <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={GrowingPlantGif} alt={'gif'} style={{width: '80%'}}/>
          <h3 style={{color: '#054d00'}}>Tudo bem! Seu projeto foi salvo com sucesso. Continue mais tarde.</h3>
        </motion.div>
    </Container>
  )
};

export default OutsiderCanceled;