/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';
import MainPageLayout from '../layouts/main-page';
import VerifyUser from '../container/auth/verify-user';

const AuthRoutes = () => {
  const { user } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  useEffect(() => {
    if (user && pathname === '/auth/login') {
      navigate('/');
    }
  }, [user]);

  return (
    <MainPageLayout>
      <Routes>
        <Route path="/login" element={<Login header="Login" />} />
        <Route path="/signup" element={<Signup header="Sign Up" />} />
        <Route
          path="/newPassword"
          element={<NewPassword header="New Password" />}
        />
        <Route
          path="/forgotPassword"
          element={<ForgotPassword header="Forgot Password" />}
        />
        <Route
          path="/verifyUser"
          element={<VerifyUser />}
        />
        <Route
          path="*"
          element={<div className="empty-state-page">Page Not Found</div>}
        />
      </Routes>
    </MainPageLayout>
  );
};

export default AuthRoutes;
