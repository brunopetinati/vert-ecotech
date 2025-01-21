import Web3 from 'web3';
import contractAbiMoeda from './abi_moeda.json';

export const Mint = async (address_to, amount, serialNumber, value) => {
  
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
    
    //gera hash para assinatura
    hashedMessage = (web3.utils.soliditySha3(
      { type: 'string', value: serialNumber }
    ));
    console.log({ hashedMessage });

    //assina mensagem de hash
    signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    }));
    console.log({ signature });

    //criando a instancia do contrato do cliente //CONTRATO
    const contract = new web3.eth.Contract(contractAbiMoeda, "0x0d8cc4b8d15d4c3ef1d70af0071376fb26b5669b");

    // Enviar a transação
    const gasLimit = 6721975; // Ajuste o limite de gas conforme necessário
    const gasPrice = await web3.eth.getGasPrice();

    // Cunhar moeda
    const mintTransaction = await contract.methods
      .mint(
        address_to, 
        amount, 
        serialNumber,
        value,
        signature
      )
      .send({ from: signer, gas: gasLimit, gasPrice: gasPrice });

    console.log("Moeda cunhada:", mintTransaction);


    // Recupera os colaterais associados à conta do comprador
    //const collaterals = await contract.methods.getCollaterals(signer).call();
    //console.log('Collaterals1:', collaterals);

    // lista moedas dentro d carteira
    //const moedas = await contract.methods.getCollateralVccValues(signer).call();
    //console.log('Moedas na carteira:', moedas);

    // listar lastros com valores
    //const [serialNumbers, values] = await contract.methods.getCollateralsWithValues(signer).call();
    //for (let i = 0; i < serialNumbers.length; i++) {
    //    console.log(`Lastro: ${serialNumbers[i]}, Valor: ${values[i]}`);
    //}    

    //cria retorno das informacoes da transacao
    return {
      transaction: mintTransaction,
      contratoAddress: mintTransaction.events.Transfer.address,
      signer: signer,
      signature: signature,
      hashedMessage: hashedMessage
    };

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