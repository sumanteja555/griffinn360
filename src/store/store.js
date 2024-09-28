import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // Ensure jwtDecode is imported correctly
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Initial state for cart slice
const initialCartState = { eventName: "", price: "" };

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      state.eventName = action.payload.eventName;
      state.price = action.payload.price;
    },
  },
});


const initialUserState = { isLoggedIn: false, token: null, name: null, number: null };

// Function to check token expiration
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decoded.exp < currentTime; // Token is expired if exp < current time
  } catch (error) {
    return true; // If any error occurs during decoding, treat token as expired
  }
};


// User slice
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      const token = action.payload.token;
      
      if (isTokenExpired(token)) {
        // If token is expired, reset user state to initial values
        state.isLoggedIn = false;
        state.token = null;
        state.name = null;
        state.number = null;
      } else {
        // If token is valid, set user details
        const decodedToken = jwtDecode(token);
        state.isLoggedIn = true;
        state.token = token;
        state.name = action.payload.name;
        state.number = decodedToken.data?.number;

        console.log(state);
        
      }
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.name = null;
      state.number = null;

    },
  },
});

// Combine reducers for cart and user slices
const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
});

// Apply persistReducer to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export actions and store
export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions; // Export user actions
export const persistor = persistStore(store);
export default store;
