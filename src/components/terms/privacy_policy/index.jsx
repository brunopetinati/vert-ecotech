import { useSelector } from "react-redux";
import { privacyPolicyHTML } from "./privacy_policy";

const PrivacyPolicy = () => {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <div dangerouslySetInnerHTML={{__html: privacyPolicyHTML}} />
  )
};

export default PrivacyPolicy;