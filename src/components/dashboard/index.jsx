//import { calculateTotalAreaByMonth, calculateTotalRealAreaByMonth, mergeCarbonData } from './carbon';
//import { groupByMonthAndStatus } from './project_status';
//import { groupByUserType } from './users';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import ProjectTokenChart1 from './ProjectTokenChart1';
import ProjectTokenChart2 from './ProjectTokenChart2';
import ProjectTokensCrud from './../projects_t_engineering/ProjectTokensCrud';
import Chart from '../chart';
import { calculateTotalAreaByMonth, calculateTotalRealAreaByMonth, mergeCarbonData } from './carbon';
import { groupByMonthAndStatus } from './project_status';
import { groupByUserType } from './users';

const Dashboard = () => {
  //const collapsed = useSelector((state) => state.sidebar);
  //const currentUser = useSelector((state) => state.user.currentUser);
  //const projects = useSelector((state) => state.app_data.projects);
  //const users = useSelector((state) => state.app_data.users);
  //const carbon_1 = calculateTotalAreaByMonth(projects);
  //const carbon_2 = calculateTotalRealAreaByMonth(projects);
  //let data = groupByUserType(users);
  //let data2 = mergeCarbonData(carbon_1, carbon_2);
  //let data4 = groupByMonthAndStatus(projects);

/*
  return (
    <Container collapsed={collapsed}>      
      <ProjectTokenChart1 />
      <ProjectTokenChart2 />
      <ProjectTokensCrud project_id={2}/>
    </Container>
  );
  */


  const currentUser = useSelector((state) => state.user.currentUser);
  const projects = useSelector((state) => state.app_data.projects);
  const users = useSelector((state) => state.app_data.users);
  const collapsed = useSelector((state) => state.sidebar);

  const carbon_1 = calculateTotalAreaByMonth(projects);
  const carbon_2 = calculateTotalRealAreaByMonth(projects);

  let data = groupByUserType(users);

  let data2 = mergeCarbonData(carbon_1, carbon_2);

  const data3 = [
    { name: "Maio", ativos: 0, aposentados: 0 },
    { name: "Abril", ativos: 0, aposentados: 0 },
    { name: "Maio", ativos: 0, aposentados: 0 },
    { name: "Junho", ativos: 0, aposentados: 0 },
    { name: "Julho", ativos: 0, aposentados: 0 },
    { name: "Agosto", ativos: 0, aposentados: 0 },
    { name: "Setembro", ativos: 0, aposentados: 0 },
  ];

  let data4 = groupByMonthAndStatus(projects);

  return (
    <Container collapsed={collapsed}>
      <div style={{ float: 'left', width: '100%', minHeight: '50px' }}>
        <h2 style={{ float: 'left', width: '82vw', height: '80px', textAlign: 'center', marginLeft: '0px' }}>Indicadores de Desempenho</h2>
      </div>      
      <div style={{ float: 'left', width: '100%', minHeight: '200px' }}>

        <div style={{ marginLeft: '-250px', marginTop: '0px' }}><ProjectTokenChart1 /></div>
        <div style={{ marginLeft: '300px', marginTop: '-370px' }}><ProjectTokenChart2 /></div>

        <div style={{ marginLeft: '-760px', marginTop: '80px', paddingBottom: '100px' }}>
          {currentUser.user_type === "ADM" && <Chart data={data}  title={'Cadastros'} name={'month'} key_a={'Regular'} key_b={'ADM'} key_c={'COM'} key_d={'ENG'} stroke_a={'#8884d8'} stroke_b={'#82ca9d'} stroke_c={'brown'} stroke_d={'orange'}/>}
        </div>

        <div style={{ marginLeft: '380px', marginTop: '-410px', paddingBottom: '100px' }}>
          <Chart data={data2} title={'Área de cobertura (ha)'} name={'month'} key_a={'em_processo'} stroke_a={'#7eff00'} key_b={'estimativa'} stroke_b={'#054d00'}/>        
        </div>

        <div style={{ marginLeft: '-760px', marginTop: '-70px', paddingBottom: '100px' }}>
          <Chart data={data3} title={'Oferta X Demanda'} name={'name'} key_a={'ativos'} key_b={'aposentados'} stroke_a={'#7eff00'} stroke_b={'black'} />
        </div>

        <div style={{ marginLeft: '380px', marginTop: '-410px', paddingBottom: '100px' }}>
          {currentUser.user_type === "ADM" && <Chart data={data4} title={'Projetos'} name={'month'} key_a={'started'} key_b={'analysis'} key_c={'viability'} key_d={'negotiation'} key_e={'idle'} key_f={'implementing'} key_g={'concluded'} stroke_a={'blue'} stroke_b={'violet'} stroke_c={'green'} stroke_d={'gold'} stroke_e={'grey'} stroke_f={'orange'} stroke_g={'brown'}/> }
        </div>

      </div>
    </Container>
  );


};

export default Dashboard;
