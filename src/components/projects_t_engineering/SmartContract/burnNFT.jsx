import Web3 from 'web3';
import contractAbi2 from './abi_level.json';


export const burnNFT = async (contratoClienteAddress, signerGeral, tokenId, nft_file_manager_nft_id) => {
  
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
      { type: 'string', value: nft_file_manager_nft_id }
    ));
    console.log({ hashedMessage });

    //assina mensagem de hash
    signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    }));
    console.log({ signature });

    //verifica se o assinante eh o mesmo que assinou o contrato 
    //if (signerGeral != signer) {
    //  throw new Error('Carteira do assinante diferente do owner do contrato cliente');
    //}

    //criando a instancia do contrato do cliente
    //const web3 = new Web3(window.ethereum);
    const contractCliente = new web3.eth.Contract(contractAbi2, contratoClienteAddress);

    // Enviar a transação
    const gasLimit = 6721975; // Ajuste o limite de gas conforme necessário
    const gasPrice = await web3.eth.getGasPrice();

    // Atualizar a NFT
    const burnTransaction = await contractCliente.methods
      .burnNFT(
        tokenId, 
        nft_file_manager_nft_id, 
        contratoClienteAddress,
        signature
      )
      .send({ from: signerGeral, gas: gasLimit, gasPrice: gasPrice });

    console.log("NFT deletada:", burnTransaction);

    // Retorne ou faça algo com as informações necessárias
    return {
      transaction: burnTransaction,
      contratoAddress: burnTransaction.events.NFTBurned.address,
      contratoClienteAddress: burnTransaction.events.NFTBurned.returnValues.contract_address_client,
      signerGeral: signerGeral,
      file_manager_nft_id: burnTransaction.events.NFTBurned.returnValues.file_manager_nft_id,
      tokenId: burnTransaction.events.NFTBurned.returnValues.tokenId,
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