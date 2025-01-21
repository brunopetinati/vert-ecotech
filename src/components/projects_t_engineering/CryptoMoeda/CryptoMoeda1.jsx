import React, { useState } from 'react';
import { Mint } from './Mint';

const CryptoMoeda1 = () => {
  const [addressTo, setAddressTo] = useState('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  const [amount, setAmount] = useState('1000000000000000000');
  const [serialNumber, setSerialNumber] = useState('8BEzRTxaQ2t3wLBosmtZ6ahAgGKdyUqEg6NoqyBHS7R1aNM6fKE');
  const [value, setValue] = useState(1);

  const mintMoeda = async () => {
    try {
      const retorno = await Mint(addressTo, amount, serialNumber, value);
      console.log(retorno);
    } catch (err) {
      console.error('Erro ao cunhar moeda:', err);
    }
  };

  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '250px' }}>
      <div>
        <label>
          Endereço:
          <input
            type="text"
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Quantidade:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Número de Série:
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Valor:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
      <button onClick={mintMoeda}>Cunhar Moeda</button>
    </div>
  );
};

export default CryptoMoeda1;
