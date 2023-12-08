import CustomNavbar from '../components/navbar';

import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => (
  <div>
    <CustomNavbar
      name="Haris Bin Rehan"
      userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
      setIsLoggedIn={setIsLoggedIn}
    />
    <div className="">{children}</div>
  </div>
);

export default UserLayout;
