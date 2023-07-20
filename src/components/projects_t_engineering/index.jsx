import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { currentUrl } from "../../constants/global";
import { Container, InnerContainer, Column, Label, Input, Span, Button, ButtonContainer, TextArea, ButtonLink, StyledSelect, StyledSelectForUser, DownloadButton, FileInput, TextInput } from './styles';

const ProjectTabEngineering = ({user, project}) => {
  
  // const currentUser = useSelector((state) => state.user.currentUser);
  // engenharia ambiental componente



  return (
    <div style={{ height: '100vh', width: '100vw' }}>

   {user.user_type === "ADM" ? 
      <>        
        <InnerContainer>
        {user.user_type === 'ADM' && project.status !== null ? (
          <>
          <h3>{project.title} - Documentos para consolidação</h3>
          <small>Status: {project.status}</small>
          <Column>
            <Label htmlFor="pdd_pdf">PDD:</Label>
            <FileInput id="pdd_pdf" name="pdd_pdf" />

            <Label htmlFor="pdd_draft">PDD Rascunho:</Label>
            <FileInput id="pdd_draft" name="pdd_draft" />

            <Label htmlFor="viability_analisys">Análise de viabilidade:</Label>
            <FileInput id="viability_analisys" name="viability_analisys" />
          </Column>
          <Column>
            <Label htmlFor="registration_wilder">Registration Wilder:</Label>
            <FileInput id="registration_wilder" name="registration_wilder" />

            <Label htmlFor="duediligence">Duediligence:</Label>
            <FileInput id="duediligence" name="duediligence" />

            <Label htmlFor="aditional_info">Informação adicional: </Label>
            <TextInput id="aditional_info" name="aditional_info" />
          </Column>
        </> 
      ) : (
        <h1></h1>
      )}
        </InnerContainer>
      </> : <h1></h1>}
    </div>
  );
};

export default ProjectTabEngineering;
