import { Container, InnerContainer } from './styles'
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import RegisterProjectStep1 from '../register_project_step_1'
import RegisterProjectStep2 from '../register_project_step_2'
import Sidebar from '../sidebar';


const RegisterProject = () => {

  const app_status = useSelector((state) => state.app_status.status);
  console.log(app_status)

  return (
    <Container>
      <InnerContainer app_status={app_status}>
        {app_status == 'register_land_continue' ? <RegisterProjectStep2 /> : <RegisterProjectStep1 />}
      </InnerContainer>
    </Container>
  )
};

export default RegisterProject;