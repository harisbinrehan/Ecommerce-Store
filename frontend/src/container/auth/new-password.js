import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Result, message } from 'antd';

import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';
import { resetPassword, verifyToken } from '../../redux/slices/authentication';

import './style.css';

const NewPassword = ({ header }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenExpiry } = useSelector((state) => state.authentication);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const token = query.get('token');

    dispatch(verifyToken({ token }));
  }, []);

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(newConfirmPassword === password);
  };

  const validatePasswordStrength = (inputPassword) => {
    if (isEmpty(inputPassword)) {
      setPasswordSuggestions(['Password field cannot be empty.']);
      setIsPasswordValid(false);
    } else {
      const hasSpecialCharacters = /[!@#%^&*()_+{}[\]:;<>,.?~-]/.test(
        inputPassword
      );
      const hasCapitalLetter = /[A-Z]/.test(inputPassword);

      const minLength = 8;
      const isValidLength = inputPassword.length >= minLength;

      if (isValidLength && hasSpecialCharacters && hasCapitalLetter) {
        setPasswordSuggestions(['Strong password']);
        setIsPasswordValid(true);
      } else if (isValidLength || hasSpecialCharacters || hasCapitalLetter) {
        setPasswordSuggestions(['Moderate password']);
      } else {
        setPasswordSuggestions([
          `Password should have at least ${minLength} characters and include special characters or capital letters.`
        ]);
        setIsPasswordValid(false);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswordStrength(newPassword);
    setPasswordsMatch(confirmPassword === newPassword);
  };

  const handleResetPassword = () => {
    if (passwordsMatch && isPasswordValid) {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const body = {
        token,
        newPassword: password
      };
      dispatch(resetPassword(body)).then(() => {
        navigate('/auth/login');
      });
    } else {
      message.error('Passwords must be the same and meet the password strength criteria', 2);
    }
  };

  return tokenExpiry ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Result status="error" subTitle="Sorry, Link has been expired." />
    </div>
  ) : (
    <div>
      <div className="login-rectangle">
        <h2 className="pb-3 header">{header}</h2>
        <div className="border">
          <div className="login-fields">
            <CustomForm
              placeholder="Enter New Password"
              label="Enter New Password"
              className="pt-2"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="login-fields">
            <CustomForm
              placeholder="Confirm New Password"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {!passwordsMatch && !isEmpty(confirmPassword) && (
            <p className="d-flex ps-4 error-message" style={{ color: 'red' }}>
              Passwords do not match.
            </p>
          )}
          {!isPasswordValid && (
            <p className="d-flex ps-4 error-message" style={{ color: 'red' }}>
              {passwordSuggestions.join(' ')}
            </p>
          )}

          <div className="login-fields">
            <CustomBtn
              btnText="Reset Password"
              disabled={!passwordsMatch || !isPasswordValid}
              size="default"
              className="w-100 mb-3"
              onClick={handleResetPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
