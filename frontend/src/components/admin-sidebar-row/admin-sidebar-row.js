import { Link } from 'react-router-dom';
import { Menu, MenuItem } from 'react-pro-sidebar';

import Arrow from '../../assets/images/arrow-right.svg';

const SidebarRow = ({ link, text }) => (
  <>
    <Menu className="sidebar-row d-flex">
      <MenuItem component={<Link to={link} />}>
        <img src={Arrow} alt="" className="arrow mx-3" />
        {text}
      </MenuItem>
    </Menu>
    <div className="sidebar-line" />
  </>
);

export default SidebarRow;
