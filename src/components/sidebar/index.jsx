
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';

import ExpandedLogo from '../../assets/logo-vert.png'
import Logo from '../../assets/marca-vert.png'


const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  const collapsed = useSelector((state) => state.sidebar.status);


  const setCollapsed = (state) => {
    dispatch(collapseSidebar(state))
  };

  const handleItemClick = (status) => {
    dispatch(appStatus(status));
  };

  const handleSecret = () => {

    navigate("/intern_client_register");
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <img src={Logo} alt="0" style={{width: '20px', marginTop: '32px'}}/> :  <img src={ExpandedLogo} alt="0" style={{width: '100px', marginTop: '32px'}}/> }
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={app_status === "Meu Perfil" ? "active" : ""} onClick={() => handleItemClick("Meu Perfil")}>{collapsed ? 'MP' : 'Meu Perfil'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>{collapsed ? 'D' : 'Dashboard'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>{collapsed ? 'U' : 'Usuários'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>{collapsed ? 'Pr' : 'Projetos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>{collapsed ? 'Pe' :'Pedidos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Loja" ? "active" : ""} onClick={() => handleItemClick("Loja")}>{collapsed ? 'L' :'Loja' }</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>{collapsed ? 'C' : 'Configurações'}</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
       {collapsed ? <span>V.E  &copy;</span> : <span onClick={handleSecret}>Vert Ecotech &copy; 2023</span>}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;