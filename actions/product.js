import {ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT} from './types';

export const addProduct = (productName, productDesc) => {
  return {
    type: ADD_PRODUCT,
    payload: {productName, productDesc}
  };
};

export const editProduct = (index) => {
  return {
    type: EDIT_PRODUCT,
    payload: index,
  };
};

export const deleteProduct = (index) => {
  return {
    type: DELETE_PRODUCT,
    payload: index,
  };
};
