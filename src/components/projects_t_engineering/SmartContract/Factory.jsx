import Web3 from 'web3';
import contractAbi from './abi_factory.json';

export const Factory = async (nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id) => {  

  let signer;
  let signature;
  let hashedMessage;

  try {
    console.log("Verificando se a carteira Ethereum está disponível...");
    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install it.");
    }
    console.log("Carteira Ethereum encontrada!");

    // Inicializa Web3
    console.log("Inicializando Web3...");
    const web3 = new Web3(window.ethereum);
    
    console.log("Solicitando contas ao MetaMask...");
    await window.ethereum.send("eth_requestAccounts");
    
    const accounts = await web3.eth.getAccounts();
    console.log("Contas disponíveis:", accounts);
    signer = accounts[0];
    console.log("Assinador definido como:", signer);

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
    console.log("Mensagem hash gerada:", hashedMessage);

    // Assina mensagem de hash
    console.log("Solicitando assinatura da mensagem ao MetaMask...");
    signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    });
    console.log("Assinatura gerada:", signature);

    // Configurando contrato
    console.log("Configurando contrato Ethereum...");
    const contractAddress = "0x5f58053f00ac33e2557368daca06bab5f2ae0049";
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log("Contrato carregado com sucesso! Endereço:", contractAddress);

    // Definição de gas
    const gasLimit = 6721975;
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Definição de gas:");
    console.log("Gas Limit:", gasLimit);
    console.log("Gas Price:", gasPrice);

    // Chamando a função Factory no contrato
    console.log("Enviando transação para criar contrato...");
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
    
    // Capturando eventos da blockchain
    console.log("Capturando eventos de criação do contrato...");
    console.log("Endereço do novo contrato:", transaction.events.NovoContrato.address);
    console.log("Endereço do contrato do cliente:", transaction.events.NovoContrato.returnValues.contratoAddress);
    console.log("file_manager_contract_id retornado:", transaction.events.NovoContrato.returnValues.file_manager_contract_id);



    // Retorno das informações da transação

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
    console.error("Erro detectado:", err.message);
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
