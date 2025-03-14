import FileUploadBlockchain from './../projects_t_engineering/FileUpload/FileUploadBlockchain';
import {stylesPgMenuInf} from '../styles'
import { useEffect } from "react";

const ProjectTabComercial = ({ user, project }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div style={stylesPgMenuInf.container}>
      <FileUploadBlockchain project_id={project.id} 
        tela_name={'Proposta Comercial'} 
        modelo_GUID='5d9f46b0-3f3d-4f43-8b24-87d6b0d7bfab'
        confirmacao_doc={true}/>
    </div>
  )
};

export default ProjectTabComercial;

