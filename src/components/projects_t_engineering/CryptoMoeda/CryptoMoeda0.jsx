import { Mint } from './Mint';

const CryptoMoeda0 = () => {

  const mintMoeda = async () => {
    const retorno = await Mint('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', '1000000000000000000', "8BEzRTxaQ2t3wLBosmtZ6ahAgGKdyUqEg6NoqyBHS7R1aNM6fKE", 1);
    console.log(retorno);
  };
  
  return (
    <div style={{ position: 'absolute', width: '722px', top: '65px', left: '250px' }}>
      <button onClick={mintMoeda}>Cunhar Moeda</button>
    </div>
  );
};

export default CryptoMoeda0;