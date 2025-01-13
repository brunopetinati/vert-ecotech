import Web3 from 'web3';

const verifySignature = async ({ message, address, signature }) => {
  try {
    // Cria uma instância do Web3 com o provedor atual (como MetaMask)
    const web3 = new Web3(window.ethereum);

    // Obter o endereço do signatário da mensagem e da assinatura
    const signer = await web3.eth.personal.ecRecover(message, signature);

    // Verifica se o endereço do signatário é igual ao endereço fornecido
    return signer.toLowerCase() === address.toLowerCase();
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const verifyUser = async (signerGeral, chave) => {
  
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
      { type: 'string', value: chave }
    ));
    console.log({ hashedMessage });

    //assina mensagem de hash
    signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    }));
    console.log({ signature });

    // Verifica a assinatura
    const retorno = await verifySignature({
      message: hashedMessage,
      address: signerGeral,
      signature: signature,
    });
    

    //resultado
    const resultado = {
      is_assinatura_ok: retorno,
      mensagem: retorno ? "Carteira MetaMask válida" : "Carteira MetaMask inválida",
      signer: signer,
      signature: signature,
      hashedMessage: hashedMessage
    }

    //alert(JSON.stringify(resultado));
    
    return resultado;


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