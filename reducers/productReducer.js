import {ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT} from '../actions/types';

const initialState = {
  productName: '',
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat({
          id: state.products.length + 1,
          productName: action.payload.productName,
          productDesc : action.payload.productDesc
        }),
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
