
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { motion } from "framer-motion";
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuItemDiffer, SidebarFooter, SidebarIcon, ButtonForCellPhoneToOpenSidebar } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';

import ExpandedLogo from '../../assets/logo-vert.png'
import Logo from '../../assets/marca-vert.png'
import Leaf from '../../assets/icons/folha1.svg';
import ArrowRight from '../../assets/icons/arrow_right.svg'
import ArrowLeft from '../../assets/icons/arrow_left.svg'

import { StyledUser, StyledUsers,  StyledStocks, StyledSettings, StyledWork } from './styles';

import { currentUrl } from "../../constants/global";
import { userLogin } from "../../store/modules/login/actions";
import { getOwners } from "../../store/modules/app_data/thunk";
import { getProjects } from "../../store/modules/app_data/thunk";
import { getEngineeringTable } from "../../store/modules/app_data/thunk";

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  const collapsed = useSelector((state) => state.sidebar);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogin = async () => {


    if (!currentUser) { 
      const token = sessionStorage.Authorization;
      const email = sessionStorage.Email;
      const password = sessionStorage.Password;

      try {
        const response = await axios.post(`${currentUrl}/api/login/`, {
          email,
          password,
        });
  
        dispatch(userLogin(token, response.data));
        await Promise.all([
          dispatch(getOwners(token)),
          dispatch(getProjects(token)),
          dispatch(getEngineeringTable(token)),
        ]);
      } catch (error) {
        console.error('Erro ao recuperar dados:', error);
      }
    }
  };
  
  // Chame a função assíncrona handleLogin em algum ponto apropriado do seu código
  

  const setCollapsed = (state) => {
    dispatch(collapseSidebar(state))
  };

  const handleItemClick = (status) => {
    dispatch(appStatus(status));
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
    handleLogin();
  }, [app_status, currentUser])


  const handleNavigate = (path) => {
    navigate(path);
  };

  
// aplicar aqui  um botão para mostrar a barra lateral ou não no celular
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSetShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
      <ButtonForCellPhoneToOpenSidebar className={showSidebar ? 'rotate' : ''} onClick={() => handleSetShowSidebar()}>
        <img src={Logo} alt="0" style={{width: '20px'}}/>
      </ButtonForCellPhoneToOpenSidebar>
      
      <SidebarContainer collapsed={collapsed} showSidebar={showSidebar}>

        <SidebarHeader onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <img src={Logo} alt="0" style={{width: '20px', marginTop: '32px'}}/> :  <img src={ExpandedLogo} alt="0" style={{width: '100px', marginTop: '32px'}}/> }
        </SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem collapsed={collapsed} data-label="Dashboard" style={{marginTop: '64px'}} className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>
            {collapsed ? <StyledStocks active={activeDashboard} /> : 'Dashboard'}
          </SidebarMenuItem>

          {currentUser?.user_type === "ADM" && 
          <SidebarMenuItem collapsed={collapsed} data-label="Usuários" className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>
            {collapsed ? <StyledUsers active={activeUsers} /> : 'Usuários'}
          </SidebarMenuItem>}

          {currentUser?.user_type === "ADM" ? 
          <SidebarMenuItem collapsed={collapsed} data-label="Prospecção" className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>
            {collapsed ? <SidebarIcon src={Leaf} alt=""/> : 'Prospecção'}
          </SidebarMenuItem> : 
          <SidebarMenuItem collapsed={collapsed} data-label="Meus Projetos" className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>
            {collapsed ? <SidebarIcon src={Leaf} alt=""/> : 'Meus Projetos'}
          </SidebarMenuItem>}
          
          {currentUser?.user_type === "ADM" && 
          <SidebarMenuItem collapsed={collapsed} data-label="Projetos" className={app_status === "Desenvolvimento" ? "active" : ""} onClick={() => handleNavigate("/analysis_and_development")}>
            {collapsed ? <StyledWork active={activeUsers} /> : 'Projetos'}
          </SidebarMenuItem>}
          
          <SidebarMenuItem collapsed={collapsed} data-label="Meu Perfil" className={app_status === "Meu Perfil" ? "active" : ""} onClick={() => handleItemClick("Meu Perfil")}>
            {collapsed ? <StyledUser active={activeUser} /> : 'Meu Perfil'}
          </SidebarMenuItem>

          <SidebarMenuItem collapsed={collapsed} data-label="Configurações" className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>
            {collapsed ? <StyledSettings active={activeSettings}/>  : 'Configurações'}
          </SidebarMenuItem>
        
        </SidebarMenu>

        <SidebarMenuItemDiffer style={{marginTop: '-32px'}} onClick={() => setCollapsed(!collapsed)}> 
          {collapsed ? <img src={ArrowRight} alt="0" style={{width: '60px'}}/> :  <img src={ArrowLeft} alt="0" style={{width: '60px'}}/> }
        </SidebarMenuItemDiffer>

        <SidebarFooter>
          {collapsed ? <span style={{color: '#054d00'}}>V.E  &copy;</span> : <span style={{color: '#054d00'}}>Vert Ecotech &copy; 2023</span>}
        </SidebarFooter>

      </SidebarContainer>
    </motion.div>
  );
};

export default Sidebar;