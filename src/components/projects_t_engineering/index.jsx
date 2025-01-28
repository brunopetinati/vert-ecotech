import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreditoCarbono from './CreditoCarbono/CreditoCarbono';
import GeographicCoordinates from './GeographicCoordinates/GeographicCoordinates';
import imageTopo from '../../assets/ods/topo.png';
import image01 from '../../assets/ods/erradicao-pobreza.png';
import image02 from '../../assets/ods/fome-zero.png';
import image03 from '../../assets/ods/saude-bem-estar.png';
import image04 from '../../assets/ods/educacao-qualidade.png';
import image05 from '../../assets/ods/igualdade-genero.png';
import image06 from '../../assets/ods/agua-potavel-saneamento.png';
import image07 from '../../assets/ods/energia-limpa.png';
import image08 from '../../assets/ods/trabalho-decente.png';
import image09 from '../../assets/ods/industria-inovacao.png';
import image10 from '../../assets/ods/reducao-desigualdade.png';
import image11 from '../../assets/ods/cidades-comunidades.png';
import image12 from '../../assets/ods/consumo-producao.png';
import image13 from '../../assets/ods/mudanca-do-clima.png';
import image14 from '../../assets/ods/vida-na-agua.png';
import image15 from '../../assets/ods/vida-terrestre.png';
import image16 from '../../assets/ods/paz-justica.png';
import image17 from '../../assets/ods/parcerias.png';
import image18 from '../../assets/ods/objetivos.png';
import CardButton from './CardButton/CardButton';
import ProjectTokensList1 from './ProjectTokensList1';
import ProjectTokensList2 from './ProjectTokensList2';
import ProjectTokensList3 from './ProjectTokensList3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
import { CardTopo, CardContainer, styles } from './styles';
import FileUploadBlockchain from './FileUpload/FileUploadBlockchain';
import AdditionalInformation from './AdditionalInformation/AdditionalInformation';
import ContasWilder from './ContasWilder/ContasWilder';
import Moedas from './CryptoMoeda/CryptoMoeda';


