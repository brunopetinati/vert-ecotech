import Web3 from 'web3';

const verifySignature = async ({ message, address, signature }) => {
  try {
    const web3 = new Web3(window.ethereum);
    const signer = await web3.eth.personal.ecRecover(message, signature);
    
    const checksumSigner = web3.utils.toChecksumAddress(signer);
    const checksumAddress = web3.utils.toChecksumAddress(address);
    
    return checksumSigner === checksumAddress;
  } catch (err) {
    console.error('Erro na verificação de assinatura:', err);
    return false;
  }
};

export const verifyUser = async (signerGeral, chave) => {
  let signer;
  let signature;
  let hashedMessage;
  let web3; // Declaração movida para o escopo superior

  try {
    if (!window.ethereum) {
      throw new Error('Nenhuma carteira crypto encontrada. Por favor instale a MetaMask.');
    }

    web3 = new Web3(window.ethereum); // Inicialização aqui
    
    await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const accounts = await web3.eth.getAccounts();
    signer = accounts[0];

    const messagePrefix = '\x19Ethereum Signed Message:\n32';
    hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: messagePrefix },
      { type: 'string', value: chave }
    );

    signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    });

    const isSignatureValid = await verifySignature({
      message: hashedMessage,
      address: signerGeral,
      signature: signature,
    });

    const isAddressValid = (
      web3.utils.toChecksumAddress(signer) === 
      web3.utils.toChecksumAddress(signerGeral)
    );

    const resultado = {
      is_assinatura_ok: isSignatureValid && isAddressValid,
      mensagem: (isSignatureValid && isAddressValid) 
        ? "Assinatura válida e carteira verificada" 
        : "Problema na verificação da assinatura ou endereço",
      signer: web3.utils.toChecksumAddress(signer),
      signerGeral: web3.utils.toChecksumAddress(signerGeral),
      signature: signature,
      hashedMessage: hashedMessage
    };

    return resultado;

  } catch (err) {
    const error = {
      code: err.code || 'UNKNOWN_ERROR',
      mensagem: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      signer: signer && web3 ? web3.utils.toChecksumAddress(signer) : null, // Verificação segura
      signature: signature || null,
      hashedMessage: hashedMessage || null
    };

    console.error('Erro no processo de verificação:', error);
    throw error;
  }
};