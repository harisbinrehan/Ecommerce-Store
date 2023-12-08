import { Link } from 'react-router-dom';

const CustomLink = ({ text, textLinkable, link }) => (
  <div>
    <span>{text}</span>
    <Link to={link}>{textLinkable}</Link>
  </div>
);

export default CustomLink;
