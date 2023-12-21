import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../constants/global';
import styled from 'styled-components';
import { Button, StyledButtonSalvar } from '../styles';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;

const RastreabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  width: 60vw;
  text-align: left;
`;


const Rastreability = ({  }) => {

  useEffect(() => {

  }, []);

  const getPolygonScan = async () => {

    //try {

      const response = await axios.get('https://api-testnet.polygonscan.com/api', {
        params: {
          module: 'contract',
          action: 'getabi',
          address: '0xAbffA91a848EA388e80E446455E1e2eaBD8F47bD',
          apikey: 'S4MKH1Z8EMG4SX14ZMU4DC96JN1THACQJN',
        },
      });


      console.log(response.data);

      //const contractABI = JSON.parse(response.data.result);

      /*
      if (contractABI !== '') {
        const MyContract = web3.eth.contract(contractABI);
        const myContractInstance = MyContract.at('0x3DE2f0f4A684Fb7331800E3bbd6C9D34A1Ba025a');

        const result1 = myContractInstance.memberId('0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715');
        console.log('result1:', result1);

        const result2 = myContractInstance.members(1);
        console.log('result2:', result2);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    */

  };

  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '250px' }}>
      <RastreabilityContainer>
        <h2>Rastreabilidade</h2>
        <div>          
          <button onClick={() => getPolygonScan()}>iniciar</button>
        </div>      
      </RastreabilityContainer>
    </div>
  );
};

export default Rastreability;
