import { ADD_PROPERTY } from './action-types';

export const addProperty = (property) => {
  return {
    type: ADD_PROPERTY,
    payload: property
  };
};
