import { privacyPolicyHTML } from "./privacy_policy";
import { Container } from './styles';
import { motion } from "framer-motion";
import DefaultButton from "../../../components/default_button";

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
      <div style={{ marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><DefaultButton text={'Ler Termos de Uso'} path={'/terms_of_use_page'} /></div>
    </Container>
  )
};

export default PrivacyPolicyPage;