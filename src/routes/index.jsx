import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOwners } from "../store/modules/app_data/thunk";
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
import PrivacyPolicyPage from '../pages/terms/privacy_policy'; 
import TermsOfUsePage from '../pages/terms/terms_of_use'; 
import RegisterProjectFileUploadWebOpen from "../pages/outsider";
import OutsiderSuccess from "../pages/outsider_success";
import OutsiderCanceled from "../pages/outsider_canceled";
import RecoverPassword from "../components/recover_password";

const AppRoutes = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOwners());
  }, [login]);
  
  if (!login.accessToken && location.pathname !== '/'&&
    location.pathname !== '/register' &&
    location.pathname !== '/privacy_policy' &&
    location.pathname !== '/terms_of_use' &&
    location.pathname !== '/privacy' &&
    location.pathname !== '/terms_of_use_page' &&
    (!location.pathname.includes('/recover_password') &&
    location.pathname.length > 5) &&
    (!location.pathname.includes('/open_upload/') &&
    location.pathname.length > 20) &&
    location.pathname !== '/upload_success' &&
    location.pathname !== '/upload_canceled') {
    navigate('/');
    console.log('entrou aqui');
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
        <Route exact path="/analysis_and_development" element={<KanbanBoard />} />
        <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
        <Route exact path="/terms_of_use_page" element={<TermsOfUsePage />} />
        <Route exact path="/open_upload/:access" element={<RegisterProjectFileUploadWebOpen />} />
        <Route exact path="/upload_success" element={<OutsiderSuccess />} />
        <Route exact path="/upload_canceled" element={<OutsiderCanceled />} />
        <Route exact path="/recover_password/:access" element={<RecoverPassword />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
