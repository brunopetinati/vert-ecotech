import Web3 from 'web3';
import { PDFDocument } from 'pdf-lib';

export const protectPDF = async (documentGUID, fileData) => {
  
  let signer;
  let signature;
  let hashedMessage;
  
  try {
    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }

    //console.log(documentGUID);
    //console.log(fileData);

    // Pega da metamask para iniciar assinatura
    const web3 = new Web3(window.ethereum);
    await window.ethereum.send('eth_requestAccounts');
    const accounts = await web3.eth.getAccounts();
    signer = accounts[0];
    
    // Gera hash para assinatura
    hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: documentGUID }
    );
    //console.log({ hashedMessage });

    // Assina mensagem de hash
    signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, signer],
    });
    console.log({ signature });

    // Proteger arquivo PDF
    //const protectedPdfBlob = await protectFilePDF(fileData, signature);

    // Retorne ou faça algo com as informações necessárias
    return {
      documentGUID: documentGUID,
      //protectedPdfBlob: protectedPdfBlob,
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
    };

    console.error(err.message, error);
    throw error;
  }
};

// Função para proteger o PDF
async function protectFilePDF(fileData, password) {
  const existingPdfBytes = await fileData.arrayBuffer();
  const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

  console.log("senha: " + password);

  // Criar um novo PDFDocument com opções de senha e permissões
  const pdfDoc = await PDFDocument.create({
    userPassword: password, // Senha do usuário
    ownerPassword: password, // Senha do proprietário
    permissions: {
      printing: 'none', // Não permitir impressão
      modifying: 'none', // Não permitir modificação
      copying: 'none', // Não permitir cópia
      annotating: 'none', // Não permitir anotações
      fillingForms: 'none', // Não permitir preenchimento de formulários
      contentAccessibility: 'none', // Não permitir acessibilidade de conteúdo
      documentAssembly: 'none' // Não permitir montagem de documento
    }
  });

  // Copiar todas as páginas do PDF existente para o novo documento
  const numberOfPages = existingPdfDoc.getPageCount();
  const pages = await pdfDoc.copyPages(existingPdfDoc, Array.from(Array(numberOfPages).keys()));
  pages.forEach((page) => {
    pdfDoc.addPage(page);
  });

  // Serialize o PDF para bytes
  const pdfBytes = await pdfDoc.save();

  // Crie um novo Blob para o arquivo PDF protegido
  const protectedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  return protectedPdfBlob;
}
