import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message, notification } from 'antd';

export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async ({ skip, limit, filterObject }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        'http://localhost:5000/v1/products/userProducts',
        {
          params: {
            skip,
            limit,
            filterObject
          },
          headers: { Authorization: `Bearer ${state.authentication.user.token}` }
        }
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async (filterObject, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { limit, page } = state.products;
      const response = await axios.get(
        `http://localhost:5000/v1/products/adminProducts?skip=${
          (page - 1) * limit
        }&limit=${limit}`,
        {
          params: { filterObject },
          headers: { Authorization: `Bearer ${getState().authentication.user.token}` }
        }
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (requestData, { getState, rejectWithValue }) => {
    const state = getState();

    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/product',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);
export const addBulkProducts = createAsyncThunk(
  'products/addBulkProducts',
  async (requestData, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/bulkProducts',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.delete(
        `http://localhost:5000/v1/products/product?_id=${_id}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (body, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/products/product',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isFilter: false,
    data: [],
    bulkUploadResult: {},
    importBulkSuccess: false,
    page: 1,
    limit: 5,
    totalCount: 0,
    isProductError: false,
    productMessage: null,
    loading: false,
    editSuccess: false,
    deleteSuccess: false,
    addSuccess: false
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
    setIsFilter(state, { payload }) {
      state.isFilter = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        if (state.isFilter) {
          state.data = action.payload.products;
        } else {
          state.data = [...state.data, ...action.payload.products];
          state.totalCount = action.payload.totalCount;
        }
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.isProductError = false;
        state.loading = false;
        state.importBulkSuccess = false;
      })
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state) => {
        state.addSuccess = true;
        state.productMessage = 'Product added Successfully';
        notification.success({
          description: state.productMessage,
          type: 'success',
          duration: 2
        });
      })
      .addCase(addProduct.pending, (state) => {
        state.addSuccess = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addSuccess = false;
        state.productMessage = action.payload.message || 'Error adding product';
        notification.error({
          description: state.productMessage,
          type: 'error',
          duration: 2
        });
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productMessage = action.payload.message || 'Product deleted Successfully';
        state.deleteSuccess = true;
        message.success(state.productMessage, 2);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteSuccess = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteSuccess = false;
        state.productMessage = 'Error deleting product';
        message.error(state.productMessage, 2);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.editSuccess = true;
        message.success('Product updated Successfully', 2);
      })
      .addCase(updateProduct.pending, (state) => {
        state.editSuccess = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productMessage = action.payload.message || 'Error Updating product';
        state.editSuccess = false;
        message.error(state.productMessage, 2);
      })

      .addCase(addBulkProducts.fulfilled, (state, action) => {
        state.importBulkSuccess = true;
        state.bulkUploadResult = action.payload.bulkUploadResult;
      })
      .addCase(addBulkProducts.pending, () => {})
      .addCase(addBulkProducts.rejected, (state) => {
        state.importBulkSuccess = false;
        state.bulkUploadResult = {};
      });
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
  setIsFilter
} = productsSlice.actions;

export default productsSlice;
