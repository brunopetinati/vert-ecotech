import { Container, InnerContainer } from './styles'
import React from 'react';
import { useSelector } from "react-redux";
import RegisterProjectStep2 from '../register_project_info'
import RegisterProjectStep3 from '../register_project_upload_files'


const RegisterProject = () => {

  const app_status = useSelector((state) => state.app_status.status);

  return (
    <Container>
      <InnerContainer app_status={app_status}>
        {app_status == 'register_land_upload_files' ? <RegisterProjectStep3 /> : <RegisterProjectStep2 />}
      </InnerContainer>
    </Container>
  )
};

export default RegisterProject;