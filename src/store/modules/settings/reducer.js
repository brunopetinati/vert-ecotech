import { TOGGLE_LAYOUT } from './action-types';

const initialState = {
  cardsLayout: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LAYOUT:
      return {
        ...state,
        cardsLayout: !action.layout,
      };
    default:
      return state;
  }
};


export default layoutReducer;
