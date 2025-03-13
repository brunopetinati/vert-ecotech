import { useState } from "react";
import { useSelector } from "react-redux";
import CreditoCarbono from "./CreditoCarbono/CreditoCarbono";
import GeographicCoordinates from "./GeographicCoordinates/GeographicCoordinates";
import imageTopo from "../../assets/ods/topo.png";
import image01 from "../../assets/ods/erradicao-pobreza.png";
import image02 from "../../assets/ods/fome-zero.png";
import image03 from "../../assets/ods/saude-bem-estar.png";
import image04 from "../../assets/ods/educacao-qualidade.png";
import image05 from "../../assets/ods/igualdade-genero.png";
import image06 from "../../assets/ods/agua-potavel-saneamento.png";
import image07 from "../../assets/ods/energia-limpa.png";
import image08 from "../../assets/ods/trabalho-decente.png";
import image09 from "../../assets/ods/industria-inovacao.png";
import image10 from "../../assets/ods/reducao-desigualdade.png";
import image11 from "../../assets/ods/cidades-comunidades.png";
import image12 from "../../assets/ods/consumo-producao.png";
import image13 from "../../assets/ods/mudanca-do-clima.png";
import image14 from "../../assets/ods/vida-na-agua.png";
import image15 from "../../assets/ods/vida-terrestre.png";
import image16 from "../../assets/ods/paz-justica.png";
import image17 from "../../assets/ods/parcerias.png";
import image18 from "../../assets/ods/objetivos.png";
import CardButton from "./CardButton/CardButton";
import ProjectTokensList1 from "./ProjectTokensList1";
import ProjectTokensList2 from "./ProjectTokensList2";
import ProjectTokensList3 from "./ProjectTokensList3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faGlobe,
  faUser,
  faCalculator,
  faChartBar,
  faTable,
  faList,
  faUpload,
  faInfoCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { CardTopo, CardContainer, styles, AmbientalButton } from "./styles";
import FileUploadBlockchain from "./FileUpload/FileUploadBlockchain";
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation";
import ContasWilder from "./ContasWilder/ContasWilder";
import Moedas from "./CryptoMoeda/CryptoMoeda";
import { useEffect } from "react";


