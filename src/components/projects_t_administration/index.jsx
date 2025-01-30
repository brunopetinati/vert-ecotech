import FileUploadBlockchain from './../projects_t_engineering/FileUpload/FileUploadBlockchain';

const ProjectTabAdministration = ({ user, project }) => {
  return (
    <div>
      <FileUploadBlockchain project_id={project.id} 
      tela_name={'Administrativo'} 
      modelo_GUID='907a2a72-8ef4-4da4-8465-93f8a062af10'
      confirmacao_doc={false}/>
    </div>
  );
};

export default ProjectTabAdministration;
