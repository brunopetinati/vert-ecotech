//#7eff00
//#054d00

const awsUrl = 'https://api.vertecotech.com';
const stage = 'http://18.216.226.85:8000';
const localHost = 'http://localhost:8000';

export const currentUrl = awsUrl;


// atenção:

// sempre que for usar a sidebar, tratar da seguinte forma:

// <Container collapsed={collapsed}>
//  <Sidebar />
//  <InnerContainer collapsed ? 90vw : 85vw>
//   <Content />
//  </InnerContainer>
// </Container>
// por último
