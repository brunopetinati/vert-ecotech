import { termsOfUse } from './terms_of_use';
import { Container } from './styles';
import { motion } from 'framer-motion';

const TermsOfUsePage = () => {

  
  const scrollWindow = () => {
    window.scrollTo(0, 0);
  };


  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
        <div dangerouslySetInnerHTML={{__html: termsOfUse}} />
      </motion.div>
    </Container>
)
};

export default TermsOfUsePage;
