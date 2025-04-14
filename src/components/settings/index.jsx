import ToggleSwitch from '../default_toggle';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectsCards, usersCards } from '../../store/modules/settings/actions';
import { Container, InnerContainer, Row, ButtonContainer, SectionContainer } from './styles'
import { StyledButton } from '../default_button/styles';
import ResetPassword from '../reset_password';
import { eraseAll } from '../../store/modules/app_data/actions';
import { useNavigate } from 'react-router-dom';
import AddGanacheNetwork from '../projects_t_engineering/SmartContract/AddGanacheNetwork';

const Settings = () => {

  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar);
  const [isCheckedProject, setIsCheckedProject] = useState(false);
  const [isCheckedUser, setIsCheckedUser] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const layoutProjects = useSelector((state) => state.layout.cardsLayoutProjects);
  const layoutUsers = useSelector((state) => state.layout.cardsLayoutUsers);

  const navigate = useNavigate();

  useEffect(()=> {
    if (layoutProjects){
      setIsCheckedProject(layoutProjects);
    }
    if (layoutUsers){
      setIsCheckedUser(layoutUsers);
    }
  }, [layoutProjects, layoutUsers]);

  const handleChangeUsers= () => {
    setIsCheckedUser(!isCheckedUser);

    if (isCheckedUser) {
      dispatch(usersCards(true));
    } else {
      dispatch(usersCards(false));
    };
  };

  const handleChangeProjects = () => {
    setIsCheckedProject(!isCheckedProject);

    if (isCheckedProject) {
      dispatch(projectsCards(true));
    } else {
      dispatch(projectsCards(false));
    };

  };

  const handleLogout = () => {
    dispatch(eraseAll());
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };
  

  const handleShowResetPasswordModal = () => {
    setShowResetPassword(!showResetPassword);
  }

  return (
    <Container collapsed={collapsed}>
      <InnerContainer>
        <h1>Configurações</h1>
        
        {currentUser.user_type === 'ADM' && (
          <ToggleSwitch 
            label={"Habilitar visualização em cards para usuários"} 
            checked={layoutUsers} 
            onChange={handleChangeUsers}
          />
        )}
        
        <ToggleSwitch 
          label={"Habilitar visualização em cards para projetos"} 
          checked={layoutProjects} 
          onChange={handleChangeProjects}
        />
        
        <SectionContainer>  {/* Novo container para a seção */}
          <h1>Adicionar Rede Ganache-QA-SP à MetaMask</h1>
          <ButtonContainer>
            <AddGanacheNetwork />
            <StyledButton onClick={handleShowResetPasswordModal}>
              Alterar Senha
            </StyledButton>
            <StyledButton onClick={handleLogout}>
              Deslogar
            </StyledButton>
          </ButtonContainer>
        </SectionContainer>
  
        {showResetPassword && <ResetPassword isOpen={showResetPassword} onClose={handleShowResetPasswordModal}/>}
      </InnerContainer>
    </Container>
  );
};

export default Settings;
