import { useReducer, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from 'lib/hooks/use-local-storage';

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
    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload.cartItem]
      };
    case 'REMOVE_FROM_CART': {
      const { cartItemIndex } = action.payload;
      state.items.splice(cartItemIndex, 1);
      return {
        ...state,
        items: state.items
      };
    }
    case 'UPDATE_CART_ITEM': {
      const { cartItemIndex } = action.payload;
      if (state.items[cartItemIndex]) {
        state.items[cartItemIndex] = {
          ...state.items[cartItemIndex],
          ...action.payload.cartItem
        };
      }
      return {
        ...state,
        items: state.items
      };
    }
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

export const toggleCart = (dispatch) => {
  return dispatch({
    type: 'TOGGLE_CART'
  });
};

export const openCart = (dispatch) => {
  return dispatch({
    type: 'OPEN_CART'
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

export const removeFromCart = (dispatch, cartItemIndex) => {
  return dispatch({
    type: 'REMOVE_FROM_CART',
    payload: {
      cartItemIndex
    }
  });
};

export const updateCartItem = (dispatch, cartItemIndex, cartItem) => {
  return dispatch({
    type: 'UPDATE_CART_ITEM',
    payload: {
      cartItemIndex,
      cartItem
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
      replace('/purchases', undefined, { shallow: true });
    }
  }, [action]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
