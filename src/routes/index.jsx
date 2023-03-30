import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Welcome from '../pages/main_display';
import Login from '../components/login';
import Register from '../components/create_user';
import RegisterProject from '../components/register_project_index';
import InternRegisterUser from '../components/inter_register_user';
import ProjectIntern from "../pages/project_intern";
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { getOwners } from "../store/modules/app_data/thunk";

const AppRoutes = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.user);
  console.log('esse é o login', login.accessToken);

  useEffect(() => {
    dispatch(getOwners());
  }, [login]);
  
  if (!login.accessToken && location.pathname !== '/'&& location.pathname !== '/register') {
    navigate('/');
    return (
      <AnimatePresence>
        <Routes>
          <Route exact path="*" element={<Login />} />
        </Routes>
      </AnimatePresence>
    );
  };

  return (
    <AnimatePresence>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register_project" element={<RegisterProject />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/intern_client_register" element={<InternRegisterUser />} />
        <Route exact path="/intern_project" element={<ProjectIntern />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
