export const STORE_ID = "STORE_ID";

export const storeId = (id) => {
  return {
    type: STORE_ID,
    payload: id,
  };
};
