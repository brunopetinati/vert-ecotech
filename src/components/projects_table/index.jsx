import { getFullNameById } from '../../store/modules/app_data/thunk';
import { Table, THead, TR, TH, TD, Wrapper} from './styles';
import { useSelector } from 'react-redux';

const ProjectsTable = ({filteredProjects}) => {

  const users = useSelector((state) => state.app_data.users);

  return (
    <Wrapper>
      <Table>
        <THead>
          <TR>
            <TH>Proprietário</TH>
            <TH>Área de Reserva Legal (ha)</TH>
            <TH>Área Total (ha)</TH>
            <TH>Localidade</TH>
            <TH>Status CAR</TH>
            <TH>Status da matrícula</TH>
            <TH>Status de georreferenciamento no SIGEF</TH>
            <TH>Situação da Reserva Legal</TH>
            <TH>Entidade Física ou Legal</TH>
            <TH>Unidade de Conservação</TH>
            <TH></TH>
          </TR>
        </THead>
        <tbody>
          {filteredProjects.map((row, index) => (
            <TR key={index}>
              <TD>{getFullNameById(row.owner, users)}</TD>
              <TD>{row.legal_reserve_area}</TD>
              <TD>{row.total_area}</TD>
              <TD>{row.address}</TD>
              <TD>{row.status_car}</TD>
              <TD>{row.matricula_status}</TD>
              <TD>{row.georeferencing_status}</TD>
              <TD>{row.reserve_legal_status}</TD>
              <TD>{row.physical_or_legal_entity}</TD> 
              <TD>{row.conservation_unit}</TD>
              <TD><a href="">Visualizar</a></TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ProjectsTable;
