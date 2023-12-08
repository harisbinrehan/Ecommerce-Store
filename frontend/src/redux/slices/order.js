import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { limit, page } = state.order;

      let url = `http://localhost:5000/v1/orders/orders?skip=${
        (page - 1) * limit
      }&limit=${limit}`;

      if (orderId) {
        url += `&orderId=${orderId}`;
      }

      const response = await axios.get(url, { headers: { Authorization: `Bearer ${state.authentication.user.token}` } });

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { limit, page } = state.order;

      const response = await axios.get(
        `http://localhost:5000/v1/orders/userOrders?userId=${userId}&skip=${
          (page - 1) * limit
        }&limit=${limit}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const startAgendaJobs = createAsyncThunk(
  'orders/startAgendaJobs',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        'http://localhost:5000/v1/script?method=StartDashboardJob',
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderStats = createAsyncThunk(
  'orders/getOrderStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.get(
        'http://localhost:5000/v1/orders/dashboardStats',
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAdminOrderStats = createAsyncThunk(
  'orders/getAdminOrderStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.get(
        'http://localhost:5000/v1/orders/stats',
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNotifications = createAsyncThunk(
  'orders/getNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.get(
        'http://localhost:5000/v1/notifications/notifications',
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const readNotification = createAsyncThunk(
  'orders/readNotification',
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.put(
        'http://localhost:5000/v1/notifications/notifications',
        { notificationId },
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setOrderAsDelivered = createAsyncThunk(
  'orders/setOrderAsDelivered',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        `http://localhost:5000/v1/orders/setIsDelivered?orderId=${orderId}`,
        null,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    notifications: [],
    searchedOrders: [],
    ordersError: false,
    orderStats: {},
    page: 1,
    limit: 5,
    totalCount: 0,
    isOrderId: false,
    adminOrderStats: {},
    jobMessage: null
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },

    decrementPage(state) {
      state.page -= 1;
    },
    setPageOne(state) {
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },

    setLimit(state, action) {
      state.limit = action.payload;
    },

    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setAnyPage(state, action) {
      state.page = action.payload;
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
    setIsOrderId(state, action) {
      state.isOrderId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders || [];
        state.searchedOrders = action.payload.searchedOrders;
        state.totalCount = action.payload.totalCount;
        state.error = false;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.error = false;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.orders = [];
        state.error = action.payload
          ? action.payload.message
          : 'An error occurred';
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders || [];
        state.totalCount = action.payload.totalCount;
        state.error = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.error = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.orders = [];
        state.error = true;
      })

      .addCase(setOrderAsDelivered.fulfilled, () => {})
      .addCase(setOrderAsDelivered.pending, () => {})
      .addCase(setOrderAsDelivered.rejected, () => {})

      .addCase(startAgendaJobs.fulfilled, (state, action) => {
        state.jobMessage = action.payload;
      })
      .addCase(startAgendaJobs.pending, () => {})
      .addCase(startAgendaJobs.rejected, () => {})

      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.orderStats = action.payload.data[0];
      })
      .addCase(getOrderStats.pending, () => {})
      .addCase(getOrderStats.rejected, () => {})

      .addCase(getAdminOrderStats.fulfilled, (state, action) => {
        state.adminOrderStats = action.payload;
        state.error = false;
      })
      .addCase(getAdminOrderStats.pending, () => {})
      .addCase(getAdminOrderStats.rejected, () => {})

      .addCase(readNotification.fulfilled, () => {})
      .addCase(readNotification.pending, () => {})
      .addCase(readNotification.rejected, () => {})

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(getNotifications.pending, () => {})
      .addCase(getNotifications.rejected, () => {});
  }
});

export const {
  incrementPage,
  decrementPage,
  setPageOne,
  setPage,
  setLimit,
  setTotalCount,
  setAnyPage,
  setSkip,
  setIsOrderId
} = ordersSlice.actions;

export default ordersSlice;
