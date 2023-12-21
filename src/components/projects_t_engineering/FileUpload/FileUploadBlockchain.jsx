import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../constants/global';
import { ContainerNewButton, 
          StyledButtonCancelar, 
          StyledButtonDownload, 
          StyledButtonLogs, 
          ListItemDiv, 
          StyledButtonSalvar,
          StyledButtonSalvarUnico,
          StyledButtonConfirmarDocs,
          StyledButtonIniciarEtapa,
          StyledButtonIniciado
        } from '../styles';

import FileUploadComponent from './FileUploadComponent';
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import ProgressBar2 from './ProgressBar2';
import { v4 as uuidv4 } from 'uuid';
import FUDeleteButton from './FUDeleteButton';
import FUSalvarButton from './FUSalvarButton';
import { ConnectButton } from "@rainbow-me/rainbowkit";


const styles = {
  formContainer: {
    position: 'absolute', 
    //width: '722px',
    top: '65px', 
    left: '350px'
  },
  label: {
    display: 'block',
    marginTop: '10px',
  },
  input: {
    width: '450px',
    padding: '5px',
  },
  fileInput: {
    marginTop: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

const FileUploadBlockchain = ({ project_id, tela_name, modelo_GUID, confirmacao_doc = false }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const [fileStates, setFileStates] = useState({});

  const switchField = (fieldName) => {
    setFileStates(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  

  const handleFileChange = (event, fieldName, modelo_item_id) => {
    const selectedFile = event.target.files[0];
    const guid = uuidv4();
    const ext = selectedFile.name.split('.').pop();
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const arquivo_fisico_content = e.target.result;
      const arquivo_fisico_base64 = btoa(arquivo_fisico_content);
  
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
        },
      }));
    };
  
    reader.readAsBinaryString(selectedFile);
  };


  const [data2, setData2] = useState({});

  useEffect(() => {  

    //carrega o modelo de documentos com o estado dos arquivos na vertical
    axios.get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
      .then((response) => {
        setData2({ ...response.data });
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [isBotaoSalvar, setBotaoSalvar] = useState(false);

  const handleUpload = (_item = null, _name = null) => {

    var docs = fileStates;

    if(_item !== null && _name !== null){
      docs = { [_name]: _item };
    }

    axios
      .post(`${currentUrl}/api/sendfilesupload/`, { file_states: docs }, { headers, params: { usuario_id: sessionStorage.getItem('usuario_id') } })
      .then((response1) => {

        setBotaoSalvar(true);

        axios
          .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
          .then((response2) => {
            setData2({ ...response2.data });
            setFileStates({});
            console.log(response1);
            setBotaoSalvar(false);

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
      })
      .catch((error) => {
        console.error('Upload failed!', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, contate nosso suporte! suporte@vertecotech.com',
          icon: 'error',
          confirmButtonText: 'OK'
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

  function abrirDocumentoNavegadorDoBanco( guid, mime_type ) {
    axios.get(`${currentUrl}/api/documentdownload/${guid}/`, { headers, params: { project_id: project_id } })
    .then((response) => {

      console.log(response);

      const base64String = response.data.item_data.arquivo_fisico
      const tipoMIME = mime_type;

      // Construa a URL do Data URI
      const dataURI = `data:${tipoMIME || 'application/octet-stream'};base64,${base64String}`;
    
      // Abra a URL em uma nova janela do navegador
      const novaJanela = window.open();
      novaJanela.document.write('<iframe width="100%" height="100%" src="' + dataURI + '"></iframe>');
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  function downloadDocumentoDoBanco( guid, name ) {
    axios.get(`${currentUrl}/api/documentdownload/${guid}/`, { headers, params: { project_id: project_id } })
    .then((response) => {

      console.log(response);

      const base64String = response.data.item_data.arquivo_fisico;
      const fileName = name;

      // Decodifique a string base64 para obter a representação binária do arquivo
      const binaryString = atob(base64String);
    
      // Converta a representação binária para um array de bytes
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
    
      // Crie um Blob (objeto binário) a partir do array de bytes
      const blob = new Blob([bytes], { type: 'application/octet-stream' });
    
      // Crie uma URL temporária para o Blob
      const blobURL = URL.createObjectURL(blob);
    
      // Crie um link de download
      const downloadLink = document.createElement('a');
      downloadLink.href = blobURL;
    
      // Defina apenas o nome padrão do arquivo (o usuário pode alterá-lo ao salvar)
      downloadLink.download = fileName || 'file';
    
      // Adicione o link ao documento
      document.body.appendChild(downloadLink);
    
      // Simule um clique no link para iniciar o download
      downloadLink.click();
    
      // Remova o link do documento após o download
      document.body.removeChild(downloadLink);
    
      // Lembre-se de liberar a URL temporária após o uso para evitar vazamentos de memória
      URL.revokeObjectURL(blobURL);

    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  function cancelarDocumento2(guid) {
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
            .then((response1) => {

              axios
              .get(`${currentUrl}/api/documentmodels2/${modelo_GUID}/data/`, { headers, params: { project_id: project_id } })
              .then((response2) => {
                setData2({ ...response2.data });
                setFileStates({});
                setBotaoSalvar(false);
    
                Swal.fire({
                  title: 'Sucesso!',
                  text: 'Documento cancelado com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                console.log(response1.data);
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
                console.log(response2.data);
                console.log('Controles criados com sucesso:', response1.data);

                if(response1.data.length > 0)
                {
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

    if(!isChecked)
    {
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
            console.log('Controles atualizados com sucesso:', response.data);
  
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
                console.log(response2.data);
                console.log('Dados da tela recarregados com sucesso após a confirmação.');
  
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
    return primeiraQuestao?.file_manager_control?.visible_upload === true;
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

    const requestData = {
      project_id: project_id
    };

    axios
    .post(`${currentUrl}/api/getconfirmeddocumentscount/`, requestData, { headers })
    .then((response) => {
      //console.log(response.data.confirmed_documents_count);
      if(parseInt(response.data.confirmed_documents_count, 10) === 26)
      { setDocConfirmed(true); }
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

  const criarContract = async () => {

    //buscar dados do projeto
    const requestDatainfo = {
      project_id: project_id,
    };

    await axios
    .post(`${currentUrl}/api/getinfoproject/select/`, requestDatainfo, { headers })
    .then(async (response0) => {

      console.log(response0);

      const requestData = {
        project: project_id,
        ProjectName: response0.data.project.title,
        ProjectOwner: response0.data.user.owner_name,
        ProjectCAR: response0.data.project.sicar_code,
        ProjectCnpjCpf: response0.data.user.ProjectCnpjCpf, 
      };

      //const token = sessionStorage.getItem('Authorization');
      //const headers = { Authorization: `Bearer ${token}` };

      await axios
      .post(`${currentUrl}/api/filemanagercontract/insert/`, requestData, { headers })
      .then(async (response1) => {

        console.log(response1);


        //chama criacao dos enderecos blockchain 6 / 14
        const enderecos1 = "x000000000001";
        const enderecos2 = "x000000000002";

        //timer aguardando o retorno com os enderecos
        //fazer busca no blockchain com os enderecos retornados para encontrar o id do contrato
        //inserir levels

        console.log('Chave BD do contrato: ' + response1.data.id, 'project_id: ' + response1.data.project);


        //inserir level 6
        const requestDataLevel6 = {
          project: project_id,
          Contract: response1.data.id,
          Topic: 'aabbccdd-1234-5678-90ab-cdef12345678',
          Level: '6',
          Address: enderecos1
        };

        await axios
          .post(`${currentUrl}/api/filemanagerlevel/insert/`, requestDataLevel6, { headers })
          .then((response2) => {

            console.log(response2);

          })
          .catch((error) => {
            console.error('Erro ao criar o level 6:', error);
            return false;
          });


        //inserir level 14
        const requestDataLevel14 = {
          project: project_id,
          Contract: response1.data.id,
          Topic: '08d887a1-1b5e-483d-bd86-6c3f8752bd3a',
          Level: '14',
          Address: enderecos2
        };

        await axios
          .post(`${currentUrl}/api/filemanagerlevel/insert/`, requestDataLevel14, { headers })
          .then((response3) => {

            console.log(response3);

          })
          .catch((error) => {
            console.error('Erro ao criar o level 14:', error);
            return false;
          });          

      })
      .catch((error) => {
        console.error('Erro ao criar o contrato:', error);
        //atualiza o registro criado do contrato "file_manager_contract", com response e marca is_error = true
        return false;
      });

      recarregarTela();      

    })
    .catch((error) => {
      console.error('Erro ao buscar info project:', error);
      return false;
    });

  };  

  const startContract = async () => {

    //inserir documentos/nfts no blockchan das 
    //etapas/levels que foram iniciadas

    const requestData = {
      project_id: project_id
    };

    await axios
    .post(`${currentUrl}/api/filemanagernftetapa1/`, requestData, { headers })
    .then((response) => {

      console.log(response);

    })
    .catch((error) => {
      console.error('Erro ao selecionar os levels:', error);
      return false;
    }); 

  };

  return (
    <div className="uploads-save" style={{ position: 'absolute', top: '0px', left: '-100px' }}>
      <div style={styles.formContainer}>

        <h2>{tela_name}</h2>

        <div>blockchain</div>

        <div>
          <ConnectButton/>
        </div>

        <div style={{ float: 'left', height: '25px', width: '300px' }}>
          <div style={{ float: 'left', height: '25px', width: '120px' }}>
            <button onClick={() => criarContract()}>Criar contract</button>              
          </div>
          <div style={{ float: 'left', height: '25px', width: '120px' }}>
            <button onClick={() => startContract()}>Iniciar contract</button>              
          </div>     
        </div>

        {((verificarDocsConfirmados() && !getContract() &&
          (
            <div></div>
          )
        ))}

        <ProgressBar data={data2} />

        <div style={{ float: 'left', width: '900px' }}>
          {Object.keys(data2).map((topic) => (
            <div key={topic} className="collapsible">
              <ListItemDiv style={{ backgroundColor: 'rgb(235,235,235)', width: '800px' }}>
                <div style={{ cursor: 'pointer', float: 'left', marginLeft: '10px', width: '20px', height: '20px' }} className="header" onClick={() => toggleTopic(topic)}>
                  {expandedTopics.includes(topic) ? ` - ` : ` + `}
                </div>
                <div style={{ width: '900px', height: '20px' }}>
                  <div style={{ float: 'left', width: '35px' }}>{data2[topic].titulo ? `${topic}) ` : ``}</div>
                  <div style={{ float: 'left', width: '205px' }}>{data2[topic].titulo ? <ProgressBar2 data={data2} __topico={[topic]} /> : ``}</div>
                  <div style={{ float: 'left', minWidth: '420px', height: '35px', fontSize: '10pt' }}>{data2[topic].titulo ? `${data2[topic].titulo.label}` : ``}</div>
                 
                  {
                    (confirmacao_doc ?
                    (((topic === '01' && !verificarUploadVisivel(data2, '01')) ||
                    (topic !== '01' && contarDocumentNamePreenchidos(data2, '01') === TopicoCount(data2, '01') 
                    && (contarDocumentOkTrue(data2, '01') === TopicoCount(data2, '01') && getContract() && verificarDocsConfirmados() || !confirmacao_doc)
                    && verificarUploadVisivel(data2, '01') 
                    && !verificarUploadVisivel(data2, topic))) ?
                      (<div style={{ float: 'left', width: '50px', marginTop: '-3px' }}>
                        <StyledButtonIniciarEtapa onClick={() => handleIniciarEtapa(data2[topic].titulo.id)}>Iniciar {topic}</StyledButtonIniciarEtapa>
                      </div>)
                    : 
                      ((contarDocumentNamePreenchidos(data2, '01') === TopicoCount(data2, '01') 
                      && (contarDocumentOkTrue(data2, '01') === TopicoCount(data2, '01') && getContract() && verificarDocsConfirmados() || !confirmacao_doc) || 
                      (topic === '01' && verificarUploadVisivel(data2, '01'))) &&
                        (<div style={{ float: 'left', width: '50px', marginTop: '-3px' }}>
                          <StyledButtonIniciado onClick={() => handleEtapaIniciada(topic)}>Iniciado</StyledButtonIniciado>
                        </div>)))
                    :
                      getContract() && verificarDocsConfirmados() && !verificarUploadVisivel(data2, topic) ?
                        (<div style={{ float: 'left', width: '50px', marginTop: '-3px' }}>
                          <StyledButtonIniciarEtapa onClick={() => handleIniciarEtapa(data2[topic].titulo.id)}>Iniciar {topic}</StyledButtonIniciarEtapa>
                        </div>)
                        :
                        (getContract() && verificarDocsConfirmados() &&
                        (<div style={{ float: 'left', width: '50px', marginTop: '-3px' }}>
                          <StyledButtonIniciado onClick={() => handleEtapaIniciada(topic)}>Iniciado</StyledButtonIniciado>
                        </div>))
                    )
                  }

                </div>
              </ListItemDiv>
              {expandedTopics.includes(topic) && (
                <div className="content">
                  <ul style={{ fontSize: '8pt', listStyleType: 'none' }}>
                    {data2[topic].questoes.map((item) => (
                      <li key={item.questao}>
                        <ListItemDiv style={{ width: '750px' }}>
                          <div style={{ float: 'left', marginLeft: '30px', marginTop: '5px', width: '380px', minHeight: '20px', paddingBottom: '5px' }}>
                            <strong style={{ color: 'black', fontSize: '8pt' }}>{topic}.{item.questao})</strong> {item.label} { item.document_name ? 
                            <div style={{ cursor: 'pointer' }} onClick={() => abrirDocumentoNavegadorDoBanco(item.document_guid, item.mime_type)}>
                              <b style={{ color: 'blue' }}>(Documento: {item.document_name})</b>
                            </div> : "" }
                          </div>
                          {(
                            <div style={{ float: 'left', width: '300px', height: '20px', marginLeft: '50px' }}>
                              
                              {item.file_manager_control.visible_upload && 
                              (<div style={{ float: 'left', marginLeft: '10px', width: '60px' }}>
                                {fileStates[item.fileNameFile] ? (
                                  <div style={{ float: 'left', width: '60px', height: '25px' }}>
                                    <div style={{ float: 'left', width: '25px' }}>
                                      <FUSalvarButton disabled={isBotaoSalvar} handleUpload={() => handleUpload(fileStates[item.fileNameFile], item.fileNameFile)} nome_arquivo={item.fileNameFile}/>
                                    </div>
                                    <div style={{ float: 'left', width: '25px', marginLeft: '5px' }}>
                                      <FUDeleteButton switchField={() => switchField(item.fileNameFile)} nome_arquivo={item.fileNameFile}/>
                                    </div>
                                  </div>
                                ) : (
                                  <FileUploadComponent item={item} handleFileChange={(e) => handleFileChange(e, item.fileNameFile, item.modelo_item_id)} />
                                )}
                              </div>)}

                              {item.file_manager_control.visible_logs &&
                              (<div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                                { item.log.length > 0 ? <StyledButtonLogs onClick={() => mostrarLogs( item.log )}>Logs</StyledButtonLogs> : ''}
                              </div>)}

                              {item.file_manager_control.visible_cancel &&
                              (<div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                                { item.document_name ? <StyledButtonCancelar onClick={() => cancelarDocumento2( item.document_guid )}>Cancelar</StyledButtonCancelar> : ''}
                              </div>)}

                              {item.file_manager_control.visible_download &&
                              (<div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                                { item.document_name ? <StyledButtonDownload onClick={() => downloadDocumentoDoBanco( item.document_guid, item.document_name )}>Download</StyledButtonDownload> : ''}
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

        <ContainerNewButton style={{ backgroundColor: 'white' }}>
          <div style={{ float: 'left', 
                        backgroundColor: 'lightgrey',
                        height: '50px',
                        borderRadius: '100px 0px 0px 100px',
                        width: '180px'
                      }}>
              <StyledButtonSalvar style={{ float: 'left', marginTop: '12px', marginLeft: '20px', color: isBotaoSalvar ? 'white' : '' }} 
                disabled={isBotaoSalvar}
                type="button" onClick={() => handleUpload()}>
                Salvar
              </StyledButtonSalvar>
          </div>
          <small style={{ float: 'left', width: '80px', color: 'green', display: isBotaoSalvar ? true : 'none' }} >Salvando...</small>
        </ContainerNewButton>
      </div>
    </div>
  );
};

export default FileUploadBlockchain;
