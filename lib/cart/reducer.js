export const initialState = {
  isCartReady: false,
  isCartOpen: false,
  checkoutResult: null,
  items: []
};

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

export default reducer;
