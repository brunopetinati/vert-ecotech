import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import { currentUrl } from '../../../constants/global';
import {
  ContainerNewButton,
  StyledButtonCancelar,
  StyledButtonDownload,
  StyledButtonLogs,
  ListItemDiv,
  ListItemDivContract,
  StyledButtonSalvar,
  StyledButtonConfirmarDocs,
  StyledButtonIniciarEtapa,
  StyledButtonIniciado,
  StyledButtonCriarContract,
  StyledButtonMintNft,
  StyledButtonShowNft,
  StyledButtonSubstituirNft,
  sytleFileUpload,
  BlockchainText,
  ContractItem,
  ContractLabel,
  ContractValue,
} from '../styles';

import FileUploadComponentPDF from './FileUploadComponentPDF';
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import ProgressBar2 from './ProgressBar2';
import { v4 as uuidv4 } from 'uuid';
import FUDeleteButton from './FUDeleteButton';
import FUSalvarButton from './FUSalvarButton';
import { Factory } from '../SmartContract/Factory';
import { mintNFT } from '../SmartContract/mintNFT';
import { updateNFT } from '../SmartContract/updateNFT';
import { burnNFT } from '../SmartContract/burnNFT';
import { verifyUser } from '../SmartContract/verifyUser';
import { protectPDF } from '../SmartContract/protectPDF';

