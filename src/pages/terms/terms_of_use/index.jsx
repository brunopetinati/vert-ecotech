import { termsOfUse } from './terms_of_use';
import { useSelector } from "react-redux";
import { Container } from './styles';
import { motion } from 'framer-motion';

const TermsOfUsePage = () => {

  const user = useSelector((state) => state.app_data.user_first_access);

  if (!user) {
    return
  }
  
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
