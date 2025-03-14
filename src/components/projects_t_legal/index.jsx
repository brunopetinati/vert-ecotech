import FileUploadBlockchain from './../projects_t_engineering/FileUpload/FileUploadBlockchain';
import {stylesPgMenuInf} from '../styles'
import { useEffect } from "react";

const ProjectTabLegal = ({ user, project }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={stylesPgMenuInf.container}>
      <FileUploadBlockchain 
        project_id={project.id} 
        tela_name={'Jurídico'} 
        modelo_GUID='d6d8271f-31b5-4f80-bb36-9928da8c2b1e'
        confirmacao_doc={false}/>
    </div>
  );
};

export default ProjectTabLegal;
