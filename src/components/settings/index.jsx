import ToggleSwitch from '../default_toggle';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectsCards, usersCards } from '../../store/modules/settings/actions';
import { Container } from './styles'

const Settings = () => {

  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.status);
  const [isCheckedProject, setIsCheckedProject] = useState(false);
  const [isCheckedUser, setIsCheckedUser] = useState(false);

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

  return (
    <Container collapsed={collapsed}>
      <h1>Configurações</h1>
      <ToggleSwitch label={"Habilitar visualização em cards para usuários"} checked={layoutUsers} onChange={handleChangeUsers}/>
      <ToggleSwitch label={"Habilitar visualização em cards para projetos"} checked={layoutProjects} onChange={handleChangeProjects}/>
    </Container>
  );
};

export default Settings;
