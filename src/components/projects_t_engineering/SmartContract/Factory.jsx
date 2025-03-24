import Web3 from 'web3';
import contractAbi from './abi_factory.json';

export const Factory = async (nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id) => {  

  let signer;
  let signature;
  let hashedMessage;

  try {

    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install it.");
    }


    // Inicializa Web3

    const web3 = new Web3(window.ethereum);
    

    await window.ethereum.send("eth_requestAccounts");
    
    const accounts = await web3.eth.getAccounts();
  
    signer = accounts[0];
 

    // Gera hash para assinatura
    console.log("Gerando hash da mensagem para assinatura...");
    console.log("Dados utilizados para o hash:", {
      nomePropriedade,
      nomeProprietario,
      cnpjcpf,
      car,
      file_manager_contract_id
    });

    hashedMessage = web3.utils.soliditySha3(
      { type: "string", value: nomePropriedade },
      { type: "string", value: nomeProprietario },
      { type: "string", value: cnpjcpf },
      { type: "string", value: car },
      { type: "string", value: file_manager_contract_id }
    );

    // Assina mensagem de hash
    signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    });
    console.log("Assinatura gerada:", signature);

    // Configurando contrato
    const contractAddress = "0x5f58053f00ac33e2557368daca06bab5f2ae0049";
    const contract = new web3.eth.Contract(contractAbi, contractAddress);


    // Definição de gas
    const gasLimit = 6721975;
    const gasPrice = await web3.eth.getGasPrice();

    try {
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
    
    console.log("Transação enviada! Detalhes da transação:", transaction);
    
    return {
      transaction: transaction,
      contratoAddress: transaction.events.NovoContrato.address,
      contratoClienteAddress: transaction.events.NovoContrato.returnValues.contratoAddress,
      signerGeral: signer,
      file_manager_contract_id: transaction.events.NovoContrato.returnValues.file_manager_contract_id,
      signature: signature,
      hashedMessage: hashedMessage
    };
    } catch (gasError) {
      throw new Error(`Erro ao enviar transação: Falha no gas. Verifique se o valor do gas está adequado.`);
    }

  } catch (err) {
    let errorMessage = err.message;

    // Tratamento específico para falhas de gas
    if (errorMessage.includes("gas required exceeds allowance")) {
      errorMessage = "Erro: O gas definido é insuficiente. Aumente o valor do gas.";
    } else if (errorMessage.includes("out of gas")) {
      errorMessage = "Erro: A transação ficou sem gas. Tente um valor maior.";
    } else if (errorMessage.includes("insufficient funds")) {
      errorMessage = "Erro: Saldo insuficiente para pagar as taxas de transação.";
    }

    console.error("Erro detectado:", errorMessage);

    const error = {
      mensagem: err.message,
      signer: signer,
      signature: signature,
      hashedMessage: hashedMessage
    };
    console.error("Detalhes do erro:", error);
    throw error;
  }
};
