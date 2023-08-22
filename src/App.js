import styled from "styled-components";
import AppRoutes from "./routes"

const ContainerWrapper = styled.div`
@media screen and (max-width: 768px) {
  max-width: 768px; 
}
`;

function App() {
  
  return (
      <AppRoutes />
  );
};

export default App;