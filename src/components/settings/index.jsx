import ToggleSwitch from '../default_toggle';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectsCards, usersCards } from '../../store/modules/settings/actions';
import { Container } from './styles'
import { StyledButton } from '../default_button/styles';

const Settings = () => {

  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.status);
  const [isCheckedProject, setIsCheckedProject] = useState(false);
  const [isCheckedUser, setIsCheckedUser] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const layoutProjects = useSelector((state) => state.layout.cardsLayoutProjects);
  const layoutUsers = useSelector((state) => state.layout.cardsLayoutUsers);

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
    window.location.reload();
  };

  return (
    <Container collapsed={collapsed}>
      <h1>Configurações</h1>
      {currentUser.user_type === 'ADM' && <ToggleSwitch label={"Habilitar visualização em cards para usuários"} checked={layoutUsers} onChange={handleChangeUsers}/>}
      <ToggleSwitch label={"Habilitar visualização em cards para projetos"} checked={layoutProjects} onChange={handleChangeProjects}/>
      <StyledButton onClick={handleLogout} style={{position: 'absolute', bottom: '32px', right: '32px'}}>Logout</StyledButton>
    </Container>
  );
};

export default Settings;
