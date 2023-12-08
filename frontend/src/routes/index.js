import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './auth';
import AdminRoutes from './admin';
import UserRoutes from './user';
import MainRoutes from './main';

const CustomRoutes = () => (

  <Routes>
    <Route path="/" element={<MainRoutes />} />
    <Route path="/auth/*" element={<AuthRoutes />} />
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/user/*" element={<UserRoutes />} />
    <Route
      path="*"
      element={<div className="empty-state-page">Page Not Found</div>}
    />
  </Routes>
);

export default CustomRoutes;
