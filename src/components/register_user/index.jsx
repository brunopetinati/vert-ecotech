import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { LoginContainer, LoginForm, Input, Button, Img } from './styles';
import Logo from '../../assets/logo-vert-white.png';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { handleCepChange } from '../../api/requests/cep';
import { storeCEP } from '../../store/modules/app_data/actions';
import { removeNonDigits } from '../../constants/functions';
import { storeUserFirstAccess } from '../../store/modules/app_data/actions';

const Register = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirmation, setValidPasswordConfirmation] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validCEP, setValidCEP] = useState(false);
  const [personType, setPersonType] = useState('fisica'); // Default to Pessoa Física

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    city: '',
    state: '',
    street: '',
    district: '',
    company_name: '', // Campo específico para Pessoa Jurídica
    cnpj: '', // Campo específico para Pessoa Jurídica
    user_type: 'Regular',
    accept_terms_of_use: true,
    accept_privacy_politics: true
  });

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmition = (event) => {
    event.preventDefault();

    //if (formState.full_name.length < 0) {
    //  setValidName(true);
    //  return;
   // }

    if (formState.email.length < 6) {
      setValidEmail(true);
      return;
    }

    if (formState.password.length < 6) {
      setValidPassword(true);
      return;
    }

    if (formState.password !== passwordConfirmation) {
      setValidPasswordConfirmation(true);
      return;
    }

    const treatPhone = removeNonDigits(formState.phone);
    if (treatPhone.length < 10) {
      setValidPhone(true);
      return;
    }

    if (!formState.cep) {
      Swal.fire({
        title: 'Erro!',
        text: 'Verifique o CEP e tente novamente. Caso o erro persista, contate nosso suporte.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (formState.cep.includes('_')) {
      setValidCEP(true);
      return;
    }

    // O usuário não está sendo salvo. Está sendo guardado no estado global para aceitar termos mais tarde
    dispatch(storeUserFirstAccess(formState));
    setShowLoading(true);
    setTimeout(() => {
      navigate('/privacy_policy');
    }, 4000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));

    if (name === 'cep') {
      const cep = event.target.value;
      checkCEP(cep);
      setFormState({ ...formState, cep: cep });
    }
  };

  const checkCEP = async (cep) => {
    setFormState({ ...formState, cep: cep });
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length - 1))) {
      const cepObject = await handleCepChange(cep.replace('-', ''));
      setFormState({
        ...formState,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade
      });
    }
    dispatch(storeCEP(cep));
  };

  useEffect(() => {}, [formState]);

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {showLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: 'white' }}>Dados inseridos com sucesso! Continue para o registro</h1>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Img src={Logo} />
            <LoginForm onSubmit={handleSubmition}>
              <div>
                <label>
                  <input
                    type="radio"
                    name="personType"
                    value="fisica"
                    checked={personType === 'fisica'}
                    onChange={() => setPersonType('fisica')}
                  />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>Pessoa Física</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="personType"
                    value="juridica"
                    checked={personType === 'juridica'}
                    onChange={() => setPersonType('juridica')}
                  />                  
                  <span style={{ fontWeight: 'bold', color: 'white' }}>Pessoa Jurídica</span>
                </label>
              </div>
              {personType === 'fisica' ? (
                <>
                  <Input placeholder="Nome Completo" type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} />
                  <Input placeholder="CPF" mask={"999.999.999-99"} alwaysShowMask={false} type="text" name="cpf" value={formState.cpf} onChange={handleInputChange} />
                </>
              ) : (
                <>
                  <Input placeholder="Nome da Empresa" type="text" name="company_name" value={formState.company_name} onChange={handleInputChange} />
                  <Input placeholder="CNPJ" mask={"99.999.999/9999-99"} alwaysShowMask={false} type="text" name="cnpj" value={formState.cnpj} onChange={handleInputChange} />
                </>
              )}
              <Input placeholder="Email" type="email" name="email" value={formState.email} onChange={handleInputChange} />
              <Input placeholder="Senha" type="password" name="password" value={formState.password} onChange={handleInputChange} />
              <Input placeholder="Confirmar senha" type="password" name="password_confirmation" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} />
              <Input
                placeholder="WhatsApp"
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                mask={"(99) 99999-9999"}
                alwaysShowMask={false}
              />
              <Input
                placeholder="CEP"
                type="text"
                name="cep"
                value={formState.cep}
                onChange={(event) => {
                  handleInputChange(event); // Call the original onChange handler to update the state
                }}
                mask={"99999-999"}
              />
              <div>
                <Button onClick={() => handleClick()}>Voltar</Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </LoginForm>
          </div>
        )}
      </motion.div>
    </LoginContainer>
  );
};

export default Register;