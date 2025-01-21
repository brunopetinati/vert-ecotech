import React from 'react';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <BeatLoader size={15} color={'#36D7B7'} loading={true} />
    </LoadingContainer>
  );
};

export default LoadingComponent;
