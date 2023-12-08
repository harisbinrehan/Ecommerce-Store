import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import UserMainPage from '../container/user/main-page';
import MainPageLayout from '../layouts/main-page';

const MainRoutes = () => {
  const { isAdmin, loginError } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.token) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, [user, loginError]);

  if (!user?.token) {
    return (
      <MainPageLayout>
        <Routes>
          <Route path="/" element={<UserMainPage />} />
        </Routes>
      </MainPageLayout>
    );
  }
  return null;
};

export default MainRoutes;
