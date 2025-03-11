import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemDiffer,
  SidebarFooter,
  SidebarIcon,
  ButtonForCellPhoneToOpenSidebar,
} from "./styles";
import { appStatus } from "../../store/modules/app_status/actions";
import { collapseSidebar } from "../../store/modules/sidebar/actions";

import ExpandedLogo from "../../assets/logo-vert.png";
import Logo from "../../assets/marca-vert.png";
import Leaf from "../../assets/icons/folha1.svg";
import ArrowRight from "../../assets/icons/arrow_right.svg";
import ArrowLeft from "../../assets/icons/arrow_left.svg";

import {
  StyledUser,
  StyledUsers,
  StyledStocks,
  StyledSettings,
  StyledWork,
} from "./styles";

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
        console.error("Erro ao recuperar dados:", error);
      }
    }
  };

  // Chame a função assíncrona handleLogin em algum ponto apropriado do seu código

  const setCollapsed = (state) => {
    dispatch(collapseSidebar(state));
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
    } else {
      setActiveDashboard(false);
    }
    if (app_status === "Usuários") {
      setActiveUsers(true);
    } else {
      setActiveUsers(false);
    }
    if (app_status === "Pedidos") {
      setActiveShoppingCart(true);
    } else {
      setActiveShoppingCart(false);
    }
    if (app_status === "Meu Perfil") {
      setActiveUser(true);
    } else {
      setActiveUser(false);
    }
    if (app_status === "Configurações") {
      setActiveSettings(true);
    } else {
      setActiveSettings(false);
    }
  };

  useEffect(() => {
    handleActiveIcon();
    handleLogin();
  }, [app_status, currentUser]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  // aplicar aqui  um botão para mostrar a barra lateral ou não no celular
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSetShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleToggleSidebar = () => {
    dispatch(collapseSidebar(!collapsed));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <SidebarContainer
        collapsed={collapsed}
        showSidebar={showSidebar || window.innerWidth > 768}
      >
        <SidebarHeader onClick={handleToggleSidebar}>
          <AnimatePresence mode="wait">
            <motion.img
              key={collapsed ? "logo-collapsed" : "logo-expanded"}
              src={collapsed ? Logo : ExpandedLogo}
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                width: collapsed ? "38px" : "200px",
                marginTop: "32px",
                background: "transparent",
                padding: "8px",
              }}
            />
          </AnimatePresence>
        </SidebarHeader>

        <SidebarMenu>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SidebarMenuItem
                collapsed={collapsed}
                data-label="Dashboard"
                style={{ marginTop: "64px" }}
                className={app_status === "Dashboard" ? "active" : ""}
                onClick={() => handleItemClick("Dashboard")}
              >
                {collapsed ? (
                  <StyledStocks active={activeDashboard} />
                ) : (
                  "Dashboard"
                )}
              </SidebarMenuItem>
            </motion.div>
          </AnimatePresence>

          {currentUser?.user_type === "ADM" && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <SidebarMenuItem
                  collapsed={collapsed}
                  data-label="Usuários"
                  className={app_status === "Usuários" ? "active" : ""}
                  onClick={() => handleItemClick("Usuários")}
                >
                  {collapsed ? (
                    <StyledUsers active={activeUsers} />
                  ) : (
                    "Usuários"
                  )}
                </SidebarMenuItem>
              </motion.div>
            </AnimatePresence>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {currentUser?.user_type === "ADM" ? (
                <SidebarMenuItem
                  collapsed={collapsed}
                  data-label="Prospecção"
                  className={app_status === "Projetos" ? "active" : ""}
                  onClick={() => handleItemClick("Projetos")}
                >
                  {collapsed ? <SidebarIcon src={Leaf} alt="" /> : "Prospecção"}
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem
                  collapsed={collapsed}
                  data-label="Meus Projetos"
                  className={app_status === "Projetos" ? "active" : ""}
                  onClick={() => handleItemClick("Projetos")}
                >
                  {collapsed ? (
                    <SidebarIcon src={Leaf} alt="" />
                  ) : (
                    "Meus Projetos"
                  )}
                </SidebarMenuItem>
              )}
            </motion.div>
          </AnimatePresence>

          {currentUser?.user_type === "ADM" && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <SidebarMenuItem
                  collapsed={collapsed}
                  data-label="Projetos"
                  className={app_status === "Desenvolvimento" ? "active" : ""}
                  onClick={() => handleNavigate("/analysis_and_development")}
                >
                  {collapsed ? <StyledWork active={activeUsers} /> : "Projetos"}
                </SidebarMenuItem>
              </motion.div>
            </AnimatePresence>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <SidebarMenuItem
                collapsed={collapsed}
                data-label="Meu Perfil"
                className={app_status === "Meu Perfil" ? "active" : ""}
                onClick={() => handleItemClick("Meu Perfil")}
              >
                {collapsed ? <StyledUser active={activeUser} /> : "Meu Perfil"}
              </SidebarMenuItem>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <SidebarMenuItem
                collapsed={collapsed}
                data-label="Configurações"
                className={app_status === "Configurações" ? "active" : ""}
                onClick={() => handleItemClick("Configurações")}
              >
                {collapsed ? (
                  <StyledSettings active={activeSettings} />
                ) : (
                  "Configurações"
                )}
              </SidebarMenuItem>
            </motion.div>
          </AnimatePresence>
        </SidebarMenu>

        <SidebarMenuItemDiffer
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            bottom: "60px", // Move a seta um pouco mais para cima
            left: "50%",
            transform: "translateX(-50%)",
            height: "30px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.img
                key="arrow-right"
                src={ArrowRight}
                alt="arrow-right"
                style={{
                  position: "absolute",
                  width: "50px",
                }}
                initial={{ opacity: 0, rotate: -90, y: -5 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: 90, y: 5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : (
              <motion.img
                key="arrow-left"
                src={ArrowLeft}
                alt="arrow-left"
                style={{
                  position: "absolute",
                  width: "50px",
                }}
                initial={{ opacity: 0, rotate: 90, y: 5 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: -90, y: -5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </SidebarMenuItemDiffer>

        <SidebarFooter
          style={{
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.span
                key="collapsed"
                style={{ color: "#054d00", position: "absolute" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                V.E &copy;
              </motion.span>
            ) : (
              <motion.span
                key="expanded"
                style={{ color: "#054d00", position: "absolute" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                Vert Ecotech &copy; 2025
              </motion.span>
            )}
          </AnimatePresence>
        </SidebarFooter>
      </SidebarContainer>
    </motion.div>
  );
};

export default Sidebar;
