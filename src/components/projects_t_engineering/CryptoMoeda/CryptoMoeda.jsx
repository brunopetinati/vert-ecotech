import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButtonSalvar } from '../styles';
import { Mint } from './Mint';
import { Purchase } from './Purchase';
import { Collaterals } from './Collaterals';
import Swal from 'sweetalert2';

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 10pt;
  color: rgb(54, 54, 54);
`;

const Input = styled.input`
  margin-bottom: 5px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  width: 400px;
  background: rgba(245, 245, 245, 0.2);
  margin-top: 5px;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const CollateralList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CollateralItem = styled.li`
  margin-bottom: 10px;
`;


const CryptoMoeda = () => {
  const [addressTo, setAddressTo] = useState('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
  const [amount, setAmount] = useState('5');
  const [serialNumber, setSerialNumber] = useState('8BEzRTxaQ2t3wLBosmtZ6ahAgGKdyUqEg6NoqyBHS7R1aNM6fKE');
  const [value, setValue] = useState(5);
  const [credit, setCredit] = useState('0.000000000000000001');
  const [address, setAddress] = useState('');
  const [collaterals, setCollaterals] = useState([]);

  const mintMoeda = async () => {
    try {
      const retorno = await Mint(addressTo, amount, serialNumber, value);
      console.log(retorno);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Moeda criada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (err) {
      console.error('Erro ao cunhar moeda:', err);
    }
  };

  const PurchaseMoeda = async () => {
    try {
      const retorno = await Purchase('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', credit);
      console.log(retorno);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Compra relizada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (err) {
      console.error('Erro ao tranferir moeda:', err);
    }
  };

  const GetCollaterals = async () => {
    try {

      const collaterals = await Collaterals(address);
      console.log("r:", collaterals);

      const combinedCollaterals = collaterals[0].map((serial, index) => ({
        serialNumber: serial,
        value: collaterals[1][index],
      }));

      setCollaterals(combinedCollaterals);
      console.log("combinedCollaterals:", combinedCollaterals);


    } catch (err) {
      console.error('Erro ao tranferir moeda:', err);
    }
  };  


  return (
    <div>
        <h2>Cunhar Moeda Digital</h2>
        <div>
          <Label htmlFor="addressTo">Endereço</Label>
          <div>
            <Input
              type="text"
              id="addressTo"
              name="addressTo"
              value={addressTo}
              onChange={(e) => setAddressTo(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="amount">Quantidade</Label>
          <div>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="serialNumber">Número de Série</Label>
          <div>
            <Input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="value">Valor</Label>
          <div>
            <Input
              type="number"
              id="value"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <ButtonContainer>
          <StyledButtonSalvar onClick={mintMoeda}>Cunhar Moeda</StyledButtonSalvar>
        </ButtonContainer>
        <br/>
        <h2>Realizar uma Venda</h2>
        <div>
          <div>
            <Label htmlFor="value">Creditos a serem compensados</Label>
            <div>
              <Input
                type="number"
                id="value"
                name="value"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ButtonContainer>
          <StyledButtonSalvar onClick={PurchaseMoeda}>Comprar</StyledButtonSalvar>
        </ButtonContainer> 
        <br/>
        <h2>Listar lastros</h2>
        {collaterals.length > 0 && (
          <CollateralList>
            <h3>Colaterais:</h3>
            {collaterals.map((collateral, index) => (
              <CollateralItem key={index}>
                Serial: {collateral.serialNumber}, Valor: {collateral.value}
              </CollateralItem>
            ))}
          </CollateralList>
        )}
        <br/>
        
        <div>
          <div>
            <Label htmlFor="value">Endereço</Label>
            <div>
              <Input
                type="text"
                id="value"
                name="value"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>   
        <ButtonContainer>
          <StyledButtonSalvar onClick={GetCollaterals}>Listar</StyledButtonSalvar>
        </ButtonContainer>   


        <br/>

        <br/> 
   
    </div>
  );
};

export default CryptoMoeda;
