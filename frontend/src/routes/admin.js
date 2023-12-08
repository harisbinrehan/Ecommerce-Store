import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import AdminLayout from '../layouts/admin';
import Dashboard from '../container/admin/dashboard';
import Products from '../container/admin/products';
import Orders from '../container/admin/orders';
import OrderDetails from '../container/admin/order-details';

const AdminRoutes = () => { // Admin Routes
  const user = JSON.parse(localStorage.getItem('user'));

  const { isAdmin, isUser } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(user)) {
      if (isUser) {
        navigate('/user');
      }
    } else {
      navigate('/');
    }
  }, [user, isAdmin]);

  if (isAdmin) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route
            path="*"
            element={<div className="empty-state-page">Page Not Found</div>}
          />
        </Routes>
      </AdminLayout>
    );
  }
  return null;
};

export default AdminRoutes;
