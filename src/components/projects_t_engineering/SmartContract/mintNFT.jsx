import Web3 from 'web3';

//local da ABI
import contractAbi2 from './abi_level.json';


export const mintNFT = async (contratoClienteAddress, signerGeral, _nftTitle, _nftDescription, _nftPrice, _nftRoyaltyPercentage, _nftImageUrl, file_manager_nft_id) => {
  
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
      { type: 'string', value: file_manager_nft_id }
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

    //alert("antes do mint");

    // Mintar a NFT
    const mintTransaction = await contractCliente.methods
      .mintNFT(
        _nftTitle, 
        _nftDescription, 
        parseInt(_nftPrice), 
        parseInt(_nftRoyaltyPercentage), 
        _nftImageUrl, 
        file_manager_nft_id, 
        contratoClienteAddress,
        signature
      )
      .send({ from: signer, gas: gasLimit, gasPrice: gasPrice });

    console.log("NFT mintada:", mintTransaction);

    //cria retorno das informacoes da transacao
    return {
      transaction: mintTransaction,
      contratoAddress: mintTransaction.events.NFTMinted.address,
      contratoClienteAddress: mintTransaction.events.NFTMinted.returnValues.contract_address_client,
      signerGeral: signerGeral,
      file_manager_nft_id: mintTransaction.events.NFTMinted.returnValues.file_manager_nft_id,
      tokenId: Number(mintTransaction.events.NFTMinted.returnValues.tokenId).toString(),
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