const ProjectTabEngineering = ({ project }) => {

  const [telaAtiva, setTelaAtiva] = useState("cardsContainer");
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObject = engineering.find((item) => item.project === project.id);
  let matchObjectId = null;
  const [hoveredItem, setHoveredItem] = useState(null);
  const collapsed = useSelector((state) => state.sidebar);



  const menuItems = [
    {
      id: "cardsContainer",
      icon: faUser,
      color: "green",
      label: "Objetivos Desenv. Sust.",
    },
    {
      id: "geographicCoordinates",
      icon: faGlobe,
      color: "red",
      label: "Coordenada Geográfica",
    },
    {
      id: "additionalInformation",
      icon: faInfoCircle,
      color: "orange",
      label: "Informações PDD",
    },
    {
      id: "creditoCarbono",
      icon: faCalculator,
      color: "blue",
      label: "Crédito de Carbono",
    },
    {
      id: "projectTokensList2",
      icon: faChartBar,
      color: "purple",
      label: "Tokens Visão Mensal",
    },
    {
      id: "projectTokensList3",
      icon: faTable,
      color: "orange",
      label: "Tokens Visão Anual",
    },
    {
      id: "projectTokensList1",
      icon: faList,
      color: "brown",
      label: "Tokens Aposentadoria",
    },
    {
      id: "uploadsSave",
      icon: faUpload,
      color: "gold",
      label: "Gerenciar Projeto",
    },
    {
      id: "Rastreality",
      icon: faHistory,
      color: "green",
      label: "Contas Wilder",
    },
    {
      id: "Moedas",
      icon: faMoneyBill,
      color: "green",
      label: "Vert Carbon Credit",
    },
  ];

  if (matchObject) {
    matchObjectId = matchObject.id;
  } else {
    console.error("Nenhum objeto encontrado com o project_id correspondente.");
  }

  const renderizarTela = () => {
    switch (telaAtiva) {
      case "cardsContainer":
        return (
          <div style={styles.pagina}>
            <CardTopo>
              <img src={imageTopo} alt="Imagem" />
            </CardTopo>
            {/* Objetivos Desenv. Sust.*/}
            <CardContainer>
              <CardButton
                image={image01}
                project_id={project.id}
                card_name={"erradicao-pobreza"}
              />
              <CardButton
                image={image02}
                project_id={project.id}
                card_name={"fome-zero"}
              />
              <CardButton
                image={image03}
                project_id={project.id}
                card_name={"saude-bem-estar"}
              />
              <CardButton
                image={image04}
                project_id={project.id}
                card_name={"educacao-qualidade"}
              />
              <CardButton
                image={image05}
                project_id={project.id}
                card_name={"igualdade-genero"}
              />
              <CardButton
                image={image06}
                project_id={project.id}
                card_name={"agua-potavel-saneamento"}
              />
              <CardButton
                image={image07}
                project_id={project.id}
                card_name={"energia-limpa"}
              />
              <CardButton
                image={image08}
                project_id={project.id}
                card_name={"trabalho-decente"}
              />
              <CardButton
                image={image09}
                project_id={project.id}
                card_name={"industria-inovacao"}
              />
              <CardButton
                image={image10}
                project_id={project.id}
                card_name={"reducao-desigualdade"}
              />
              <CardButton
                image={image11}
                project_id={project.id}
                card_name={"cidades-comunidades"}
              />
              <CardButton
                image={image12}
                project_id={project.id}
                card_name={"consumo-producao"}
              />
              <CardButton
                image={image13}
                project_id={project.id}
                card_name={"mudanca-do-clima"}
              />
              <CardButton
                image={image14}
                project_id={project.id}
                card_name={"vida-na-agua"}
              />
              <CardButton
                image={image15}
                project_id={project.id}
                card_name={"vida-terrestre"}
              />
              <CardButton
                image={image16}
                project_id={project.id}
                card_name={"paz-justica"}
              />
              <CardButton
                image={image17}
                project_id={project.id}
                card_name={"parcerias"}
              />
              <img src={image18} alt="Imagem" />
            </CardContainer>
          </div>
        );
      case "geographicCoordinates":
        return (
          <div style={styles.pagina}>
            {/*Coordenada Geográfica*/}
            <GeographicCoordinates project_id={project.id} />
          </div>
        );
      case "additionalInformation":
        return (
          <div style={styles.pagina}>
            {/*Informações PDD*/}
            <AdditionalInformation
              project_id={project.id}
              matchObjectId={matchObjectId}
            />
          </div>
        );
      case "creditoCarbono":
        return (
          <div style={styles.pagina}>
            {/* Crédito de Carbono */}
            <CreditoCarbono project_id={project.id} />
          </div>
        );
      case "projectTokensList2":
        return (
          <div style={styles.pagina}>
            {/*Tokens Visão Mensal*/}
            <ProjectTokensList2 project_id={project.id} />
          </div>
        );
      case "projectTokensList3":
        return (
          <div style={styles.pagina}>
            {/*Tokens Visão Anual*/}
            <ProjectTokensList3 project_id={project.id} />
          </div>
        );
      case "projectTokensList1":
        return (
          <div style={styles.pagina}>
            {/*Tokens Aposentadoria*/}
            <ProjectTokensList1 project_id={project.id} />
          </div>
        );
      case "uploadsSave":
        return (
          <div style={styles.pagina}>
            {/*Gerenciar Projeto*/}
            <FileUploadBlockchain
              project_id={project.id}
              tela_name={"Gerenciar Projeto"}
              modelo_GUID={"6c84fb90-12c4-11e1-840d-7b25c5ee775a"}
              confirmacao_doc={true}
            />
          </div>
        );
      case "Rastreality":
        return (
          <div style={styles.pagina}>
            {/*Contas Wilder*/}
            <ContasWilder />
          </div>
        );
      case "Moedas":
        return (
          <div style={styles.pagina}>
            {/*Vert Carbon Credit*/}
            <Moedas />
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <div style={styles.tabletMenu}>
        <div style={styles.menu}>
          {menuItems.map(({ id, icon, color, label }) => (
            <div
              key={id}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  telaAtiva === id
                    ? color
                    : hoveredItem === id
                      ? "#f0f0f0"
                      : "transparent",
                color: telaAtiva === id ? "white" : "black", 
                padding: collapsed ? "12px 16px" : "8px 14px",
              }}

              onClick={() => setTelaAtiva(id)}
              onMouseEnter={() => setHoveredItem(id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <FontAwesomeIcon
                icon={icon}
                style={{ color: telaAtiva === id ? "white" : color }}
              />
              <div style={{ paddingLeft: "8px", fontSize: collapsed ? "12px" : "10px", }}>
                {label}
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>{renderizarTela()}</div>
    </div>
  );
};

export default ProjectTabEngineering;
