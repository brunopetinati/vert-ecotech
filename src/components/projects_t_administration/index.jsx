import FileUploadBlockchain from './../projects_t_engineering/FileUpload/FileUploadBlockchain';
import {stylesPgMenuInf} from '../styles'

import { useEffect } from "react";

const ProjectTabAdministration = ({ user, project }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div style={stylesPgMenuInf.container}>
      <FileUploadBlockchain 
      project_id={project.id} 
      tela_name={'Administrativo'} 
      modelo_GUID='907a2a72-8ef4-4da4-8465-93f8a062af10'
      confirmacao_doc={false}/>
    </div>
  );
};

export default ProjectTabAdministration;
