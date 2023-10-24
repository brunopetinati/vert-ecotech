//import { calculateTotalAreaByMonth, calculateTotalRealAreaByMonth, mergeCarbonData } from './carbon';
//import { groupByMonthAndStatus } from './project_status';
//import { groupByUserType } from './users';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import ProjectTokenChart1 from './ProjectTokenChart1';
import ProjectTokenChart2 from './ProjectTokenChart2';
import ProjectTokensCrud from './../projects_t_engineering/ProjectTokensCrud';

const Dashboard = () => {
  const collapsed = useSelector((state) => state.sidebar);
  //const currentUser = useSelector((state) => state.user.currentUser);
  //const projects = useSelector((state) => state.app_data.projects);
  //const users = useSelector((state) => state.app_data.users);
  //const carbon_1 = calculateTotalAreaByMonth(projects);
  //const carbon_2 = calculateTotalRealAreaByMonth(projects);
  //let data = groupByUserType(users);
  //let data2 = mergeCarbonData(carbon_1, carbon_2);
  //let data4 = groupByMonthAndStatus(projects);

  return (
    <Container collapsed={collapsed}>      
      <ProjectTokenChart1 />
      <ProjectTokenChart2 />
      <ProjectTokensCrud project_id={2}/>
    </Container>
  );
};

export default Dashboard;
