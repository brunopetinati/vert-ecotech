
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter, SidebarIcon, StyledIcon } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';

import ExpandedLogo from '../../assets/logo-vert.png'
import Logo from '../../assets/marca-vert.png'
import Exit from '../../assets/icons/exit.svg';
import MagnifyingGlass from '../../assets/gifs/magnifyingglass.gif'
import { StyledUser, StyledUsers,  StyledStocks, StyledSettings, StyledWork } from './styles';
import DefaultModal from "../default_modal";


const KanbanSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  const collapsed = useSelector((state) => state.sidebar);
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

  const ConsoleLog = () => {
    console.log('clicou');
  }

  // modal pesquisar

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <img src={Logo} alt="0" style={{width: '20px', marginTop: '32px'}}/> :  <img src={ExpandedLogo} alt="0" style={{width: '100px', marginTop: '32px'}}/> }
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={app_status === "Pesquisar" ? "active" : ""} onClick={openModal}>{collapsed ? <img src={MagnifyingGlass}  alt="pesquisar" style={{width: '64px'}}/> : 'Pesquisar'}</SidebarMenuItem>
        <SidebarMenuItem onClick={() => handleNavigate("/welcome")}>{collapsed ? <img src={Exit} alt="voltar" style={{width: '32px'}}/> : 'Voltar'}</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
       {/* collapsed ? <span style={{color: '#054d00'}} onClick={handleSecret}>V.E  &copy;</span> : <span style={{color: '#054d00'}}>Vert Ecotech &copy; 2023</span> */}
      </SidebarFooter>
      {/* <DefaultModal isOpen={modalOpen} onClose={closeModal}>
        <h1>Nossa quanto conteúdo esse modal</h1>
      </DefaultModal> */}
    </SidebarContainer>
  );
};

export default KanbanSidebar;