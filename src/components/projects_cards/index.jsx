import { Wrapper, Card, CardHeader, CardBody, CardFooter } from './styles'

const ProjectsCard = ({filteredProjects}) => {

  return (
    <Wrapper>
      {filteredProjects.map((project, index) => (
        <Card key={index}>
          <CardHeader>{project.owner}</CardHeader>
          <CardBody>
            <p>Área de Reserva Legal: {project.legal_reserve_area}</p>
            <p>Área Total: {project.total_area}</p>
            <p>Localidade: {project.address}</p>
            <p>Status CAR: {project.status_car}</p>
            <p>Código SICAR: {project.sicar_code}</p>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      ))}
    </Wrapper>
  );
};

export default ProjectsCard;