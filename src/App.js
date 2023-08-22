import styled from "styled-components";
import AppRoutes from "./routes"

const ContainerWrapper = styled.div`
@media screen and (max-width: 768px) {
  max-width: 768px; 
  max-height: 100vh;
}
`;

function App() {
  
  return (
    <ContainerWrapper>
      <AppRoutes />
    </ContainerWrapper>
  );
};

export default App;