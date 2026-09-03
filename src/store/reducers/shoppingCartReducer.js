import {
  ADD_TO_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
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
