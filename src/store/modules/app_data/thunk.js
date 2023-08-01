import { currentUrl } from '../../../constants/global';

import { storeUsers, storeCommercialTable, storeEngineeringTable } from './actions';

export const getOwners = () => (dispatch, getState) => {
  const token = sessionStorage.getItem('Authorization');
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  fetch(`${currentUrl}/api/users/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      dispatch(storeUsers(data));
    })
    .catch((error) => {
      console.error('Error fetching owners', error);
    });
};

export const getCommercialTable = () => (dispatch, getState) => {
  const token = sessionStorage.getItem('Authorization');
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  fetch(`${currentUrl}/api/proposals/list/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      dispatch(storeCommercialTable(data));
    })
    .catch((error) => {
      console.error('Error fetching commercial table', error);
    });
};

export const getEngineeringTable = () => (dispatch, getState) => {
  const token = sessionStorage.getItem('Authorization');
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };
  fetch(`${currentUrl}/api/engineering/list`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      dispatch(storeEngineeringTable(data));
    })
    .catch((error) => {
      console.error('Error fetching engineering table', error);
    });
};


export const getFullNameById = (ownerId, owners) => {
  if (owners) {
    const ownerObj = owners.find(user => user.id === ownerId);
  
  if (ownerObj) {
    return ownerObj.full_name;
  }};
  return 'unknown';
};
