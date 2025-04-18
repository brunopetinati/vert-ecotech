import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import Welcome from '../pages/main_display';
import Login from '../components/login';
import Register from '../components/register_user';
import PrivacyPolicy from '../components/terms/privacy_policy'; 
import TermsOfUse from '../components/terms/terms_of_use'; 
import RegisterProject from '../components/project_register_index';
import ProjectIntern from "../pages/project_intern";
import EditProject from "../pages/project_edit/";
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
  
  if (!sessionStorage.Authorization && location.pathname !== '/' &&
    location.pathname !== '/register' &&
    location.pathname !== '/privacy_policy' &&
    location.pathname !== '/terms_of_use' &&
    location.pathname !== '/privacy' &&
    location.pathname !== '/terms_of_use_page' &&
    !location.pathname.startsWith('/recover_password') &&
    location.pathname.length > 5 &&
    !location.pathname.startsWith('/open_upload/') &&
    location.pathname.length > 20 &&
    location.pathname !== '/upload_success' &&
    location.pathname !== '/upload_canceled') {

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
        <Route exact path="/project_register" element={<RegisterProject />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/intern_project" element={<ProjectIntern />} />
        <Route exact path="/edit_intern_project" element={<EditProject />} />
        <Route exact path="/analysis_and_development" element={<KanbanBoard />} />
        <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
        <Route exact path="/terms_of_use_page" element={<TermsOfUsePage />} />
        <Route exact path="/open_upload/:access" element={<RegisterProjectFileUploadWebOpen />} />
        <Route exact path="/upload_success" element={<OutsiderSuccess />} />
        <Route exact path="/upload_canceled" element={<OutsiderCanceled />} />
        <Route exact path="/recover_password/:code/:hash" element={<RecoverPassword />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
