import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../../src/constants/global';
import { ContainerNewButton, StyledButtonCancelar, StyledButtonDownload, StyledButtonLogs, ListItemDiv, StyledButtonSalvar } from '../../projects_t_engineering/styles';
import FileUploadComponent from './FileUploadComponent';
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import ProgressBar2 from './ProgressBar2';
import { v4 as uuidv4 } from 'uuid';

/* NÃO ESTÁ SENDO USADO */

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

const FileUpload = ({ project_id, tela_name, modelo_GUID }) => {
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
          path: `environmental_engineering/${guid}.${ext}`,
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

  const handleUpload = () => {

    axios
      .post(`${currentUrl}/api/sendfilesupload/`, { file_states: fileStates }, { headers, params: { usuario_id: sessionStorage.getItem('usuario_id') } })
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

  return (
    <div className="uploads-save" style={{ position: 'absolute', top: '0px', left: '-100px' }}>
      <div style={styles.formContainer}>

        <h2>{tela_name}</h2>
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
                  <div style={{ float: 'left', width: '600px', height: '35px', fontSize: '10pt' }}>{data2[topic].titulo ? `${data2[topic].titulo.label}` : ``}</div>
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
                          <div style={{ float: 'left', width: '300px', height: '20px', marginLeft: '50px' }}>
                            <div style={{ float: 'left', marginLeft: '10px', width: '60px' }}>
                              {fileStates[item.fileNameFile] ? (
                                <small style={{ color: 'green' }} onClick={() => switchField(item.fileNameFile)}>Arquivo consolidado</small>
                              ) : (
                                <FileUploadComponent item={item} handleFileChange={(e) => handleFileChange(e, item.fileNameFile, item.modelo_item_id)} />
                              )}
                            </div>
                            <div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                              { item.log.length > 0 ? <StyledButtonLogs onClick={() => mostrarLogs( item.log )}>Logs</StyledButtonLogs> : ''}
                            </div>
                            <div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                              { item.document_name ? <StyledButtonCancelar onClick={() => cancelarDocumento2( item.document_guid )}>Cancelar</StyledButtonCancelar> : ''}
                            </div>                            
                            <div style={{ float: 'left', marginLeft: '5px', width: '60px' }}>
                              { item.document_name ? <StyledButtonDownload onClick={() => downloadDocumentoDoBanco( item.document_guid, item.document_name )}>Download</StyledButtonDownload> : ''}
                            </div>                         
                          </div>
                        </ListItemDiv>
                      </li>
                    ))}
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
                type="button" onClick={handleUpload}>
                Salvar
              </StyledButtonSalvar>              
          </div>
          <small style={{ float: 'left', width: '80px', color: 'green', display: isBotaoSalvar ? true : 'none' }} >Salvando...</small>
        </ContainerNewButton>
      </div>
    </div>
  );
};

export default FileUpload;