const FileUploadBlockchain = ({ project_id, tela_name, modelo_GUID, confirmacao_doc = false }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const getFileStates = () => fileStates;
  const [fileStates, setFileStates] = useState({});
  const [contract_file_manager_contract, setFileManagerContract] = useState('');
  const [contract_contract_address_deploy, setcontractAddressDeploy] = useState('');
  const [contract_contract_address_client, setContractAddressClient] = useState('');
  const [contract_wallet_owner, setContractWalletOwner] = useState('');
  const [contract_project_name, setContractProjectName] = useState('');
  const [contract_project_owner, setContractProjectOwner] = useState('');
  const [contract_car, setContractCar] = useState('');
  const [contract_cnpj_cpf, setContractCnpjCpf] = useState('');

  const switchField = (fieldName) => {
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  //criar assinatura para o pdf
  const handleFileChange = (event, fieldName, modelo_item_id) => {
    const selectedFile = event.target.files[0];
    const guid = uuidv4();
    const ext = selectedFile.name.split('.').pop();

    const reader = new FileReader();

    reader.onload = async (e) => {
      const arquivo_fisico_content = e.target.result;
      // Não é necessário o btoa(), pois reader.readAsDataURL() já converte o arquivo para Base64
      const arquivo_fisico_base64 = arquivo_fisico_content.split(',')[1]; // Remove a parte "data:..." da URL Base64
      //const arquivo_fisico_base64 = btoa(arquivo_fisico_content);

      //cria uma assinatura para o doc
      const retorno = await protectPDF(guid, null);

      setFileStates((prevState) => ({
        ...prevState,
        [fieldName]: {
          id: guid,
          name_guid_ext: guid,
          path: `contractfiles/${guid}.${ext}`,
          ativo: true,
          project_id: project_id,
          name_orig_ext: selectedFile.name,
          modelo_item_id: modelo_item_id,
          name_ext_ext: ext,
          arquivo_fisico: arquivo_fisico_base64,
          signature: retorno.signature
        },
      }));
    };

    reader.readAsDataURL(selectedFile); // Usa readAsDataURL() para obter a string Base64 diretamente
    //"reader.readAsBinaryString(selectedFile);" versão antiga
    //reader.readAsArrayBuffer(selectedFile);
    return fileStates[fieldName];
  };


  const [data2, setData2] = useState({});

  useEffect(() => {

    //carrega o modelo de documentos com o estado dos arquivos na vertical
    axios.get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
      .then((response) => {
        setData2({ ...response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    //carrega dados do contrato
    recarregarContract();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isBotaoSalvar, setBotaoSalvar] = useState(false);
  const [uploadProgresses, setUploadProgresses] = useState({});
  const [uploading, setUploading] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState({});


  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Remove o prefixo "data:application/pdf;base64,"
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handleUpload = async (_item = null, _name = null) => {
    var docs = fileStates;

    if (_item !== null && _name !== null) {
      docs = { [_name]: _item };
    }

    const fileKeys = Object.keys(docs);

    for (const key of fileKeys) {
      const fileData = fileStates[key];

      // ✅ Agora só verificamos se arquivo_fisico é uma string Base64 válida
      if (fileData.arquivo_fisico && typeof fileData.arquivo_fisico === "string") {
        console.log("✅ Base64 já está correto:", fileData.arquivo_fisico.substring(0, 50) + "...");
      } else {
        console.error("❌ arquivo_fisico não é um arquivo válido:", fileData.arquivo_fisico);
        continue; // Pula este arquivo e evita o erro
      }

      try {
        await envia_arquivo_pythondoc(fileData, key);
      } catch (error) {
        console.error(`Erro ao enviar o arquivo ${key}:`, error);
      }
    }

    console.log("Todos os arquivos foram enviados.");
    recarregarTela1();
  };

  async function envia_arquivo_pythondoc(fileData, fieldName) {
    try {
      console.log("📤 Dados enviados para o backend:", JSON.stringify(fileData, null, 2)); // Exibe os dados formatados

      setUploading((prev) => ({ ...prev, [fieldName]: true }));

      const doc = { [fieldName]: fileData };

      const response = await axios.post(`${currentUrl}/api/sendfilesupload/`, { file_states: doc }, {
        headers,
        params: {
          usuario_id: sessionStorage.getItem('usuario_id')
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgresses((prevProgress) => ({
            ...prevProgress,
            [fieldName]: progress,
          }));
        }
      })
        .then(async (response1) => {
          console.log("Arquivo enviado com sucesso.");
        })
        .catch((error) => {
          console.error("Upload falhou!", error);
          Swal.fire({
            title: "Erro!",
            text: "Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com",
            icon: "error",
            confirmButtonText: "OK"
          });
        });

      setUploadSuccess((prev) => ({ ...prev, [fieldName]: true }));  // Marca sucesso após o envio
      setUploading((prev) => ({ ...prev, [fieldName]: false }));  // Para o upload
      console.log(`Upload do arquivo ${fileData.name_orig_ext} realizado com sucesso.`);
    } catch (error) {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));  // Para o upload em caso de erro
      console.error(`Erro ao enviar o arquivo ${fileData.name_orig_ext}:`, error);
    }
  }



  const recarregarTela1 = async () => {
    setBotaoSalvar(true);

    axios
      .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
      .then((response2) => {
        setData2({ ...response2.data });
        setFileStates({});
        setBotaoSalvar(false);

        //console.log(response1);

        Swal.fire({
          title: 'Sucesso!',
          text: 'Seus arquivos foram enviados com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  //NÃO ESTÁ SENDO USADO 
  const createCopyWithoutFileContent = (fileStates) => {
    // Mapeia cada item de fileStates, removendo o campo 'arquivo_fisico'
    const updatedStates = Object.keys(fileStates).reduce((acc, key) => {
      const { arquivo_fisico, ...rest } = fileStates[key]; // Remove 'arquivo_fisico'
      acc[key] = rest; // Adiciona o restante ao novo objeto
      return acc;
    }, {});

    return updatedStates;
  };

  //upload de PDF
  const handleUploadTemp = (docs, _motivo) => {
    return new Promise((resolve, reject) => {
      axios.post(`${currentUrl}/api/sendfilesupload/`, { file_states: docs }, {
        headers,
        params: {
          usuario_id: sessionStorage.getItem('usuario_id'),
          motivo: _motivo
        }
      })
        .then((response1) => {
          setBotaoSalvar(true);

          axios.get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
            .then((response2) => {
              setData2({ ...response2.data });
              setFileStates({});
              setBotaoSalvar(false);

              //console.log(response1);
              resolve(response1); // Resolve a Promise com a resposta de response1
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              reject(error); // Rejeita a Promise com o erro
            });
        })
        .catch((error) => {
          console.error('Upload failed!', error);
          reject(error); // Rejeita a Promise com o erro

          Swal.fire({
            title: 'Erro!',
            text: error.response.data.error + ', Por favor, contate nosso suporte! suporte@vertecotech.com ',
            icon: 'error',
            confirmButtonText: 'OK'
          });

        });
    });
  };


  const [expandedTopics, setExpandedTopics] = useState([]);

  const toggleTopic = (topic) => {
    if (expandedTopics.includes(topic)) {
      setExpandedTopics(expandedTopics.filter((t) => t !== topic));
    } else {
      setExpandedTopics([...expandedTopics, topic]);
    }
  }


  async function abrirDocumentoNavegadorDoBanco(guid, ext, mime_type) {

    //cria uma assinatura para o doc
    const retorno = await protectPDF(guid, null);

    console.log(guid);

    axios.post(`${currentUrl}/api/documentdownload2/`,
      {
        document_name: `${guid}.${ext}`,
        signature: retorno.signature
      },
      {
        headers,
        responseType: 'blob' // Receber o arquivo como um Blob diretamente
      })
      .then((response) => {
        const tipoMIME = mime_type || response.data.type || 'application/octet-stream';

        // Cria um URL para o Blob
        const fileURL = URL.createObjectURL(new Blob([response.data], { type: tipoMIME }));

        // Abre o arquivo em uma nova janela do navegador
        const novaJanela = window.open();
        if (novaJanela) {
          novaJanela.document.write(`<iframe width="100%" height="100%" src="${fileURL}"></iframe>`);
        } else {
          console.error('Falha ao abrir uma nova janela do navegador.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar o arquivo:', error);
      });
  }

  async function downloadDocumentoDoBanco(guid, ext, name) {

    //cria uma assinatura para o doc
    const retorno = await protectPDF(guid, null);

    console.log(guid);

    axios.post(`${currentUrl}/api/documentdownload2/`,
      {
        document_name: `${guid}.${ext}`,
        signature: retorno.signature
      },
      {
        headers,
        responseType: 'blob' // Receber o arquivo como Blob diretamente
      })
      .then((response) => {
        const fileName = name || 'file'; // Nome padrão caso não seja fornecido

        // Cria um Blob com o tipo MIME correto (do servidor Node)
        const blob = new Blob([response.data], { type: response.data.type || 'application/octet-stream' });

        // Cria uma URL temporária para o Blob
        const blobURL = URL.createObjectURL(blob);

        // Cria um link de download
        const downloadLink = document.createElement('a');
        downloadLink.href = blobURL;
        downloadLink.download = fileName;

        // Adiciona o link ao documento e simula um clique para iniciar o download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove o link do DOM após o clique
        document.body.removeChild(downloadLink);

        // Libera a URL temporária para evitar vazamentos de memória
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.error('Erro ao buscar o arquivo:', error);
      });
  }

  const atualizarJsonResponseNftBurned = async (fileManagerNftId, novoJsonResponse, ContratoAddress,
    ContratoClienteAddress, SignerGeral, tokenId, signer, signature, hashedMessage) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagernft/update_json_response_burned/${fileManagerNftId}/`,
        {
          json_response_burned: novoJsonResponse,
          ContratoAddress: ContratoAddress,
          ContratoClienteAddress: ContratoClienteAddress,
          SignerGeral: SignerGeral,
          tokenId: tokenId,
          signer: signer,
          signature: signature,
          hashedMessage: hashedMessage
        },
        { headers }
      );

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta do delete:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };

  const atualizarDataNftBurned = async (novoJsonResponse) => {
    try {
      const response = await axios.post(
        `${currentUrl}/api/save_smart_contract_nft_data_burned/insert/`,
        { json_response_burned: novoJsonResponse },
        { headers }
      );

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };


  const atualizarNftButtonBurned = async (fileManagerControlId) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagercontractnft/update_nft_button_burned/${fileManagerControlId}/`,
        { teste: 'true' },
        { headers }
      );

      //console.log(response);

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };

  const atualizaCampoErroNftBurn = async (fileManagerNftId, Signer, signature, hashedMessage, jsonErrorResponse) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagernft/update_nft_json_error_response_burn/${fileManagerNftId}/`,
        { json_error_response: jsonErrorResponse, signer: Signer, signature: signature, hashedMessage: hashedMessage },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar campo erro JSON response:', error);
      throw error;
    }
  };

  function cancelarDocumento2(guid, __file_manager_nft_dt, __visible_show_nft, file_manager_control_id) {
    Swal.fire({
      title: 'Confirmação',
      html: `
        <div>
          <label for="justificativa">Justificativa:</label>
          <textarea style="width: 400px; height: 100px;" name="ctl00$ContentPlaceHolder1$txtJustificativa" 
            id="ctl00_ContentPlaceHolder1_txtJustificativa" class="swal2-input" required></textarea>
        </div>
        <div>
        <label for="senha">Senha:</label>
          <input name="ctl00$ContentPlaceHolder1$txtSenhaLogin" type="password" id="ctl00_ContentPlaceHolder1_txtSenha" 
            autocomplete="off" onfocus="this.removeAttribute('readonly');" style="width:200px;" class="swal2-input password-input">        
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar Cancelamento',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      didOpen: () => {
        //implement
      },
      preConfirm: () => {
        const senha = Swal.getPopup().querySelector('#ctl00_ContentPlaceHolder1_txtSenha').value;
        const justificativa = Swal.getPopup().querySelector('#ctl00_ContentPlaceHolder1_txtJustificativa').value;

        return { senha, justificativa };
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          // Aqui você pode usar result.value.senha e result.value.justificativa
          axios
            .get(`${currentUrl}/api/documentcancelar/`, {
              headers,
              params: {
                guid: guid, senha: result.value.senha,
                justificativa: result.value.justificativa,
                usuario_id: sessionStorage.getItem('usuario_id')
              },
            })
            .then(async (response1) => {

              //implement burn nft
              if (__visible_show_nft && contract_contract_address_client) {


                try {

                  const retorno = await burnNFT(contract_contract_address_client, contract_wallet_owner, __file_manager_nft_dt.nft_token_id, __file_manager_nft_dt.nft_file_manager_nft_id);
                  //console.log(retorno);


                  //implement
                  //atualiza json_response com file_manager_contract_id
                  //__file_manager_nft_dt.nft_file_manager_nft_id atualizar a tabela nft_file_manager_nft->json_response_burned
                  //__file_manager_nft_dt.nft_file_manager_nft_id atualizar a tabela nft_file_manager_nft->date_response_burned
                  //__file_manager_nft_dt.nft_file_manager_nft_id atualizar a tabela nft_file_manager_nft->is_nft_burned                
                  const respostaAtualizacao = await atualizarJsonResponseNftBurned(retorno.file_manager_nft_id, retorno,
                    retorno.contratoAddress, retorno.contratoClienteAddress,
                    retorno.signerGeral, retorno.tokenId, retorno.signer,
                    retorno.signature, retorno.hashedMessage);

                  //console.log(respostaAtualizacao);

                  //implement
                  //distribui dados para o modelo
                  //distribuicao dos dados no modelo burned
                  const data2 = await atualizarDataNftBurned(retorno);

                  //console.log(data2);

                  //atualiza status do button
                  const data3 = await atualizarNftButtonBurned(file_manager_control_id);
                  //recarregarTela();

                  console.log('NFT - Deletada com Sucesso!');

                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'NFT - Burned executado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });

                  //criar uma regra no retorno do to_json que mostre os dados da NFT queimada
                  //criar um botao para mostrar os dados da regra da nft queimada

                } catch (error) {
                  //implement update file_manager_nft->is_error = true
                  const retorno = await atualizaCampoErroNftBurn(__file_manager_nft_dt.nft_file_manager_nft_id, error.signer, error.signature, error.hashedMessage, error);
                  console.error('Erro ao criar a nft:', error);

                  Swal.fire({
                    title: 'Erro!',
                    text: 'Algo deu errado ao tentar criar a NFT, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });

                  return false;
                }


              }
              else {
                Swal.fire({
                  title: 'Sucesso!',
                  text: 'Documento cancelado com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
              }

              //atualizar tela
              axios
                .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
                .then((response2) => {
                  setData2({ ...response2.data });
                  setFileStates({});
                  setBotaoSalvar(false);

                  //console.log(response1.data);
                })
                .catch((error) => {
                  console.error('Error fetching data:', error);
                });

            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao cancelar o documento.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            });
        }
      })
      .catch((error) => {
        console.error('Error displaying SweetAlert:', error);
      });
  }

  function mostrarLogs(logs) {
    // Criar uma div para exibir os logs
    const logsContainer = document.createElement('div');
    logsContainer.style.margin = '20px'; // Ajuste as margens conforme necessário
    logsContainer.style.border = '1px solid #ddd'; // Adicionando borda à div
    logsContainer.style.borderRadius = '5px'; // Adicionando borda arredondada

    // Adicionar cabeçalhos da div
    const headers = ['Documento', 'Data', 'User', 'Data Can.', 'Motivo', 'User Can.'];
    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.style.backgroundColor = '#f2f2f2'; // Adicionando cor de fundo aos cabeçalhos
    headers.forEach(headerText => {
      const header = document.createElement('div');
      header.textContent = headerText;
      header.style.flex = '1';

      // Adicionando estilos diretamente às divs em linha para cabeçalhos
      if (headerText === 'Data') {
        header.style.fontStyle = 'italic';
        header.style.color = 'green';
      } else if (headerText === 'Data Can.') {
        header.style.fontStyle = 'italic';
        header.style.color = 'green';
      } else if (headerText === 'User') {
        header.style.textTransform = 'uppercase';
        header.style.color = 'red';
      } else if (headerText === 'User Can.') {
        header.style.textTransform = 'uppercase';
        header.style.color = 'red';
      } else {
        header.style.fontWeight = 'bold';
        header.style.color = 'blue';
      }

      header.style.fontSize = '8pt';
      headerRow.appendChild(header);
    });
    logsContainer.appendChild(headerRow);

    // Adicionar linhas da div
    logs.forEach(log => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.borderTop = '1px solid #ddd'; // Adicionando borda superior entre linhas
      row.style.backgroundColor = 'transparent'; // Cor de fundo padrão para linhas

      Object.entries(log).forEach(([key, value]) => {
        const cell = document.createElement('div');
        cell.textContent = value;
        cell.style.flex = '1';
        row.style.fontSize = '8pt';

        row.appendChild(cell);
      });
      logsContainer.appendChild(row);
    });

    // Exibir a div dentro do Swal.fire
    Swal.fire({
      title: 'Lista de Logs',
      html: logsContainer.outerHTML, // Converte a div para uma string HTML
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  const handleIniciarEtapa = (_topico_id) => {
    const requestData = {
      project_id: project_id,
      topic_id: _topico_id,
    };

    Swal.fire({
      title: 'Confirmação',
      text: 'Deseja realmente iniciar esta etapa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${currentUrl}/api/createfilemanagercontrols/`, requestData, { headers })
          .then((response1) => {
            axios
              .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
              .then((response2) => {
                setData2({ ...response2.data });
                //console.log(response2.data);
                //console.log('Controles criados com sucesso:', response1.data);

                if (response1.data.length > 0) {
                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'Etapa iniciada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
                } else {
                  Swal.fire({
                    title: 'Erro!',
                    text: 'Etapa já encontra-se iniciada.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  });
                }

              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          })
          .catch((error) => {
            console.error('Erro ao criar controles:', error);
          });
      }
    });
  }

  const [isChecked, setChecked] = useState(false);

  const handleConfirmacaoDocumentos = (_topico_id) => {

    if (!isChecked) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Selecione a confirmação de documentos, para confirmar!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });

      return;
    }

    const requestData = {
      project_id: project_id,
      topic_id: _topico_id,
    };

    Swal.fire({
      title: 'Confirmação',
      text: 'Deseja realmente confirmar os documentos para esta etapa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${currentUrl}/api/updatefilemanagercontrols/`, requestData, { headers })
          .then((response) => {
            //console.log('Controles atualizados com sucesso:', response.data);

            Swal.fire({
              title: 'Sucesso!',
              text: 'Documentos confirmados com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK',
            });

            // Chamar a API para recarregar a tela
            axios
              .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
              .then((response2) => {
                setData2({ ...response2.data });
                //console.log(response2.data);
                //console.log('Dados da tela recarregados com sucesso após a confirmação.');

                // Aqui você pode adicionar a lógica adicional, se necessário, após a recarga bem-sucedida.
              })
              .catch((error) => {
                console.error('Erro ao recarregar dados da tela:', error);
              });
          })
          .catch((error) => {
            console.error('Erro ao atualizar controles:', error);

            Swal.fire({
              title: 'Erro!',
              text: 'Erro ao confirmar documentos. Por favor, tente novamente.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      }
    });
  }

  const handleEtapaIniciada = (_topico_id) => {
    Swal.fire({
      title: 'Atenção!',
      text: 'Etapa ' + _topico_id + ' já está ativa.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }

  const contarDocumentNamePreenchidos = (data, topicToCalculate) => {
    const questoes = data[topicToCalculate]?.questoes || [];
    return questoes.filter(q => q.document_name).length;
  };

  const verificarUploadVisivel = (data, topicToCheck) => {
    const primeiraQuestao = data[topicToCheck]?.questoes?.[0];
    return primeiraQuestao?.file_manager_control?.visible_upload === true || primeiraQuestao?.file_manager_control?.visible_update === true;
  };

  const contarDocumentOkTrue = (data, etapa) => {
    const questoes = data[etapa]?.questoes || [];
    return questoes.filter(q => q.file_manager_control?.document_ok === true).length;
  };

  const TopicoCount = (data, topico) => {
    return data[topico]?.questoes?.length || 0;
  };

  const [isDocConfirmed, setDocConfirmed] = useState(false);

  const verificarDocsConfirmados = () => {
<<<<<<< Updated upstream
    //console.log("entrou para confirmar");
=======
>>>>>>> Stashed changes

    const requestData = {
      project_id: project_id
    };

    axios
      .post(`${currentUrl}/api/getconfirmeddocumentscount/`, requestData, { headers })
      .then((response) => {
        //console.log(response.data.confirmed_documents_count);
        //if (parseInt(response.data.confirmed_documents_count, 10) === 8) { setDocConfirmed(true);}
        if (parseInt(response.data.confirmed_documents_count, 10) >= 6) { setDocConfirmed(true); }
      })
      .catch((error) => {
        console.error('Erro ao buscar documentos:', error);
      });

    return isDocConfirmed;
  };

  const [isContractConfirmed, setContractConfirmed] = useState(false);

  const getContract = () => {

    const requestData = {
      project_id: project_id
    };

    try {
      axios
        .post(`${currentUrl}/api/filemanagercontract/select/`, requestData, { headers })
        .then((response1) => {

          if (response1.data.confirmed_contract_count > 0) {
            setContractConfirmed(true);
          } else {
            setContractConfirmed(false);
          }

        })
        .catch((error) => {
          console.error('Erro ao buscar documentos:', error);
          return false;
        });

    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      return false;
    }

    return isContractConfirmed;
  };

  const recarregarTela = () => {
    axios
      .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
      .then((response) => {
        setData2({ ...response.data });
      })
      .catch((error) => {
        console.error('Erro ao recarregar dados da tela:', error);
      });
  }

  const recarregarContract = () => {
    axios
      .post(`${currentUrl}/api/getcontractinfo/select/`, { project_id: project_id }, { headers })
      .then((response) => {
        //console.log("Resposta da API:", response.data);

        setFileManagerContract(response.data.id);
        setcontractAddressDeploy(response.data.ContratoAddress);
        setContractAddressClient(response.data.ContratoClienteAddress);
        setContractWalletOwner(response.data.Signer);
        setContractProjectName(response.data.ProjectName);
        setContractProjectOwner(response.data.ProjectOwner);
        setContractCar(response.data.ProjectCAR);
        setContractCnpjCpf(response.data.ProjectCnpjCpf);

        //console.log("File Manager Contract:", response.data.id);
        //console.log("Contract Address Deploy:", response.data.ContratoAddress);
        //console.log("Contract Address Client:", response.data.ContratoClienteAddress);
        //console.log("Wallet Owner:", response.data.Signer);
        //console.log("Project Name:", response.data.ProjectName);
        //console.log("Project Owner:", response.data.ProjectOwner);
        //console.log("CAR:", response.data.ProjectCAR);
        //console.log("CNPJ / CPF:", response.data.ProjectCnpjCpf);
      })
      .catch((error) => {
        console.error('Erro ao recarregar dados do contrato:', error);
      });
  }

  const atualizarJsonResponseContract = async (
    fileManagerContractId,
    novoJsonResponse,
    ContratoAddress,
    ContratoClienteAddress,
    SignerGeral,
    signature,
    hashedMessage
  ) => {
    try {
      // Converte BigInt para string
      const sanitizeBigInt = (obj) => {
        if (typeof obj !== 'object' || obj === null) return obj;
  
        for (const key in obj) {
          if (typeof obj[key] === 'bigint') {
            console.warn(`⚠️ Convertendo BigInt para string em "${key}":`, obj[key]);
            obj[key] = obj[key].toString();
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeBigInt(obj[key]); // Recursão para objetos aninhados
          }
        }
        return obj;
      };
  
      // Organiza os dados para enviar ao backend
      const payload = sanitizeBigInt({
        json_response: novoJsonResponse,
        ContratoAddress,
        ContratoClienteAddress,
        SignerGeral,
        signature,
        hashedMessage
      });
  
      console.log('📦 Dados prontos para o backend:', payload);
  
      // Faz a requisição PATCH
      const response = await axios.patch(
        `${currentUrl}/api/filemanagercontract/update_json_response/${fileManagerContractId}/`,
        payload,
        { headers }
      );
  
      console.log('✅ Resposta do backend:', response.data);
      return response.data;
  
    } catch (error) {
      console.error('❌ Erro ao atualizar JSON response:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  const atualizarData2Contract = async (novoJsonResponse) => {
    try {
      const response = await axios.post(
        `${currentUrl}/api/save_smart_contract_data2/insert/`,
        { json_response: novoJsonResponse },
        { headers }
      );
<<<<<<< HEAD
      
=======

      console.log(response.data);

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };


  const atualizaCampoErroContract = async (fileManagerContractId, Signer, signature, hashedMessage, jsonErrorResponse) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagercontract/update_contract_json_error_response/${fileManagerContractId}/`,
        { json_error_response: jsonErrorResponse, signer: Signer, signature: signature, hashedMessage: hashedMessage },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar campo erro JSON response:', error);
      throw error;
    }
  };


  const criarContract = async () => {
    try {
      const confirmacao = await Swal.fire({
        title: 'Confirmação',
        text: 'Você realmente deseja criar o contrato?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacao.isConfirmed) {
        const requestDatainfo = {
          project_id: project_id,
        };
        console.log("comfirmou")
        await axios.post(`${currentUrl}/api/getinfoproject/select/`, requestDatainfo, { headers })
          .then(async (response0) => {
            const nomePropriedade = response0.data.project.title;
            const nomeProprietario = response0.data.user.owner_name;
            const cnpjcpf = response0.data.user.ProjectCnpjCpf;
            const car = response0.data.project.sicar_code;

            const requestData = {
              project: project_id,
              ProjectName: nomePropriedade,
              ProjectOwner: nomeProprietario,
              ProjectCnpjCpf: cnpjcpf,
              ProjectCAR: car,
            };


            console.log("Resquest Data" + requestData)
=======
>>>>>>> Stashed changes

=======
            console.log("Resquest Data" + requestData)

>>>>>>> 3a3dd5d (subindo ajustes que não foram terminados na parte do contrato -Nataly)
            await axios.post(`${currentUrl}/api/filemanagercontract/insert/`, requestData, { headers })
              .then(async (response1) => {
                const file_manager_contract_id = response1.data.id;

<<<<<<< Updated upstream
                console.log(file_manager_contract_id);
                try {

<<<<<<< HEAD
                  try {
                    console.log("Iniciando Factory...");
                    const retorno = await Factory(nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id);
                    console.log("Factory concluída. Retorno:", retorno);
                  
                    console.log("Iniciando atualizarJsonResponseContract...");
                    const respostaAtualizacao = await atualizarJsonResponseContract(
                      retorno.file_manager_contract_id, 
                      retorno,
                      retorno.contratoAddress, 
                      retorno.contratoClienteAddress,
                      retorno.signerGeral, 
                      retorno.signature, 
                      retorno.hashedMessage
                    );
                    console.log("atualizarJsonResponseContract concluída. Resposta:", respostaAtualizacao);
                  
                    console.log("Iniciando atualizarData2Contract...");
                    const data2 = await atualizarData2Contract(retorno);
                    console.log("atualizarData2Contract concluída. Data2:", data2);
                    
                  } catch (error) {
                    console.error("Erro durante a execução sequencial:", error);
                  }

                  //recarrega tela
                  recarregarTela();
                  recarregarContract();

                  console.log('Smart Contract - Gerado com Sucesso!');

                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'Smart Contract - Gerado com Sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });


                } catch (error) {
                  console.log("Entrou no catch")
                  //implement update file_manager_contract->is_error = true
                  const retorno = await atualizaCampoErroContract(file_manager_contract_id, error.signer, error.signature, error.hashedMessage, error);
                  console.error('Erro ao criar o contrato:', error);

                  Swal.fire({
                    title: 'Erro!',
                    text: 'Algo deu errado ao tentar criar o contrato, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });

                  return false;
                }

              })
              .catch((error) => {
                console.error('Erro ao criar o contrato:', error);
                return false;
              });

          })
          .catch((error) => {
            console.error('Erro ao buscar info project:', error);
            return false;
          });
      } else {
        console.log('Operação cancelada pelo usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const atualizarJsonResponseNft = async (fileManagerNftId, novoJsonResponse, ContratoAddress,
    ContratoClienteAddress, SignerGeral, tokenId, signer, signature, hashedMessage) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagernft/update_json_response2/${fileManagerNftId}/`,
        {
          json_response: novoJsonResponse,
          ContratoAddress: ContratoAddress,
          ContratoClienteAddress: ContratoClienteAddress,
          SignerGeral: SignerGeral,
          tokenId: tokenId,
          signer: signer,
          signature: signature,
          hashedMessage: hashedMessage
        },
        { headers }
      );

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };

  const atualizarData2Nft = async (novoJsonResponse) => {
    try {
      const response = await axios.post(
        `${currentUrl}/api/save_smart_contract_nft_data2/insert/`,
        { json_response: novoJsonResponse },
        { headers }
      );

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };

  const atualizarNftButton = async (fileManagerControlId) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagercontractnft/update_nft_button/${fileManagerControlId}/`,
        { teste: 'true' },
        { headers }
      );

      //console.log(response);

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };


  const atualizaCampoErroNft = async (fileManagerNftId, Signer, signature, hashedMessage, jsonErrorResponse) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagernft/update_nft_json_error_response/${fileManagerNftId}/`,
        { json_error_response: jsonErrorResponse, signer: Signer, signature: signature, hashedMessage: hashedMessage },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar campo erro JSON response:', error);
      throw error;
    }
  };

  //mintagem do arquivo
  const mintNft = async (document_guid, document_name, file_manager_topic_id, item_document_path, file_manager_control_id, modelo_item_id) => {
    try {
      const confirmacao = await Swal.fire({
        title: 'Confirmação',
        text: 'Você realmente deseja mintar a NFT?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacao.isConfirmed) {
        const requestDatainfo = {
          project_id: project_id,
        };

        const dominio_site = 'http://teste.com.br/';
        const _nftTitle = document_guid;
        const _nftDescription = document_name;
        const _nftPrice = 1;
        const _nftRoyaltyPercentage = 1;
        const _nftImageUrl = dominio_site + item_document_path;

        const requestData = {
          Document_id: document_guid,
          project_id: project_id,
          Contract_id: contract_file_manager_contract,
          Topic_id: file_manager_topic_id,
          title: _nftTitle,
          description: _nftDescription,
          price: _nftPrice,
          royalty: _nftRoyaltyPercentage,
          img_url: _nftImageUrl,
          modelo_item_id: modelo_item_id
        };
        //console.log(requestData);

        //implementação para inserir informação no banco "/api/filemanagernft/insert/`"
        await axios.post(`${currentUrl}/api/filemanagernft/insert/`, requestData, { headers })
          .then(async (response1) => {
            const file_manager_nft_id = response1.data.id;

            try {
              //chamada para gerar a nft
              const retorno = await mintNFT(contract_contract_address_client, contract_wallet_owner, _nftTitle, _nftDescription, _nftPrice, _nftRoyaltyPercentage, _nftImageUrl, file_manager_nft_id);

              //implement
              //atualiza json_response com file_manager_contract_id
              const respostaAtualizacao = await atualizarJsonResponseNft(retorno.file_manager_nft_id, retorno,
                retorno.contratoAddress, retorno.contratoClienteAddress,
                retorno.signerGeral, retorno.tokenId, retorno.signer,
                retorno.signature, retorno.hashedMessage);

              //console.log(respostaAtualizacao);

              //implement
              //distribui dados para o modelo
              const data2 = await atualizarData2Nft(retorno);

              //console.log(data2);

              //atualiza status do button
              const data3 = await atualizarNftButton(file_manager_control_id);
              recarregarTela();

              console.log('NFT - Gerada com Sucesso!');

              Swal.fire({
                title: 'Sucesso!',
                text: 'NFT - Gerada com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK',
              });

            } catch (error) {
              //implement update file_manager_nft->is_error = true
              const retorno = await atualizaCampoErroNft(file_manager_nft_id, error.signer, error.signature, error.hashedMessage, error);
              console.error('Erro ao criar a nft:', error);

              Swal.fire({
                title: 'Erro!',
                text: 'Algo deu errado ao tentar criar a NFT, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
                icon: 'error',
                confirmButtonText: 'OK'
              });

              return false;
            }

          })
          .catch((error) => {
            console.error('Erro ao criar a nft:', error);
            return false;
          });

      } else {
        console.log('Operação cancelada pelo usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const showNft = async (nftData) => {
    // Criar uma div para exibir os dados da NFT
    const nftContainer = document.createElement('div');
    nftContainer.style.margin = '20px'; // Ajuste as margens conforme necessário
    nftContainer.style.border = '1px solid #ddd'; // Adicionando borda à div
    nftContainer.style.borderRadius = '5px'; // Adicionando borda arredondada
    nftContainer.style.fontSize = '8pt';
    nftContainer.style.textAlign = 'left';
    nftContainer.style.width = '550px';
    nftContainer.style.height = '230px';


    // Adicionar campos dinamicamente
    for (const key in nftData) {
      if (nftData.hasOwnProperty(key)) {
        const label = document.createElement('label');
        label.innerText = `${key}: `;
        const value = document.createElement('span');
        value.innerText = nftData[key];

        // Adicionar label e valor à nftContainer
        nftContainer.appendChild(label);
        nftContainer.appendChild(value);

        // Adicionar quebra de linha entre os campos
        const lineBreak = document.createElement('br');
        nftContainer.appendChild(lineBreak);
      }
    }


    // Exibir a div dentro do Swal.fire
    Swal.fire({
      title: 'Detalhes da NFT',
      html: nftContainer.outerHTML, // Converte a div para uma string HTML
      showCloseButton: true,
      showConfirmButton: false,
      width: 650,
      height: 250
    });
  };

  const atualizarData3Nft = async (novoJsonResponse) => {
    try {
      const response = await axios.post(
        `${currentUrl}/api/save_smart_contract_nft_data3/insert/`,
        { json_response: novoJsonResponse },
        { headers }
      );

      // Você pode tratar a resposta conforme necessário
      //console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar JSON response:', error);
      // Trate o erro conforme necessário
      throw error;
    }
  };

  const atualizaCampoErroNftSubstituir = async (fileManagerNftId, Signer, signature, hashedMessage, jsonErrorResponse) => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/filemanagernft/update_nft_json_error_response_substituir/${fileManagerNftId}/`,
        { json_error_response: jsonErrorResponse, signer: Signer, signature: signature, hashedMessage: hashedMessage },
        { headers }
      );

      //alert("atualizaCampoErroNftSubstituir ok");

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar campo erro JSON response:', error);
      throw error;
    }
  };

  function substituirDocumento(__document_guid, __item, __item_fileNameFile, __item_modelo_item_id) {

    var fileStatesLocal = '';

    var resposta_nft_ok = false;

    //UPDATE NA BLOCKCHAIN
    const updateNft = async (document_guid, document_name, file_manager_topic_id, item_document_path, token_id, modelo_item_id) => {

      try {

        const requestDatainfo = {
          project_id: project_id,
        };

        const dominio_site = 'http://teste.com.br/';
        const _nftTitle = document_guid;
        const _nftDescription = document_name;
        const _nftPrice = 1;
        const _nftRoyaltyPercentage = 1;
        const _nftImageUrl = dominio_site + item_document_path;

        const requestData = {
          Document_id: document_guid,
          project_id: project_id,
          Contract_id: contract_file_manager_contract,
          Topic_id: file_manager_topic_id,
          title: _nftTitle,
          description: _nftDescription,
          price: _nftPrice,
          royalty: _nftRoyaltyPercentage,
          img_url: _nftImageUrl,
          modelo_item_id: modelo_item_id
        };

        //implement
        await axios.post(`${currentUrl}/api/filemanagernft/insert/`, requestData, { headers })
          .then(async (response1) => {
            const file_manager_nft_id = response1.data.id;
            //console.log(response1);

            try {

              //chamada para gerar a nft
              const retorno = await updateNFT(contract_contract_address_client, contract_wallet_owner, token_id, _nftTitle, _nftDescription, _nftPrice, _nftRoyaltyPercentage, _nftImageUrl, file_manager_nft_id);
              console.log(retorno);

              //atualiza json_response com file_manager_contract_id
              const respostaAtualizacao = await atualizarJsonResponseNft(retorno.file_manager_nft_id, retorno,
                retorno.contratoAddress, retorno.contratoClienteAddress,
                retorno.signerGeral, retorno.tokenId, retorno.signer,
                retorno.signature, retorno.hashedMessage);
              //console.log(respostaAtualizacao);

              //distribui dados para o modelo
              const data2 = await atualizarData3Nft(retorno);
              console.log('NFT - Atualizada com Sucesso!');
              resposta_nft_ok = true;

            } catch (error) {
              //implement update file_manager_nft->is_error = true
              const retorno = await atualizaCampoErroNftSubstituir(file_manager_nft_id, error.signer, error.signature, error.hashedMessage, error);
              console.log("NFT - Erro ao tentar atualizar nft!");
              resposta_nft_ok = false;
            }

            //recarrega tela
            recarregarTela();

          })
          .catch((error) => {
            console.error('Erro ao atualizar a nft:', error);
            return false;
          });

      } catch (error) {
        console.error('Erro:', error);
      }
    };

    //FUNCIONALIDADE SUBSTITUIR ARQUIVO USA "FileUploadComponentPDF"
    const handleFileChangeLocal = (event, fieldName, modelo_item_id) => {
      const selectedFile = event.target.files[0];
      const guid = uuidv4();
      const ext = selectedFile.name.split('.').pop();

      const reader = new FileReader();

      reader.onload = (e) => {
        const arquivo_fisico_content = e.target.result;
        const arquivo_fisico_base64 = btoa(arquivo_fisico_content);

        const objeto = {
          [fieldName]: {
            id: guid,
            name_guid_ext: guid,
            path: `contractfiles/${guid}.${ext}`,
            ativo: true,
            project_id: project_id,
            name_orig_ext: selectedFile.name,
            modelo_item_id: modelo_item_id,
            name_ext_ext: ext,
            arquivo_fisico: arquivo_fisico_base64,
          }
        };

        fileStatesLocal = objeto;
        //console.log(fileStatesLocal);
      };

      //"reader.readAsBinaryString(selectedFile);" versão antiga 
      reader.readAsArrayBuffer(selectedFile);
    };

    Swal.fire({
      title: 'Confirmação',
      html: `
        <div id="fileUploadComponentContainer"></div>
        <div>
          <label for="justificativa">Justificativa:</label>
          <textarea style="width: 400px; height: 100px;" name="ctl00$ContentPlaceHolder1$txtJustificativa" 
            id="ctl00_ContentPlaceHolder1_txtJustificativa" class="swal2-input" required></textarea>
        </div>
        <div>
        <label for="senha">Senha:</label>
          <input name="ctl00$ContentPlaceHolder1$txtSenhaLogin" type="password" id="ctl00_ContentPlaceHolder1_txtSenha" 
            autocomplete="off" onfocus="this.removeAttribute('readonly');" style="width:200px;" class="swal2-input password-input">        
        </div>        
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar Substituição de Documento e NFT',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      didOpen: () => {
        const root = createRoot(document.getElementById('fileUploadComponentContainer'));
        root.render(
          <div>
            <div>
              <FileUploadComponentPDF item={__item} handleFileChange={(e) => handleFileChangeLocal(e, __item_fileNameFile, __item_modelo_item_id)} />
            </div>
          </div>
        );
      },
      preConfirm: () => {
        const senha = Swal.getPopup().querySelector('#ctl00_ContentPlaceHolder1_txtSenha').value;
        const justificativa = Swal.getPopup().querySelector('#ctl00_ContentPlaceHolder1_txtJustificativa').value;

        return { senha, justificativa };
      },
    })
      .then(async (result) => {
        if (result && result.isConfirmed) {

          try {
            //verifica user na blockchain antes de upar o doc
            const retornoVerifyUser = await verifyUser(contract_wallet_owner, __item.file_manager_nft_dt.nft_file_manager_nft_id);
            try {

              if (retornoVerifyUser.is_assinatura_ok) {
                // Envia documento fisico para ser cadastrado no bando de dados
                const new_doc = await handleUploadTemp(fileStatesLocal, result.value.justificativa);


                alert(__item_modelo_item_id);

                // Atulizacao da NFT
                await updateNft(new_doc.data[0].id, new_doc.data[0].name_orig_ext, new_doc.data[0].modelo_topic, new_doc.data[0].path, __item.file_manager_nft_dt.nft_token_id, __item_modelo_item_id)

                //alert("resposta geracao nft: " + resposta_nft_ok);

                if (resposta_nft_ok) {
                  Swal.fire({
                    title: 'Sucesso!',
                    text: 'NFT - Atualizada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
                }
                else {
                  Swal.fire({
                    title: 'Erro!',
                    text: 'Algo deu errado ao tentar atualizar a NFT, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                }

              }
              else {
                //implement update file_manager_nft->is_error = true
                const retorno = await atualizaCampoErroNftSubstituir(__item.file_manager_nft_dt.nft_file_manager_nft_id, retornoVerifyUser.signer, retornoVerifyUser.signature, retornoVerifyUser.hashedMessage, retornoVerifyUser);
                console.error('Erro ao atualizar a nft:', retornoVerifyUser);

                Swal.fire({
                  title: 'Erro!',
                  text: 'Algo deu errado ao tentar atualizar a NFT, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }

            } catch (error) {
              console.error('Error uploading files:', error);
            }

          } catch (error) {
            //implement update file_manager_nft->is_error = true
            const retorno = await atualizaCampoErroNftSubstituir(__item.file_manager_nft_dt.nft_file_manager_nft_id, error.signer, error.signature, error.hashedMessage, error);
            console.error('Erro ao atualizar a nft:', error);

            Swal.fire({
              title: 'Erro!',
              text: 'Algo deu errado ao tentar atualizar a NFT, verifique a carteira MetaMask. Por favor, contate nosso suporte! suporte@vertecotech.com',
              icon: 'error',
              confirmButtonText: 'OK'
            });

            return false;
          }

        }
      })
      .catch((error) => {
        console.error('Error displaying SweetAlert:', error);
      });
  }



  return (
    <div>
      <div style={sytleFileUpload.containerFileUpload}>
        <h2 style={sytleFileUpload.centerTitle}>{tela_name}</h2>
        {/*Não sei oque é daqui ate...*/}
        {((verificarDocsConfirmados() &&
          (
            <div>
              <ListItemDivContract>
                <BlockchainText>Contrato</BlockchainText>
                {contract_contract_address_client === "" ? (
                  <StyledButtonCriarContract onClick={() => criarContract()}>
                    Criar Contract
                  </StyledButtonCriarContract>
                ) : (
                  <div>
                    <ContractItem>
                      <ContractLabel>File Manager Contract:</ContractLabel>
                      <ContractValue>{contract_file_manager_contract}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>Contract Address Deploy:</ContractLabel>
                      <ContractValue>{contract_contract_address_deploy}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>Contract Address Client:</ContractLabel>
                      <ContractValue>{contract_contract_address_client}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>Wallet Owner:</ContractLabel>
                      <ContractValue>{contract_wallet_owner}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>Project Name:</ContractLabel>
                      <ContractValue>{contract_project_name}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>Project Owner:</ContractLabel>
                      <ContractValue>{contract_project_owner}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>CAR:</ContractLabel>
                      <ContractValue>{contract_car}</ContractValue>
                    </ContractItem>
                    <ContractItem>
                      <ContractLabel>CNPJ / CPF:</ContractLabel>
                      <ContractValue>{contract_cnpj_cpf}</ContractValue>
                    </ContractItem>
                  </div>
                )}
              </ListItemDivContract>
              {/*Aquii*/}
            </div>
          )
        ))}

        <ProgressBar data={data2} />

        <div /*aquii tinha style, essa div mexe nos topicos */>
          {Object.keys(data2).sort((a, b) => parseInt(a) - parseInt(b)).map((topic) => (
            <div key={topic} className="collapsible">
              <ListItemDiv>
                <div style={sytleFileUpload.containerTopico} className="header" onClick={() => toggleTopic(topic)}>
                  {expandedTopics.includes(topic) ? ` - ` : ` + `}
                </div>
                <div style={sytleFileUpload.progressBarContainer}>
                  <div style={sytleFileUpload.progressBarTitle}>{data2[topic].titulo ? `${topic}) ` : ``}</div>
                  <div style={sytleFileUpload.progressBar} >{data2[topic].titulo ? <ProgressBar2 data={data2} __topico={[topic]} /> : ``}</div>
                  <div style={sytleFileUpload.progressBarLabel}> {data2[topic].titulo ? `${data2[topic].titulo.label}` : ``}</div>

                  {
                    (confirmacao_doc ?
                      (((topic === '01' && !verificarUploadVisivel(data2, '01')) ||
                        (topic !== '01' && contarDocumentNamePreenchidos(data2, '01') === TopicoCount(data2, '01')
                          && (contarDocumentOkTrue(data2, '01') === TopicoCount(data2, '01') && getContract() && verificarDocsConfirmados() || !confirmacao_doc)
                          && verificarUploadVisivel(data2, '01')
                          && !verificarUploadVisivel(data2, topic))) ?
                        (<div>
                          <StyledButtonIniciarEtapa onClick={() => handleIniciarEtapa(data2[topic].titulo.id)}>Iniciar {topic}</StyledButtonIniciarEtapa>
                        </div>)
                        :
                        ((contarDocumentNamePreenchidos(data2, '01') === TopicoCount(data2, '01')
                          && (contarDocumentOkTrue(data2, '01') === TopicoCount(data2, '01') && getContract() && verificarDocsConfirmados() || !confirmacao_doc) ||
                          (topic === '01' && verificarUploadVisivel(data2, '01'))) &&
                          (<div /*style={{ float: 'left', width: '50px', marginTop: '-3px' }}*/>
                            <StyledButtonIniciado onClick={() => handleEtapaIniciada(topic)}>Iniciado</StyledButtonIniciado>
                          </div>)))
                      :
                      getContract() && verificarDocsConfirmados() && !verificarUploadVisivel(data2, topic) ?
                        (<div /*style={{ float: 'left', width: '50px', marginTop: '-3px' }}*/>
                          <StyledButtonIniciarEtapa onClick={() => handleIniciarEtapa(data2[topic].titulo.id)}>Iniciar {topic}</StyledButtonIniciarEtapa>
                        </div>)
                        :
                        (getContract() && verificarDocsConfirmados() &&
                          (<div /*style={{ float: 'left', width: '50px', marginTop: '-3px' }}*/>
                            <StyledButtonIniciado onClick={() => handleEtapaIniciada(topic)}>Iniciado</StyledButtonIniciado>
                          </div>))
                    )
                  }
                </div>
              </ListItemDiv>

              {/* aqui mexe com na expanção dos documentos "subTopicos" */}
              {expandedTopics.includes(topic) && (
                <div >
                  <ul style={{ fontSize: '8pt', listStyleType: 'none' }}>
                    {data2[topic].questoes.map((item) => (
                      <li key={item.questao}>
                        <ListItemDiv>
                          {/* Aquii fica o css da lateral onde fica escrita */}
                          <div style={{
                            float: 'left',
                            marginLeft: '30px',
                            marginTop: '15px',
                            width: '540px',
                            minHeight: '20px',
                            paddingBottom: '3px',
                            textAlign: 'left' 
                          }}>
                            <strong style={{
                              color: 'black',
                              fontSize: '8pt',
                              //marginLeft: '4px',  
                              marginRight: '2px', 
                              //backgroundColor: 'pink',
                              //marginBottom: '10px', // Margem abaixo
                              //display: 'inline-block' // Permite aplicar margin-bottom corretamente
                            }}>
                              {topic}.{item.questao}
                            </strong>
                            {item.label} {item.document_name ? (
                              <div style={{ 
                                cursor: 'pointer', 
                                marginLeft: '5px', 
                                marginTop: '10px' ,
                                //backgroundColor: 'pink',
                              }}
                                onClick={() => abrirDocumentoNavegadorDoBanco(item.document_guid, item.document_ext, item.mime_type)}>
                                <b style={{ color: item.document_ativo ? 'blue' : 'red' }}>
                                  (Documento: {item.document_name})
                                </b>
                              </div>
                            ) : ""}
                          </div>

                          {(
                            <div style={{ 
                                //background: 'blue', 
                                float: 'left', 
                                width: '380px', 
                                height: '30px', 
                                marginLeft: '10px' 
                                }}>

                              {item.file_manager_control.visible_upload && (
                                <div style={{ float: 'left', marginLeft: '5px' }}>
                                  {fileStates[item.fileNameFile] ? (
                                    <div style={{ float: 'left', width: '60px', height: '25px' }}>

                                      {/* Exibe a barra de progresso apenas se o upload estiver em andamento */}
                                      {uploading[item.fileNameFile] && (
                                        <progress value={uploadProgresses[item.fileNameFile] || 0} max="100">
                                          {uploadProgresses[item.fileNameFile] || 0}%
                                        </progress>
                                      )}

                                      {uploading[item.fileNameFile] ? (  // Se o arquivo estiver sendo enviado, exiba "Enviando..." com a porcentagem
                                        <div style={{ float: 'left', width: '100px', height: '15px', marginTop: '-15px' }}>
                                          <p>Enviando {uploadProgresses[item.fileNameFile] || 0}%</p>
                                        </div>
                                      ) : uploadSuccess[item.fileNameFile] ? (  // Se o upload foi bem-sucedido, mostre "Sucesso"
                                        <div style={{ float: 'left', width: '60px', height: '25px', marginTop: '-15px' }}>
                                          <p>Sucesso!</p>
                                        </div>
                                      ) : (  // Caso contrário, exiba os botões de upload e delete
                                        <>
                                          <div style={{ float: 'left', width: '25px' }}>
                                            <FUSalvarButton
                                              disabled={isBotaoSalvar}
                                              handleUpload={() => handleUpload(fileStates[item.fileNameFile], item.fileNameFile)}
                                              nome_arquivo={item.fileNameFile}
                                            />
                                          </div>
                                          <div style={{ float: 'left', width: '25px', marginLeft: '5px' }}>
                                            <FUDeleteButton
                                              switchField={() => switchField(item.fileNameFile)}
                                              nome_arquivo={item.fileNameFile}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ) : (
                                    /* aqui chama para guardar pdf */
                                    <FileUploadComponentPDF
                                      item={item}
                                      handleFileChange={(e) => handleFileChange(e, item.fileNameFile, item.modelo_item_id)}
                                    />
                                  )}
                                </div>
                              )}



                              {item.file_manager_control.visible_update && contract_contract_address_client &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.document_name ? <StyledButtonSubstituirNft onClick={() => substituirDocumento(item.document_guid, item, item.fileNameFile, item.modelo_item_id)}>Substituir</StyledButtonSubstituirNft> : ''}
                                </div>)}

                              {item.file_manager_control.visible_logs &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.log.length > 0 ? <StyledButtonLogs onClick={() => mostrarLogs(item.log)}>Logs</StyledButtonLogs> : ''}
                                </div>)}

                              {item.file_manager_control.visible_cancel &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.document_name ? <StyledButtonCancelar disabled={!item.document_ativo} style={{ backgroundColor: item.document_ativo ? '#FFA07A' : 'white' }} onClick={() => cancelarDocumento2(item.document_guid, item.file_manager_nft_dt, item.file_manager_control.visible_show_nft, item.file_manager_control.file_manager_control_id)}>Cancelar</StyledButtonCancelar> : ''}
                                </div>)}

                              {item.file_manager_control.visible_download &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.document_name ? <StyledButtonDownload disabled={!item.document_ativo} style={{ backgroundColor: item.document_ativo ? '#00FF7F' : 'white' }} onClick={() => downloadDocumentoDoBanco(item.document_guid, item.document_ext, item.document_name)}>Download</StyledButtonDownload> : ''}
                                </div>)}
                              {/* botão para mintagem de arquivo */}
                              {item.file_manager_control.visible_mint_nft && contract_contract_address_client &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.document_name ? <StyledButtonMintNft disabled={!item.document_ativo}
                                    style={{ backgroundColor: item.document_ativo ? '#F5DEB3' : 'white' }}
                                    onClick={() => mintNft(item.document_guid, item.document_name, data2[topic]['titulo'].id, item.document_path, item.file_manager_control.file_manager_control_id, item.modelo_item_id)}>Mint NFT</StyledButtonMintNft> : ''}
                                </div>)}

                              {item.file_manager_control.visible_show_nft && contract_contract_address_client &&
                                (<div style={{ float: 'left', marginLeft: '5px' }}>
                                  {item.document_name ? <StyledButtonShowNft style={{ backgroundColor: item.document_ativo ? '#7FFF00' : '#FFB6C1' }} onClick={() => showNft(item.file_manager_nft_dt)}>NFT</StyledButtonShowNft> : ''}
                                </div>)}

                            </div>
                          )}
                        </ListItemDiv>
                      </li>
                    ))}
                    {topic === '01' && contarDocumentNamePreenchidos(data2, '01') === TopicoCount(data2, '01')
                      && contarDocumentOkTrue(data2, '01') < TopicoCount(data2, '01') && confirmacao_doc && (
                        <div style={{ float: 'left', width: '55vw', height: '70px', textAlign: 'right', marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={{ float: 'left', width: '30px', height: '70px', textAlign: 'left' }}>
                            <input type="checkbox" id="confirmCheckbox" onChange={() => setChecked(!isChecked)} />
                          </div>
                          <label
                            htmlFor="confirmCheckbox"
                            style={{ float: 'left', width: '270px', height: '70px', textAlign: 'left', cursor: 'pointer' }}
                          >
                            Confirmo que os documentos e informações declarados na ETAPA-1 estão corretas
                          </label>
                          <div style={{ float: 'left', width: '150px', height: '70px' }}>
                            {/*parei aquii */}
                            <StyledButtonConfirmarDocs onClick={() => handleConfirmacaoDocumentos(data2[topic].titulo.id)} style={{ marginLeft: '10px', backgroundColor: isChecked ? 'rgba(0, 80, 0, 0.7)' : 'silver' }}>Confirmar</StyledButtonConfirmarDocs>
                          </div>
                        </div>
                      )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* salvando todos os topicos de documentação*/}
        <ContainerNewButton>
          <div style={sytleFileUpload.buttonContainer}>
            <StyledButtonSalvar
              disabled={isBotaoSalvar}
              type="button"
              onClick={() => handleUpload()}
            >
              Salvar
            </StyledButtonSalvar>
          </div>
          <small
            style={{
              ...sytleFileUpload.styleSmall, // Aplica os estilos de styleSmall
              display: isBotaoSalvar ? 'inline' : 'none', // Controla a visibilidade
            }}
          >Salvando...</small>
        </ContainerNewButton>
      </div>
    </div>
  );
};

export default FileUploadBlockchain;
