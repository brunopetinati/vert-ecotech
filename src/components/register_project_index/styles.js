import styled from 'styled-components';
import Image from '../../assets/forest_image.jpg'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  background: #fafafa;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({app_status}) => app_status == 'register_land_upload_files' ? '100vh' : '150vh'};
  align-items: center; 
  justify-content: center;
`;