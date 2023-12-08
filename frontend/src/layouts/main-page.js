import CustomNavbar from '../components/navbar';

const MainPageLayout = ({ children, setIsLoggedIn }) => (
  <div>
    <CustomNavbar
      name=""
      userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
      setIsLoggedIn={setIsLoggedIn}
    />
    <div>{children}</div>
  </div>
);

export default MainPageLayout;
