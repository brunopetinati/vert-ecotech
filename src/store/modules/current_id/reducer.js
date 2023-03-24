import { STORE_ID } from "./actions";

const initialState = {
  id: null,
};

const currentIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default currentIDReducer;
