import { useSelector } from "react-redux";
import { privacyPolicyHTML } from "./privacy_policy";
import { Container } from './styles';
import AcceptanceBar from "../../acceptance_terms_footer";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PrivacyPolicy = () => {

  const user = useSelector((state) => state.app_data.user_first_access);
  
  if (!user) {
    return
  }

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
      <AcceptanceBar path={'/terms_of_use'} />
    </Container>
  )
};

export default PrivacyPolicy;