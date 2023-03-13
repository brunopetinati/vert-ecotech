
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter, SidebarIcon } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';

import ExpandedLogo from '../../assets/logo-vert.png'
import Logo from '../../assets/marca-vert.png'
import User from '../../assets/icons/user.svg'
import Stocks from '../../assets/icons/stocks.svg'
import ShoppingCart from '../../assets/icons/shopping-cart.svg'
import Settings from '../../assets/icons/settings.svg'
import Leaf from '../../assets/icons/leaf.svg'
import Users from '../../assets/icons/users.svg'



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
        <SidebarMenuItem className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>{collapsed ? <SidebarIcon src={Stocks} alt=""/> : 'Dashboard'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>{collapsed ? <SidebarIcon src={Users} alt=""/> : 'Usuários'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>{collapsed ? <SidebarIcon src={Leaf} alt=""/> : 'Projetos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>{collapsed ? <SidebarIcon src={ShoppingCart} alt=""/> :'Pedidos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Meu Perfil" ? "active" : ""} onClick={() => handleItemClick("Meu Perfil")}>{collapsed ? <SidebarIcon src={User} alt=""/> : 'Meu Perfil'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>{collapsed ? <SidebarIcon src={Settings} alt=""/>  : 'Configurações'}</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
       {collapsed ? <span onClick={handleSecret}>V.E  &copy;</span> : <span>Vert Ecotech &copy; 2023</span>}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;