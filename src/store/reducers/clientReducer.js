import {
  SET_ADDRESS_LIST,
  SET_AUTH_CHECKED,
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from "../actionTypes";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
  authChecked: false,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case SET_AUTH_CHECKED:
      return {
        ...state,
        authChecked: action.payload,
      };
    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
