import SidebarRow from '../admin-sidebar-row/admin-sidebar-row';
import './style.css';

const CustomSidebar = () => (
  <div className="sidebar">
    <SidebarRow link="/admin/dashboard" text="Dashboard" />
    <SidebarRow link="/admin/products" text="Products" />
    <SidebarRow link="/admin/orders" text="Orders" />
  </div>
);

export default CustomSidebar;
