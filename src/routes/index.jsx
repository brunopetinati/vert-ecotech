import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Welcome from '../pages/main_display';
import Login from '../components/login';
import Register from '../components/register_user';
import PrivacyPolicy from '../components/terms/privacy_policy'; 
import TermsOfUse from '../components/terms/terms_of_use'; 
import RegisterProject from '../components/register_project_index';
import InternRegisterUser from '../components/inter_register_user';
import ProjectIntern from "../pages/project_intern";
import EditProject from "../pages/project_edit/";
import UserIntern from "../pages/user_intern";
import KanbanBoard from "../components/kanban_board/";
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOwners } from "../store/modules/app_data/thunk";

const AppRoutes = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOwners());
  }, [login]);
  
  if (!login.accessToken && location.pathname !== '/'&& location.pathname !== '/register' && location.pathname !== '/privacy_policy' && location.pathname !== '/terms_of_use') {
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
        <Route exact path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route exact path="/terms_of_use" element={<TermsOfUse />} />
        <Route exact path="/register_project" element={<RegisterProject />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/intern_client_register" element={<InternRegisterUser />} />
        <Route exact path="/intern_project" element={<ProjectIntern />} />
        <Route exact path="/edit_intern_project" element={<EditProject />} />
        <Route exact path="/intern_user" element={<UserIntern />} />
        <Route exact path="/analysis_and_development" element={<KanbanBoard />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
