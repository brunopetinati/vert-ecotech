import { currentUrl } from '../../../constants/global';

import { storeUsers } from './actions';

/* export const getOwners = () => (dispatch, getState) => {
  const token = sessionStorage.getItem('Authorization');
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  fetch(`${currentUrl}/api/users/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      dispatch(storeUsers(data)); // Dispatch the action to update the store
    })
    .catch((error) => {
      console.error('Error fetching owners', error);
    });
}; */


export const getFullNameById = (ownerId, owners) => {
  if (owners) {
    const ownerObj = owners.find(user => user.id === ownerId);
  
  if (ownerObj) {
    return ownerObj.full_name;
  }};
  return 'unknown';
};
