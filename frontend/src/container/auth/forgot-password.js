import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { sendEmail } from '../../redux/slices/authentication';

import CustomBtn from '../../components/button';
import CustomLink from '../../components/link';
import CustomForm from '../../components/input';

import './style.css';

const ForgotPassword = ({ header }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const validateEmail = (inputEmail) => {
    if (isEmpty(inputEmail)) {
      setEmailSuggestions(['Email field cannot be empty.']);
      setIsEmailValid(false);
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(inputEmail);

      if (isValidEmail) {
        setEmailSuggestions(['']);
      } else {
        setEmailSuggestions(['Invalid email format']);
      }

      setIsEmailValid(isValidEmail);
    }
  };

  const handleForgotPassword = async () => {
    setIsSendingEmail(true);
    try {
      await dispatch(sendEmail({ email, token: user.token }));
    } catch (error) {
      message.error('Error sending email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="login-rectangle">
      <h2 className="pb-3 header">{header}</h2>
      <div className="border">
        <div className="login-fields">
          <CustomForm
            placeholder="Please enter your email"
            label="Enter Email"
            className="pt-2"
            type="email"
            value={email}
            hint={(
              <span className={isEmailValid ? 'success-hint' : ''}>
                {emailSuggestions.join(' ')}
              </span>
            )}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);
              validateEmail(newEmail);
            }}
          />
        </div>
        <div className="login-fields">
          <CustomBtn
            btnText={isSendingEmail ? 'Sending Email' : 'Forgot Password'}
            size="default"
            className="w-100"
            disabled={!isEmailValid || isSendingEmail}
            onClick={handleForgotPassword}
          />
        </div>
        <div className="login-fields text-center login-links">
          <CustomLink
            text="No, I remember my password! "
            textLinkable="Login"
            link="/auth/login"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
