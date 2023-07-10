
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter, SidebarIcon, StyledIcon } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';

import ExpandedLogo from '../../assets/logo-vert.png'
import Logo from '../../assets/marca-vert.png'
import Leaf from '../../assets/icons/leaf.svg';

import { StyledUser, StyledUsers,  StyledStocks, StyledSettings, StyledWork } from './styles';

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  const collapsed = useSelector((state) => state.sidebar.status);
  const currentUser = useSelector((state) => state.user.currentUser);


  const setCollapsed = (state) => {
    dispatch(collapseSidebar(state))
  };

  const handleItemClick = (status) => {
    dispatch(appStatus(status));
  };

  const handleSecret = () => {
    return
  };


  // código para alterar cor dos ícones a partir daqui

  const [activeDashboard, setActiveDashboard] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeUsers, setActiveUsers] = useState(false);
  const [activeShoppingCart, setActiveShoppingCart] = useState(false);
  const [activeSettings, setActiveSettings] = useState(false);

  const handleActiveIcon = () => {
    if (app_status === "Dashboard") {
      setActiveDashboard(true);
    } else {setActiveDashboard(false)};
    if (app_status === "Usuários") {
      setActiveUsers(true);
    } else {setActiveUsers(false)};
    if (app_status === "Pedidos") {
      setActiveShoppingCart(true);
    } else {setActiveShoppingCart(false)};
    if (app_status === "Meu Perfil") {
      setActiveUser(true);
    } else {setActiveUser(false)};
    if (app_status === "Configurações") {
      setActiveSettings(true);
    } else {setActiveSettings(false)};
  };

  useEffect(() => {
    handleActiveIcon();
  }, [app_status])


  const handleNavigate = (path) => {
    navigate(path);
  };


  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <img src={Logo} alt="0" style={{width: '20px', marginTop: '32px'}}/> :  <img src={ExpandedLogo} alt="0" style={{width: '100px', marginTop: '32px'}}/> }
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>{collapsed ? <StyledStocks active={activeDashboard} /> : 'Dashboard'}</SidebarMenuItem>
        {currentUser.user_type === "ADM" && <SidebarMenuItem className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>{collapsed ? <StyledUsers active={activeUsers} /> : 'Usuários'}</SidebarMenuItem>}
        {currentUser.user_type === "ADM" ? <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>{collapsed ? <SidebarIcon src={Leaf} alt=""/> : 'Prospect'}</SidebarMenuItem> : <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>{collapsed ? <SidebarIcon src={Leaf} alt=""/> : 'Meus Projetos'}</SidebarMenuItem>}
        {currentUser.user_type === "ADM" && <SidebarMenuItem className={app_status === "Desenvolvimento" ? "active" : ""} onClick={() => handleNavigate("/analysis_and_development")}>{collapsed ? <StyledWork active={activeUsers} /> : 'Funil Produtor'}</SidebarMenuItem>}
        <SidebarMenuItem className={app_status === "Meu Perfil" ? "active" : ""} onClick={() => handleItemClick("Meu Perfil")}>{collapsed ? <StyledUser active={activeUser} /> : 'Meu Perfil'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>{collapsed ? <StyledSettings active={activeSettings}/>  : 'Configurações'}</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
       {collapsed ? <span style={{color: '#054d00'}} onClick={handleSecret}>V.E  &copy;</span> : <span style={{color: '#054d00'}}>Vert Ecotech &copy; 2023</span>}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;