import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import UserLayout from '../layouts/user';
import UserMainPage from '../container/user/main-page';
import UserCart from '../container/user/cart';
import UserOrders from '../container/user/orders';

const UserRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { isAdmin, isUser } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(user)) {
      if (isAdmin) {
        navigate('/admin');
      }
    } else {
      navigate('/');
    }
  }, [user, isAdmin]);

  if (isUser) {
    return (
      <UserLayout>
        <Routes>
          <Route path="/" element={<UserMainPage />} />
          <Route path="/shopping-bag" element={<UserCart />} />
          <Route path="/user-orders" element={<UserOrders />} />
          <Route
            path="*"
            element={<div className="empty-state-page">Page Not Found</div>}
          />
        </Routes>
      </UserLayout>
    );
  }

  return null;
};

export default UserRoutes;
