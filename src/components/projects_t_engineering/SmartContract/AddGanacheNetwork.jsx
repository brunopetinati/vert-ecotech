import React from 'react';
import { Button } from './styles';

const AddGanacheNetwork = () => {
  const addNetwork = async () => {
    if (!window.ethereum) {
      console.error('MetaMask not detected');
      return;
    }

    const chainId = '0x539'; // 1337 in decimal
    const rpcURL = 'http://54.94.121.89:7545';
    const networkName = 'GANACHE-QA-SP';
    const currencyName = 'Ethereum';
    const currencySymbol = 'ETH';
    const explorerURL = ''; // Optional, can be left empty

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId,
            chainName: networkName,
            rpcUrls: [rpcURL],
            blockExplorerUrls: explorerURL ? [explorerURL] : [],
            nativeCurrency: {
              name: currencyName,
              symbol: currencySymbol, // 2-6 characters long
              decimals: 18,
            },
          },
        ],
      });
      // refresh the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Error adding network:', error);
    }
  };

  return (
      <Button onClick={addNetwork}>Adicionar rede</Button>
  );
};

export default AddGanacheNetwork;
{/**
    Add GANACHE-QA-SP Network
*/}