import { termsOfUse } from './terms_of_use';

const TermsOfUse = () => {
  return (
    <div dangerouslySetInnerHTML={{__html: termsOfUse}} />
  )
};

export default TermsOfUse;