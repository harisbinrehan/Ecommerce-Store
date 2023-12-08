import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

export const signinWithGoogle = createAsyncThunk(
  'auth/signinWithGoogle',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/googleSignin', body);

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data.error });
    }
  }
);
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/verifyUser',
        { headers: { Authorization: `Bearer ${body.token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data.error });
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/verifyToken',
        body,
        { headers: { Authorization: `Bearer ${body.token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data.error });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/resetPassword',
        body,
        { headers: { Authorization: `Bearer ${body.token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data.error });
    }
  }
);

export const sendEmail = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/sendEmail', email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'signUpStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/signup', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'loginStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/signin',
        body
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signUpError: false,
    signUpMessage: null,
    loginMessage: null,
    loginError: true,
    user: {},
    isAdmin: false,
    loading: false,
    isUser: false,
    isVerifiedUser: false,
    tokenExpiry: false,
    token: ''
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = '';
      state.isAdmin = false;
      state.isUser = false;
      message.success('Logout Successful', 2);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state) => {
        state.signUpError = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.signUpError = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpError = true;
        state.signUpMessage = action.payload.message || 'Signup failed';
        message.error(state.signUpMessage, 2);
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginError = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));

        if (state.user.isAdmin === true) {
          state.isAdmin = true;
          state.isUser = false;
        } else {
          state.isAdmin = false;
          state.isUser = true;
        }
        state.loginMessage = action.payload.message || 'Login Successful';
        message.success('Login Successful', 2);
      })
      .addCase(loginUser.pending, () => {
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = true;
        state.loginMessage = action.payload?.message || 'Login failed';
        message.error(state.loginMessage, 2);
      })

      .addCase(sendEmail.fulfilled, (state, action) => {
        message.success(action.payload.message || 'Email sent successfully', 2);
      })
      .addCase(sendEmail.pending, () => {})
      .addCase(sendEmail.rejected, (state, action) => {
        message.error(action.payload.message || 'Error Sending Email', 2);
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordError = false;
        state.resetPasswordMessage = action.payload.message || 'Password reset successful';
        if (state.resetPasswordMessage === 'Invalid or expired token') {
          message.warning(state.resetPasswordMessage, 2);
        } else {
          message.success(state.resetPasswordMessage, 2);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordError = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordError = true;
        state.resetPasswordMessage = action.payload.message
          || 'Link is already used to reset password. Please try again';
        message.error(state.resetPasswordMessage, 2);
      })

      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isVerifiedUser = true;
        message.success(action.payload.message, 2);
      })
      .addCase(verifyUser.pending, () => {})
      .addCase(verifyUser.rejected, (state) => {
        state.isVerifiedUser = false;
        message.error('Verification failed', 2);
      })

      .addCase(verifyToken.fulfilled, (state, action) => {
        if (action.payload.tokenExpiry === true) {
          state.tokenExpiry = true;
        } else {
          message.success('This link has expired', 2);
          state.tokenExpiry = false;
        }
      })
      .addCase(verifyToken.pending, () => {})
      .addCase(verifyToken.rejected, (state) => {
        state.tokenExpiry = false;
      })

      .addCase(signinWithGoogle.fulfilled, (state, action) => {
        state.loginError = false;
        state.loading = false;
        state.user = action.payload;
        state.isAdmin = false;
        state.isUser = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        message.success('Login Successful', 2);
      })
      .addCase(signinWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinWithGoogle.rejected, (state) => {
        state.loginError = true;
        state.loading = false;
        message.error('Login failed', 2);
      });
  }
});

export const { logout, getToken, getUser } = authSlice.actions;
export default authSlice;
