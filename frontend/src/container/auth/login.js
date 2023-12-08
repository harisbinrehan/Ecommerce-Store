import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import { loginUser, signinWithGoogle } from '../../redux/slices/authentication';
import CustomLink from '../../components/link';
import CustomBtn from '../../components/button';
import CustomForm from '../../components/input';
import {
  setCartSummaryNull,
  setPaymentDetailsNull
} from '../../redux/slices/cart';

import './style.css';

const Login = ({ header }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const { loading } = useSelector((state) => state.authentication);

  const handleLogin = async () => {
    if (isEmailValid && email && password) {
      const body = { email, password };
      dispatch(setCartSummaryNull());
      dispatch(setPaymentDetailsNull());
      dispatch(loginUser(body));
    }
  };

  const validateEmail = (inputEmail) => {
    if (isEmpty(inputEmail)) {
      setEmailSuggestions(['Email field cannot be empty.']);
      setIsEmailValid(false);
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(inputEmail);

      setEmailSuggestions(isValidEmail ? [] : ['Invalid email format']);
      setIsEmailValid(isValidEmail);
    }
  };

  const responseGoogle = (response) => {
    dispatch(signinWithGoogle(response));
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <ReactLoading type="bars" color="#03fc4e" height={100} width={100} />
        </div>
      ) : (
        <div className="login-rectangle">
          <h2 className="pb-3 header">{header}</h2>
          <div className="border">
            <div className="login-fields">
              <CustomForm
                placeholder="Please enter your email"
                className="pt-2"
                label="Enter Email"
                type="email"
                value={email}
                hint={
                  isEmailValid ? (
                    ''
                  ) : (
                    <span className="error-hint">
                      {emailSuggestions.join(' ')}
                    </span>
                  )
                }
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setEmail(newEmail);
                  validateEmail(newEmail);
                }}
              />
            </div>
            <div className="login-fields">
              <CustomForm
                placeholder="Please enter password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-fields">
              <CustomBtn
                btnText="Login"
                size="default"
                className="w-100"
                onClick={handleLogin}
                disabled={!isEmailValid || !password}
              />
            </div>
            <div className="d-flex justify-content-around mt-3">
              <GoogleLogin
                clientId="60372167602-s6d7575evll9gujp5k79mvf5p0k4ppn6.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
            <div className="d-flex justify-content-around login-fields text-center">
              <div className="login-links">
                <CustomLink
                  text="Forgot Password! "
                  textLinkable="Reset"
                  link="/auth/forgotPassword"
                />
              </div>
              <div className="login-links">
                <CustomLink
                  text="I don't have an account! "
                  textLinkable="Signup"
                  link="/auth/signup"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
