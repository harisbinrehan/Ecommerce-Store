import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Image,
  Navbar,
  NavDropdown,
  Button,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from 'react';
import userImage from '../../assets/images/userImage.jpeg';
import { logout } from '../../redux/slices/authentication';
import {
  moveToCartFromNavbar,
  setCartSummaryNull,
  setOrderSuccess,
  setPaymentDetailsNull
} from '../../redux/slices/cart';
import { getNotifications, readNotification, setPageOne } from '../../redux/slices/order';

import './style.css';

function CustomNavbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const [markAsRead, setMarkAsRead] = useState(false);

  const { isAdmin, isUser, user } = useSelector(
    (state) => state.authentication
  );
  const { userCart, orderSuccess } = useSelector((state) => state.cart);

  const { notifications } = useSelector((state) => state.order);

  const unreadAdminNotificationsCount = notifications.filter(
    (notification) => notification.isRead === false && notification.forAdmin === true
  ).length;

  const unreadUserNotifications = notifications.filter(
    (notification) => notification.userId === user.userId
      && notification.forAdmin === false
      && notification.isRead === false
  );

  const handleMoveToCart = () => {
    dispatch(setOrderSuccess());
    dispatch(moveToCartFromNavbar());
  };

  const handleLogout = () => {
    dispatch(setPageOne());
    dispatch(logout());
    dispatch(setCartSummaryNull());
    dispatch(setPaymentDetailsNull());
    navigate('/');
  };

  const handleMarkAsRead = (notificationId) => {
    setMarkAsRead(true);
    dispatch(readNotification(notificationId));
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(getNotifications());
    setMarkAsRead(false);
  }, [markAsRead, orderSuccess]);

  return (
    <div
      style={{ zIndex: '3', position: 'fixed', width: '100%' }}
      className="navbar-sticky-section"
    >
      <Navbar expand="lg">
        <Container>
          <h2 className="ecom clickable" onClick={handleNavigateHome}>
            Q-Commerce
          </h2>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {isUser || isAdmin ? (
              <>
                <div className="navClass">
                  <div className="d-flex pe-3 ">
                    {isAdmin ? (
                      <DropdownButton
                        align="end"
                        variant="text"
                        title={(
                          <i
                            className="bi bi-bell"
                            style={{ color: '#007BFF' }}
                          >
                            <span className="notification-badge bg-primary">
                              {unreadAdminNotificationsCount || 0}
                            </span>
                          </i>
                        )}
                      >
                        {unreadAdminNotificationsCount > 0 ? (
                          notifications
                            .filter(
                              (notification) => !notification.isRead
                                && notification.forAdmin === true
                            )
                            .map((notification) => (
                              <div className="navClass" key={notification.id}>
                                <Dropdown.Item
                                  className="d-flex"
                                  onClick={() => handleMarkAsRead(notification._id)}
                                >
                                  <p className="pt-1">{notification.text}</p>
                                </Dropdown.Item>
                              </div>
                            ))
                        ) : (
                          <div className="no-notifications ps-4">
                            No notifications
                          </div>
                        )}
                      </DropdownButton>
                    ) : (
                      <DropdownButton
                        align="end"
                        variant="text"
                        title={(
                          <i
                            className="bi bi-bell"
                            style={{ color: '#007BFF' }}
                          >
                            <span className="notification-badge bg-primary">
                              {unreadUserNotifications?.length || 0}
                            </span>
                          </i>
                        )}
                      >
                        {unreadUserNotifications.length > 0 ? (
                          unreadUserNotifications
                            .filter(
                              (notification) => notification.forAdmin === false
                            )
                            .map((notification) => (
                              <div className="navClass" key={notification._id}>
                                <Dropdown.Item
                                  className="d-flex"
                                  onClick={() => handleMarkAsRead(notification._id)}
                                >
                                  <p className="pt-1">{notification.text}</p>
                                </Dropdown.Item>
                              </div>
                            ))
                        ) : (
                          <div className="no-notifications ps-4">
                            No notifications
                          </div>
                        )}
                      </DropdownButton>
                    )}
                  </div>
                </div>
                {isUser ? (
                  <Link to="/user/shopping-bag">
                    <i className="bi bi-cart" onClick={handleMoveToCart}>
                      <span className="badge bg-primary">
                        {userCart?.products?.length || 0}
                      </span>
                    </i>
                  </Link>
                ) : null}
              </>
            ) : pathname !== '/auth/login' ? (
              <Button as={Link} to="/auth/login" variant="primary">
                Login
              </Button>
            ) : null}

            {isUser ? (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item>
                  <Link
                    to={{
                      pathname: '/user/user-orders',
                      search: `?userId=${user?.userId}`
                    }}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Orders
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} className="pt-3">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : isUser || isAdmin ? (
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                className="user-name ps-4"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            {isUser || isAdmin ? (
              <Image
                src={user.image ? user.image : userImage}
                alt="User Image"
                className="user-image mx-3"
                roundedCircle
              />
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
