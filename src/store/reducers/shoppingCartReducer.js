import {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  INCREASE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  TOGGLE_CART_ITEM,
} from "../actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProduct = state.cart.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product: action.payload,
          },
        ],
      };
    }

    case INCREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, count: item.count + 1 }
            : item,
        ),
      };

    case DECREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item,
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item,
        ),
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};
export default shoppingCartReducer;
