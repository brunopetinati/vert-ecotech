import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStatus } from "../../store/modules/app_status/actions";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { currentUrl } from "../../constants/global";
import { TabContainer, LinearTabs, Tab, Content } from "./styles";
import {
  ButtonContainer,
  Button,
  StyledButtonEditar,
  StyledButtonVoltar,
} from "../../pages/project_intern/intel/styles.js";

const ProjectTabs = ({ tabs, handleRegister, project }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [activeTab, setActiveTab] = useState(0);
  const collapsed = useSelector((state) => state.sidebar);
  let status = project.status;

  //const collapsed = useSelector((state) => state.sidebar.collapsed);

  // Check if status is null on component mount and whenever it changes
  useEffect(() => {
    if (status === null) {
      setActiveTab(0); // If status is null, set activeTab to 0
    }
  }, [status]);

  const handleTabClick = (index) => {
    // Allow changing activeTab only if status is not null or if index is 0 or 1
    if (status !== null || index === 0) {
      setActiveTab(index);
    }
  };

  const navigate = useNavigate();

  const startProject = () => {
    const token = sessionStorage.getItem("Authorization");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        `${currentUrl}/api/engineering/`,
        { project: project.id, status: "started" },
        { headers }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("registration failed!", error);
      });

    axios
      .put(
        `${currentUrl}/api/projects/${project.id}/update/`,
        { status: "started", owner: project.owner, title: project.title },
        { headers }
      )
      .then((response) => {
        Swal.fire({
          title: "Sucesso!",
          text: "O projeto foi inicializado com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/analysis_and_development");
      })
      .catch((error) => {
        // Handle the error if any
      });
  };

  // Rotas
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location?.state?.user;

  const handleComeBack = () => {
    if (user) {
      dispatch(appStatus("edit_user"));
      navigate("/welcome", { state: { user } });
    } else {
      dispatch(appStatus("Desenvolvimento"));
      navigate("/analysis_and_development");
    }
  };

  LinearTabs.defaultProps = {
    collapsed: true, // Valor padrão caso não receba do Redux
  };

  return (
    <div>
      <TabContainer collapsed={collapsed}>
        <LinearTabs collapsed={collapsed}>
          {tabs.map((tab, index) => (
            <Tab key={index} active={(activeTab === index).toString()} onClick={() => handleTabClick(index)} status={status}>
              {tab.label}
            </Tab>
          ))}
        </LinearTabs>
        <Content collapsed={collapsed}>{tabs[activeTab].content}</Content>
      </TabContainer>

      <div style={{ paddingBottom: "50px" }}>
        {activeTab === 0 && (
          <ButtonContainer>
            <StyledButtonEditar
              onClick={handleRegister}
              style={{ margin: "0px 10px 0px 0px" }}
            >
              Editar Informações
            </StyledButtonEditar>
            <StyledButtonVoltar
              onClick={() => handleComeBack()}
              style={{ margin: "0px 10px 0px 0px" }}
            >
              Voltar
            </StyledButtonVoltar>
            {project.status === null && currentUser.user_type === "ADM" && (
              <Button onClick={() => startProject()}>
                Inicializar Processo
              </Button>
            )}
          </ButtonContainer>
        )}
      </div>
    </div>
  );
};

export default ProjectTabs;