const ProjectTabEngineering = ({ project }) => {
  const [telaAtiva, setTelaAtiva] = useState('cardsContainer');
  const engineering = useSelector((state) => state.app_data.engineering);
  const matchObject = engineering.find(item => item.project === project.id);
  let matchObjectId = null;

  if (matchObject) {
    matchObjectId = matchObject.id;
  } else {
    console.error('Nenhum objeto encontrado com o project_id correspondente.');
  }

  const renderizarTela = () => {
    switch (telaAtiva) {
      case 'cardsContainer':
        return (
          <div >
            <CardTopo>
              <img src={imageTopo} alt="Imagem" />
            </CardTopo>
            {/* Conteúdo da Página 3 */}
            <CardContainer>
              <CardButton image={image01} project_id={project.id} card_name={'erradicao-pobreza'} />
              <CardButton image={image02} project_id={project.id} card_name={'fome-zero'} />
              <CardButton image={image03} project_id={project.id} card_name={'saude-bem-estar'} />
              <CardButton image={image04} project_id={project.id} card_name={'educacao-qualidade'} />
              <CardButton image={image05} project_id={project.id} card_name={'igualdade-genero'} />
              <CardButton image={image06} project_id={project.id} card_name={'agua-potavel-saneamento'} />
              <CardButton image={image07} project_id={project.id} card_name={'energia-limpa'} />
              <CardButton image={image08} project_id={project.id} card_name={'trabalho-decente'} />
              <CardButton image={image09} project_id={project.id} card_name={'industria-inovacao'} />
              <CardButton image={image10} project_id={project.id} card_name={'reducao-desigualdade'} />
              <CardButton image={image11} project_id={project.id} card_name={'cidades-comunidades'} />
              <CardButton image={image12} project_id={project.id} card_name={'consumo-producao'} />
              <CardButton image={image13} project_id={project.id} card_name={'mudanca-do-clima'} />
              <CardButton image={image14} project_id={project.id} card_name={'vida-na-agua'} />
              <CardButton image={image15} project_id={project.id} card_name={'vida-terrestre'} />
              <CardButton image={image16} project_id={project.id} card_name={'paz-justica'} />
              <CardButton image={image17} project_id={project.id} card_name={'parcerias'} />
              <img src={image18} alt="Imagem" />
            </CardContainer>
          </div>
        );
      case 'geographicCoordinates':
        return (
          <div className="pagina">
            {/* Conteúdo da Página 3 */}
            <GeographicCoordinates project_id={project.id} />
          </div>
        );
      case 'creditoCarbono':
        return (
          <div className="pagina">
            {/* Conteúdo do cálculo de crédito de carbono */}
            <CreditoCarbono project_id={project.id} />
          </div>
        );
      case 'projectTokensList2':
        return (
          <div className="pagina">
            {/* Conteúdo da Página 1 */}
            <ProjectTokensList2 project_id={project.id} />
          </div>
        );
      case 'projectTokensList3':
        return (
          <div className="pagina">
            {/* Conteúdo da Página 2 */}
            <ProjectTokensList3 project_id={project.id} />
          </div>
        );
      case 'projectTokensList1':
        return (
          <div className="pagina">
            {/* Conteúdo da Página 2 */}
            <ProjectTokensList1 project_id={project.id} />
          </div>
        );
      case 'uploadsSave':
        return (
          <div className="pagina">
            <FileUploadBlockchain project_id={project.id}
              tela_name={'Gerenciar Projeto'}
              modelo_GUID={'6c84fb90-12c4-11e1-840d-7b25c5ee775a'}
              confirmacao_doc={true} />
          </div>
        );
      case 'additionalInformation':
        return (
          <div className="pagina">
            <AdditionalInformation project_id={project.id} matchObjectId={matchObjectId} />
          </div>
        );
      case 'Rastreality':
        return (
          <div className="pagina">
            <ContasWilder />
          </div>
        );
      case 'Moedas':
        return (
          <div className="pagina">
            <Moedas />
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div style={{ float: 'left', marginLeft: '100px' }}>
      <div style={styles.tabletMenu}>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('cardsContainer')}>
          <FontAwesomeIcon icon={faUser} style={{ color: "green" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Objetivos Desenv. Sust.</div>
        </div>
        <div style={styles.menuItem} className="menu-item" onClick={() => setTelaAtiva('geographicCoordinates')}>
          <FontAwesomeIcon icon={faGlobe} style={{ color: "red" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Coordenada Geográfica</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('additionalInformation')}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ color: "orange" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Informações PDD</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('creditoCarbono')}>
          <FontAwesomeIcon icon={faCalculator} style={{ color: "blue" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Crédito de Carbono</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('projectTokensList2')}>
          <FontAwesomeIcon icon={faChartBar} style={{ color: "purple" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Tokens Visão Mensal</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('projectTokensList3')}>
          <FontAwesomeIcon icon={faTable} style={{ color: "orange" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Tokens Visão Anual</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('projectTokensList1')}>
          <FontAwesomeIcon icon={faList} style={{ color: "brown" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Tokens Aposentadoria</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('uploadsSave')}>
          <FontAwesomeIcon icon={faUpload} style={{ color: "gold" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Gerenciar Projeto</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('Rastreality')}>
          <FontAwesomeIcon icon={faHistory} style={{ color: "green" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Contas Wilder</div>
        </div>
        <div style={styles.menuItem} onClick={() => setTelaAtiva('Moedas')}>
          <FontAwesomeIcon icon={faMoneyBill} style={{ color: "green" }} />
          <div style={{ paddingLeft: "8px", color: "grey" }}>Vert Carbon Credit</div>
        </div>
        {renderizarTela()}
      </div>
    </div>
  );
};

export default ProjectTabEngineering;
