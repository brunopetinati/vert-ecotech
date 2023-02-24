
import { useDispatch, useSelector } from "react-redux";
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';
import { collapseSidebar } from '../../store/modules/sidebar/actions';
import IconHamburger from '../../assets/icons/list.png'


const Sidebar = () => {

  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  
  const collapsed = useSelector((state) => state.sidebar.status);
  console.log('este é o console.log do collapsed', collapsed)

  const setCollapsed = (state) => {
    dispatch(collapseSidebar(state))
  };

  //const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (status) => {
    dispatch(appStatus(status));
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <img src={IconHamburger} alt="0" style={{width: '20px'}}/> : <h2>Vert Ecotech</h2>}
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>{collapsed ? 'D' : 'Dashboard'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>{collapsed ? 'U' : 'Usuários'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>{collapsed ? 'Pr' : 'Projetos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>{collapsed ? 'Pe' :'Pedidos'}</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Loja" ? "active" : ""} onClick={() => handleItemClick("Loja")}>{collapsed ? 'L' :'Loja' }</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>{collapsed ? 'C' : 'Configurações'}</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
       {collapsed ? <span>V.E  &copy;</span> : <span>Vert Ecotech &copy; 2023</span>}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;