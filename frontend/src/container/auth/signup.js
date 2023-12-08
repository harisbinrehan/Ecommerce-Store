import { useState } from 'react';
import { isEmpty } from 'lodash';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import CustomForm from '../../components/input';
import { signUpUser } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';

import './style.css';

const Signup = ({ header }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleSignUp = async () => {
    setIsCreatingUser(true);
    const body = {
      username,
      password,
      email,
      mobile
    };

    try {
      await dispatch(signUpUser(body));
    } catch (error) {
      message.error('Error creating user. Please try again.');
    } finally {
      setIsCreatingUser(false);
    }
  };

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

  const validateMobile = (inputMobile) => {
    if (isEmpty(inputMobile)) {
      setMobileSuggestions(['Mobile field cannot be empty']);
      setIsMobileValid(false);
    } else {
      const mobileRegex = /^[0-9]{11}$/;
      const isValidMobile = mobileRegex.test(inputMobile);
      if (isValidMobile) {
        setMobile(inputMobile);
        setMobileSuggestions(['']);
        setIsMobileValid(true);
      } else {
        setMobileSuggestions(['Invalid mobile number format']);
        setIsMobileValid(false);
      }
    }
  };

  const validatePassword = (inputPassword) => {
    if (isEmpty(inputPassword)) {
      setPasswordSuggestions(['Password field cannot be empty.']);
      setIsPasswordValid(false);
    } else {
      const hasSpecialCharacters = /[!@#%^&*()_+{}[\]:;<>,.?~-]/.test(
        inputPassword
      );
      const hasCapitalLetter = /[A-Z]/.test(inputPassword);

      if (hasSpecialCharacters && hasCapitalLetter) {
        setPasswordSuggestions(['Strong password']);
        setIsPasswordValid(true);
      } else if (hasSpecialCharacters || hasCapitalLetter) {
        setPasswordSuggestions(['Moderate password']);
      } else {
        setPasswordSuggestions(['Weak password']);
        setIsPasswordValid(false);
      }
    }
  };

  const validateUsername = (inputUsername) => {
    if (isEmpty(inputUsername)) {
      setUsernameSuggestions(['Username field cannot be empty']);
      setIsUsernameValid(false);
    } else {
      const usernameRegex = /^[A-Za-z\s]+$/;
      const isValidUsername = usernameRegex.test(inputUsername);
      if (isValidUsername) {
        setUsername(inputUsername);
        setUsernameSuggestions(['']);
        setIsUsernameValid(true);
      } else {
        setUsernameSuggestions(['Invalid username format']);
        setIsUsernameValid(false);
      }
    }
  };

  return (
    <div className="login-rectangle">
      <h2 className="pb-3 header">{header}</h2>
      <div className="border">
        <div className="login-fields">
          <CustomForm
            placeholder="Full Name"
            label="Full Name"
            className="pt-2"
            type="text"
            value={username}
            hint={(
              <span className={isUsernameValid ? 'success-hint' : ''}>
                {usernameSuggestions.join(' ')}
              </span>
            )}
            onChange={(e) => {
              const newUsername = e.target.value;
              setUsername(newUsername);
              validateUsername(newUsername);
            }}
          />
        </div>
        <div className="login-fields">
          <CustomForm
            placeholder="Please enter your email"
            label="Enter Email"
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
          <CustomForm
            placeholder="Password"
            label="Enter your password"
            type="password"
            value={password}
            hint={(
              <span className={isPasswordValid ? 'success-hint' : ''}>
                {passwordSuggestions.join(' ')}
              </span>
            )}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
              validatePassword(newPassword);
            }}
          />
        </div>
        <div className="login-fields">
          <CustomForm
            placeholder="03000000000"
            label="Mobile"
            type="text"
            value={mobile}
            hint={(
              <span className={isMobileValid ? 'success-hint' : ''}>
                {mobileSuggestions.join(' ')}
              </span>
            )}
            onChange={(e) => {
              const newMobile = e.target.value;
              setMobile(newMobile);
              validateMobile(newMobile);
            }}
          />
        </div>
        <div className="login-fields">
          <CustomBtn
            btnText={isCreatingUser ? 'Creating User' : 'Signup'}
            size="default"
            className="w-100"
            disabled={
              !isUsernameValid
              || !isPasswordValid
              || !isEmailValid
              || !isMobileValid
              || isCreatingUser
            }
            onClick={handleSignUp}
          />
        </div>
        <div className="login-fields text-center">
          <div className="login-links">
            <CustomLink
              text="Already have an account! "
              textLinkable="Login"
              link="/auth/login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
