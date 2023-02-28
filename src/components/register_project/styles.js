import styled from 'styled-components';
import Image from '../../assets/forest_image.jpg'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  background-size: cover;
  background-position: center center;
`;


export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({app_status}) => app_status == 'register_land_continue' ? '100vh' : '100vh'};
  align-items: center; 
  justify-content: center;
  width: 800px;
`;

