
import { useDispatch, useSelector } from "react-redux";
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './styles'
import { appStatus } from '../../store/modules/app_status/actions';


const Sidebar = () => {

  const dispatch = useDispatch();
  const app_status = useSelector((state) => state.app_status.status);
  
  //const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (status) => {
    dispatch(appStatus(status));
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h2>Vert Ecotech</h2>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={app_status === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>Dashboard</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Usuários" ? "active" : ""} onClick={() => handleItemClick("Usuários")}>Usuários</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>Projetos</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>Pedidos</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Loja" ? "active" : ""} onClick={() => handleItemClick("Loja")}>Loja</SidebarMenuItem>
        <SidebarMenuItem className={app_status === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>Configurações</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
        <span>Vert Ecotech &copy; 2023</span>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;