import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import Welcome from '../pages/welcome'

import Login from '../components/login';
import Register from '../components/register'
import RegisterProject from '../components/register_project'

const AppRoutes = () => {

  const state = useSelector((state) => state.login);

  return (
    <AnimatePresence>      
          <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/register_project" element={<RegisterProject />}/>
          <Route exact path="/welcome" element={<Welcome />}/>
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