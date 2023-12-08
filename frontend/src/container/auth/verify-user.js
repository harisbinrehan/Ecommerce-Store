import { Result } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../redux/slices/authentication';

import './style.css';

const VerifyUser = () => {
  const dispatch = useDispatch();

  const { isVerifiedUser } = useSelector((state) => state.authentication);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const token = query.get('token');

    dispatch(verifyUser({ token }));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {isVerifiedUser ? (
        <Result status="success" title="Verification Completed" />
      ) : (
        <Result status="403" title="Verification failed" />
      )}
    </div>
  );
};

export default VerifyUser;
