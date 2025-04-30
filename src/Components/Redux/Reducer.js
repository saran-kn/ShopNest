import { ACTION } from "./ActionType";

const initialState = {
  allProducts: [],
  cartData: null,
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.SET_PRODUCT:
      return { ...state, allProducts: payload };
    case ACTION.ADD_PRODUCT:
      return {
        ...state,
        ...state,
        allProducts: [...state.allProducts, payload],
      };
    case ACTION.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((item) => item.id !== payload),
      };
    case ACTION.EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((item) => {
          if (item.id === payload.id) {
            return payload;
          } else {
            return item;
          }
        }),
      };
    case ACTION.ADD_CART:
      return {
        ...state,
        cartData: state.cartData ? [...state.cartData, payload] : [payload],
      };
    case ACTION.DELETE_CART:
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id !== payload),
      };
    case ACTION.INCREAMENT_QUANTITY:
      return {
        ...state,
        cartData: state.cartData.map((data) => {
          if (data.id === payload) {
            return { ...data, quantity: data.quantity + 1 };
          } else {
            return data;
          }
        }),
      };
    case ACTION.DECREAMENT_QUANTITY:
      return {
        ...state,
        cartData: state.cartData.map((ele) => {
          if (ele.id === payload) {
            return { ...ele, quantity: ele?.quantity - 1 };
          } else {
            return ele;
          }
        }),
      };
    default:
      return { ...state };
  }
};

export default reducer;
