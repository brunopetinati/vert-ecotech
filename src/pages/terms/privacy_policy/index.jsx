import { privacyPolicyHTML } from "./privacy_policy";
import { Container } from './styles';
import { motion } from "framer-motion";


const PrivacyPolicyPage = () => {


  return (
    <Container>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      >
        <div dangerouslySetInnerHTML={{__html: privacyPolicyHTML}} />
      </motion.div>
    </Container>
  )
};

export default PrivacyPolicyPage;