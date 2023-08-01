import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from '../chart';
import { Container } from './styles';

import { storeUsers, storeProjects, storeEngineeringTable, storeCommercialTable } from '../../store/modules/app_data/actions';
const Dashboard = () => {
  return <h1>Hello world</h1>
}

export default Dashboard;