import Web3 from 'web3';
import contractAbi from './abi_factory.json';


export const Factory = async (nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id) => {  

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
      { type: 'string', value: nomePropriedade },
      { type: 'string', value: nomeProprietario },
      { type: 'string', value: cnpjcpf },
      { type: 'string', value: car },
      { type: 'string', value: file_manager_contract_id }
    ));
    console.log({ hashedMessage });  

    //assina mensagem de hash
    signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    }));
    console.log({ signature });

    //inicio chamada da geracao da instancia do contrato cliente
    const contractAddress = '0x5f58053f00ac33e2557368daca06bab5f2ae0049';
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    const gasLimit = 6721975;
    const gasPrice = await web3.eth.getGasPrice();

    //chama funcao de geracao da instancia do contrato do cliente no blockchain
    const transaction = await contract.methods
      .Factory(
        nomePropriedade,
        nomeProprietario,
        cnpjcpf,
        car,
        file_manager_contract_id,
        signature
      )
      .send({ from: signer, gas: gasLimit, gasPrice: gasPrice });

    console.log(transaction);
    console.log('aqui temos uma boa sugestão de resultado');
    console.log(transaction.events.NovoContrato.address);
    console.log('fim de resultado');

    //cria retorno das informacoes da transacao
    return {
      transaction: transaction,
      contratoAddress: transaction.events.NovoContrato.address,
      contratoClienteAddress: transaction.events.NovoContrato.returnValues.contratoAddress,
      signerGeral: signer,
      file_manager_contract_id: transaction.events.NovoContrato.returnValues.file_manager_contract_id,
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
