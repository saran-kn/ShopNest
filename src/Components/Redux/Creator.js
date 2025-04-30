import { ACTION } from "./ActionType";

export const setProductCreator = (data) => {
  return {
    type: ACTION.SET_PRODUCT,
    payload: data,
  };
};

export const addProductCreator = (data) => {
  return {
    type: ACTION.ADD_PRODUCT,
    payload: data,
  };
};

export const editProductCreator = (data) => {
  return {
    type: ACTION.EDIT_PRODUCT,
    payload: data,
  };
};

export const deleteProductCreator = (data) => {
  return {
    type: ACTION.DELETE_PRODUCT,
    payload: data,
  };
};

export const addCartDataAction = (data) => {
  return {
    type: ACTION.ADD_CART,
    payload: data,
  };
};

export const deleteCartDataAction = (id) => {
  return {
    type: ACTION.DELETE_CART,
    payload: id,
  };
};

export const increamentQuantityAction = (id) => {
  return {
    type: ACTION.INCREAMENT_QUANTITY,
    payload: id,
  };
};

export const decreamentQuantityAction = (id) => {
  return {
    type: ACTION.DECREAMENT_QUANTITY,
    payload: id,
  };
};
