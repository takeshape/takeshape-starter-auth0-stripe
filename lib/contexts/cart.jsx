import React, { useReducer, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '../hooks/use-local-storage';

const initialState = {
  isCartReady: false,
  isCartOpen: false,
  checkoutResult: null,
  items: []
};

export const CHECKOUT_SUCCESS = 'success';
export const CHECKOUT_CANCELED = 'canceled';

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_IS_READY':
      return {
        ...state,
        isCartReady: true
      };
    case 'TOGGLE_CART_POPUP':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };
    case 'ADD_TO_CART':
      const id = action.payload.cartItem.id;
      const isOld = state.items.map((item) => item.id).includes(id);
      let cartItems = null;
      if (isOld) {
        const items = state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
        cartItems = [...items];
      } else {
        cartItems = [...state.items, action.payload.cartItem];
      }
      return {
        ...state,
        items: cartItems
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.cartItemId)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [...initialState.items]
      };
    case 'SET_CHECKOUT_RESULT':
      return {
        ...state,
        checkoutResult: action.payload.checkoutResult
      };
    case 'CLEAR_CHECKOUT_RESULT':
      return {
        ...state,
        checkoutResult: initialState.checkoutResult
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const toggleCartPopup = (dispatch) => {
  return dispatch({
    type: 'TOGGLE_CART_POPUP'
  });
};

export const addToCart = (dispatch, cartItem) => {
  return dispatch({
    type: 'ADD_TO_CART',
    payload: {
      cartItem
    }
  });
};

export const removeFromCart = (dispatch, cartItemId) => {
  return dispatch({
    type: 'REMOVE_FROM_CART',
    payload: {
      cartItemId
    }
  });
};

export const clearCart = (dispatch) => {
  return dispatch({
    type: 'CLEAR_CART'
  });
};

export const setCartIsReady = (dispatch) => {
  return dispatch({
    type: 'CART_IS_READY'
  });
};

export const setCheckoutResult = (dispatch, checkoutResult) => {
  return dispatch({
    type: 'SET_CHECKOUT_RESULT',
    payload: {
      checkoutResult
    }
  });
};

export const clearCheckoutResult = (dispatch) => {
  return dispatch({
    type: 'CLEAR_CHECKOUT_RESULT'
  });
};

const CartProvider = ({ children }) => {
  const [persistedCartItems, setPersistedCartItems] = useLocalStorage('cartItems', []);

  const {
    replace,
    pathname,
    query: { stripe_checkout_action: action, ...query }
  } = useRouter();

  const persistedCartState = {
    ...initialState,
    items: persistedCartItems || initialState.items
  };

  const [state, dispatch] = useReducer(reducer, persistedCartState);

  useEffect(() => {
    setPersistedCartItems(state.items);
    setCartIsReady(dispatch);
  }, [JSON.stringify(state.items)]);

  useEffect(() => {
    if (action) {
      setCheckoutResult(dispatch, action);
      replace(pathname, query, { shallow: true });
    }

    if (action === CHECKOUT_SUCCESS) {
      clearCart(dispatch);
    }
  }, [action]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
