import FileUploadBlockchain from './../projects_t_engineering/FileUpload/FileUploadBlockchain';


const ProjectTabLegal = ({ user, project }) => {
  return (
    <div className="pagina" style={{ position: 'absolute', marginTop: '-75px', marginLeft: '-300px' }}>
      <FileUploadBlockchain 
        project_id={project.id} 
        tela_name={'Jurídico'} 
        modelo_GUID='d6d8271f-31b5-4f80-bb36-9928da8c2b1e'
        confirmacao_doc={false}/>
    </div>
  );
};

export default ProjectTabLegal;
