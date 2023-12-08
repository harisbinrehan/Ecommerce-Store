import { useLocation } from 'react-router';
import CustomSidebar from '../components/admin-sidebar';
import CustomNavbar from '../components/navbar';

const AdminLayout = ({ children, setIsLoggedIn }) => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <div>
      {pathname !== '/admin/order-details' ? (
        <>
          <CustomNavbar
            name="Haris Bin Rehan"
            userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
            setIsLoggedIn={setIsLoggedIn}
          />
          <div className="d-flex">
            <CustomSidebar />
            <div className="w-100 pt-4 admin-layout-wrapper">{children}</div>
          </div>
        </>
      ) : (
        <div className="d-flex">
          <div className="w-100 p-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
