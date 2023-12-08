import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.post(
        'http://localhost:5000/v1/orders/order',
        requestData,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const addAddress = createAsyncThunk(
  'cart/addAddress',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.post(
        'http://localhost:5000/v1/orders/address',
        requestData,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const getAddress = createAsyncThunk(
  'cart/getAddress',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        `http://localhost:5000/v1/orders/address?userId=${userId}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const updateDefaultAddress = createAsyncThunk(
  'cart/updateDefaultAddress',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/orders/address',
        requestData,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const getPaymentDetails = createAsyncThunk(
  'cart/getPaymentDetails',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        `http://localhost:5000/v1/orders/paymentDetails?userId=${userId}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const savePaymentDetails = createAsyncThunk(
  'cart/savePaymentDetails',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.post(
        'http://localhost:5000/v1/orders/paymentDetails',
        requestData,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const editPaymentDetails = createAsyncThunk(
  'cart/editPaymentDetails',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/orders/paymentDetails',
        requestData,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

export const deletePaymentDetails = createAsyncThunk(
  'cart/deletePaymentDetails',
  async ({ cardStripeId, userStripeId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.delete(
        `http://localhost:5000/v1/orders/paymentDetails?cardStripeId=${cardStripeId}&userStripeId=${userStripeId}`,
        { headers: { Authorization: `Bearer ${state.authentication.user.token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    userCart: [],
    addresses: {},
    paymentDetails: [],
    orderSummary: null,
    selectedCardIndex: 0,
    addAddressSuccess: false,
    updateAddressSuccess: false,
    orderSuccess: false,
    proceedToCheckout: false,
    paymentDetailsStatus: false,
    userOrderDetailsShow: false
  },
  reducers: {
    setCartSummaryNull: (state) => {
      state.orderSummary = null;
    },

    setCardIndex(state, action) {
      state.selectedCardIndex = action.payload;
    },

    setOrderSuccess: (state) => {
      state.orderSuccess = false;
    },

    getCartOfSpecificUser: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (state.cartProducts) {
        const userCart = state.cartProducts.find(
          (cartItem) => cartItem.userId === user.userId
        );
        if (userCart) {
          state.userCart = userCart;
        } else {
          state.userCart = [];
        }
      } else {
        state.userCart = [];
      }
    },
    addToCart: (state, action) => {
      const { userId, product, productQuantity } = action.payload;
      state.proceedToCheckout = false;

      if (state.cartProducts) {
        const userCart = state.cartProducts.find(
          (cart) => cart.userId === userId
        );

        if (!userCart) {
          state.cartProducts.push({
            userId,
            products: [{ ...product, quantity: productQuantity }]
          });
        } else {
          const existingProduct = userCart.products.find(
            (item) => item._id === product._id
          );

          if (existingProduct) {
            if (userCart.products) {
              const matchingProduct = userCart.products.find(
                (singleProduct) => product._id === singleProduct._id
              );

              if (matchingProduct) {
                if (matchingProduct.quantity < product.quantity) {
                  existingProduct.quantity += productQuantity;
                }
              }
            }
          } else {
            userCart.products.push({ ...product, quantity: productQuantity });
          }
        }

        message.success('Product added to the cart', 2);
      } else {
        state.cartProducts = [
          {
            userId,
            products: [{ ...product, quantity: 1 }]
          }
        ];
      }
    },

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },

    setUserOrderDetailsShow(state) {
      state.userOrderDetailsShow = !state.userOrderDetailsShow;
    },

    setPaymentDetailsNull(state) {
      state.paymentDetails = [];
    },

    setProceedToCheckout: (state) => {
      state.proceedToCheckout = !state.proceedToCheckout;
    },

    moveToCartFromNavbar: (state) => {
      state.proceedToCheckout = false;
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload._id;
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.filter(
            (product) => product._id !== itemIdToRemove
          );
        }
        return cartItem;
      });
      message.success('Product removed from cart.', 2);
    },

    incrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.map((product) => {
            if (product._id === itemIdToIncrement) {
              product.quantity += 1;
            }
            return product;
          });
        }
        return cartItem;
      });
    },

    decrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.map((product) => {
            if (product._id === itemIdToIncrement) {
              if (product.quantity !== 1) {
                product.quantity -= 1;
              }
            }
            return product;
          });
        }
        return cartItem;
      });
    },

    deleteSelectedAll: (state) => {
      state.orderSummary = null;
      const user = JSON.parse(localStorage.getItem('user'));

      if (
        state.cartProducts.some((cartItem) => cartItem.userId === user.userId)
      ) {
        state.cartProducts = state.cartProducts.filter(
          (cartItem) => cartItem.userId !== user.userId
        );
        message.success('All products removed from cart', 2);
      } else {
        message.success('\'Cart is already empty\'', 2);
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.userCart = null;
        state.orderSummary = null;
        state.orderSuccess = true;
        state.proceedToCheckout = false;
        state.orderMessage = action.payload.message || 'Order Placed Successfully';

        const user = JSON.parse(localStorage.getItem('user'));
        state.cartProducts = state.cartProducts.filter(
          (cartItem) => cartItem.userId !== user.userId
        );

        state.selectedCartProducts = [];

        message.success(state.orderMessage, 2);
      })
      .addCase(placeOrder.pending, (state) => {
        state.orderSuccess = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderSuccess = false;
        state.orderMessage = 'Error placing order';
        message.error(state.orderMessage, 2);
      })

      .addCase(getAddress.fulfilled, (state, action) => {
        state.addresses = action.payload.addresses[0];
      })
      .addCase(getAddress.pending, () => {})
      .addCase(getAddress.rejected, () => {})

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addAddressSuccess = true;
        state.orderMessage = action.payload.message;
        message.success(state.orderMessage, 2);
      })
      .addCase(addAddress.pending, (state) => {
        state.addAddressSuccess = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.orderSuccess = false;
        state.orderMessage = action.payload.message;

        message.success(state.orderMessage, 2);
      })

      .addCase(updateDefaultAddress.fulfilled, (state) => {
        state.updateAddressSuccess = true;
        message.success('Default address updated successfully', 2);
      })
      .addCase(updateDefaultAddress.pending, (state) => {
        state.updateAddressSuccess = false;
      })
      .addCase(updateDefaultAddress.rejected, (state) => {
        state.updateAddressSuccess = false;
        state.orderMessage = 'Error updating default address';
        message.error(state.orderMessage, 2);
      })

      .addCase(savePaymentDetails.fulfilled, (state) => {
        message.success('Payment Details Saved Successfully', 2);
        state.paymentDetailsStatus = true;
        state.selectedCardIndex = 0;
      })
      .addCase(savePaymentDetails.pending, (state) => {
        message.success('Saving Payment Details...', 1);
        state.paymentDetailsStatus = true;
      })
      .addCase(savePaymentDetails.rejected, (state) => {
        state.orderMessage = 'Error saving payment details';
        message.error(state.orderMessage, 2);
        state.paymentDetailsStatus = false;
      })

      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.paymentDetails = action.payload.allPaymentMethods;
        state.paymentDetailsStatus = false;
      })
      .addCase(getPaymentDetails.pending, () => {})
      .addCase(getPaymentDetails.rejected, () => {})

      .addCase(editPaymentDetails.fulfilled, (state) => {
        message.success('Payment details are edited successfully', 2);
        state.paymentDetailsStatus = true;
      })
      .addCase(editPaymentDetails.pending, () => {
      })
      .addCase(editPaymentDetails.rejected, (state) => {
        state.paymentDetailsStatus = false;
        message.error('Error updating payment details', 2);
      })

      .addCase(deletePaymentDetails.fulfilled, (state) => {
        state.paymentDetailsStatus = true;

        state.selectedCardIndex = 0;
        message.success('Card deleted successfully', 2);
      })
      .addCase(deletePaymentDetails.pending, () => {})
      .addCase(deletePaymentDetails.rejected, (state) => {
        state.paymentDetailsStatus = false;
        message.error('Error deleting card', 2);
      });
  }
});

export const {
  addToCart,
  setOrderSummary,
  setProceedToCheckout,
  moveToCartFromNavbar,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCartOfSpecificUser,
  setCartSummaryNull,
  setUserOrderDetailsShow,
  deleteSelectedAll,
  setOrderSuccess,
  setPaymentDetailsNull,
  setCardIndex
} = cartSlice.actions;

export default cartSlice;
