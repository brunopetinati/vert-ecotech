import { ADD_PROPERTY } from './action-types';

const initialState = {
  properties: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.payload]
      };
    default:
      return state;
  }
};

export default reducer;
