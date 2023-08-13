import { Container, InnerContainer } from './styles'
import React from 'react';
import { useSelector } from "react-redux";
import RegisterProjectInfo from '../project_register_info'
import RegisterProjectFileUpload from '../project_register_upload_files'


const RegisterProject = () => {

  const app_status = useSelector((state) => state.app_status.status);

  return (
    <Container>
      <InnerContainer app_status={app_status}>
        {app_status == 'register_land_upload_files' ? <RegisterProjectFileUpload /> : <RegisterProjectInfo />}
      </InnerContainer>
    </Container>
  )
};

export default RegisterProject;