import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import Login from '../components/login';
import Register from '../components/register'
import RegisterProjectStep1 from '../components/register_project_step_1'
import RegisterProjectStep2 from '../components/register_project_step_2'


const AppRoutes = () => {

  const state = useSelector((state) => state.login);

  return (
    <AnimatePresence>      
          <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/register_project" element={<RegisterProjectStep1 />}/>
          <Route exact path="/register_project_last_step" element={<RegisterProjectStep2 />}/>
          { 
          /* state.token ? 
            <Route exact path="/my_favorites" element={<Login />}/> 
            :
            <Route exact path="/my_favorites" element={<Login />}/> */
          }
        </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;