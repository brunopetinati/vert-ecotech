import Web3 from 'web3';
import contractAbiMoeda from './abi_moeda.json';

export const Collaterals = async (address) => {
  
  let signer;
  let signature;
  let hashedMessage;
  
  try {
    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }

    //pega da metamask para iniciar assinatura
    const web3 = new Web3(window.ethereum);
    await window.ethereum.send('eth_requestAccounts');
    const accounts = await web3.eth.getAccounts();
    signer = (accounts[0]);
    
    /*
    //gera hash para assinatura
    hashedMessage = (web3.utils.soliditySha3(
      { type: 'string', value: 'chaveassinatura' }
    ));
    console.log({ hashedMessage });

    //assina mensagem de hash
    signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    }));
    console.log({ signature });
    */

    //criando a instancia do contrato do cliente //CONTRATO
    const contract = new web3.eth.Contract(contractAbiMoeda, "0xe82851f06119c89b107571cb5d2e172e5cf96e08");

    console.log(address);

    // Recupera os colaterais associados à conta do comprador
    //const collaterals = await contract.methods.getCollaterals(address).call();
    //console.log('Collaterals1:', collaterals);

    // lista moedas dentro d carteira
    const moedas = await contract.methods.getCollateralVccValues(address).call();
    console.log('Moedas na carteira:', moedas);
    return moedas;

  } catch (err) {

    const error = {
      mensagem: err.message,
      signer: signer,
      signature: signature,
      hashedMessage: hashedMessage
    }

    console.error(err.message, error);
    throw error;
  }
};