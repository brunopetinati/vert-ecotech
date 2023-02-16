
import { useState } from 'react';
import { SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './styles'
import { dashboardStatus, previousStatus, cartStatus, storeStatus, settingsStatus } from '../../store/modules/app_status/actions';


const Sidebar = () => {

  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h2>Vert Ecotech</h2>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={activeItem === "Dashboard" ? "active" : ""} onClick={() => handleItemClick("Dashboard")}>Dashboard</SidebarMenuItem>
        <SidebarMenuItem className={activeItem === "Projetos" ? "active" : ""} onClick={() => handleItemClick("Projetos")}>Projetos</SidebarMenuItem>
        <SidebarMenuItem className={activeItem === "Pedidos" ? "active" : ""} onClick={() => handleItemClick("Pedidos")}>Pedidos</SidebarMenuItem>
        <SidebarMenuItem className={activeItem === "Loja" ? "active" : ""} onClick={() => handleItemClick("Loja")}>Loja</SidebarMenuItem>
        <SidebarMenuItem className={activeItem === "Configurações" ? "active" : ""} onClick={() => handleItemClick("Configurações")}>Configurações</SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
        <span>Vert Ecotech &copy; 2023</span>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;