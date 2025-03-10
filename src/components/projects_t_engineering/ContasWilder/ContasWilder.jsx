import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import { currentUrl } from '../../../constants/global';
import { StyledButtonContas, StyledButton, Card, CardHeader, CardContent, CardTitle } from './styles';
import styled from 'styled-components';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import LoadingBar from './LoadingBar';
import LoadingBar2 from './LoadingBar2';


const ContasWilder = () => {
  const token = sessionStorage.getItem('Authorization');
  const headers = { Authorization: `Bearer ${token}` };
  const [user_session, setUserSession] = useState('');
  const [bearer_token, setBearerToken] = useState('');
  const [accounts_data, setAccountsData] = useState(null); // Estado para armazenar dados das contas
  const totalFiles = 5; // Total de arquivos para carregar
  const [filledFiles, setFilledFiles] = useState(0);
  const loadingBarRef = useRef();


  useEffect(() => {
    LoadDataWilderDB();
  }, []);

  const LoadDataWilderDB = async () => {
    try {
      const response = await axios.patch(
        `${currentUrl}/api/social_carbon/account_list_view/`,
        { json: 1 },
        { headers }
      );
      setAccountsData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
  };  

  const showAsset = async (account_address) => {
    try {
      // Busca os assets
      const response = await axios.patch(
        `${currentUrl}/api/social_carbon/get_assets/`,
        { account_id: account_address },
        { headers }
      );
      const assets = response.data.assets;
  
      if (assets.length > 0) {
        const asset = assets[0]; 
  
        // Criar uma div para exibir os detalhes do asset
        const assetContainer = document.createElement('div');
        assetContainer.style.margin = '20px'; // Ajustar as margens conforme necessário
        assetContainer.style.border = '1px solid #ddd'; // Adicionando borda à div
        assetContainer.style.borderRadius = '5px'; // Adicionando borda arredondada
        assetContainer.style.fontSize = '8pt';
        assetContainer.style.textAlign = 'left';
        assetContainer.style.width = '550px';
        assetContainer.style.height = '230px';
  
        // Adicionar os detalhes do asset à div
        for (const key in asset) {
          if (asset.hasOwnProperty(key)) {
            const label = document.createElement('label');
            label.innerText = `${key}: `;
            const value = document.createElement('span');
            value.innerText = asset[key];
  
            // Adicionar label e valor à assetContainer
            assetContainer.appendChild(label);
            assetContainer.appendChild(value);
  
            // Adicionar quebra de linha entre os campos
            const lineBreak = document.createElement('br');
            assetContainer.appendChild(lineBreak);
          }
        }
  
        // Exibir a div dentro do Swal.fire
        Swal.fire({
          title: 'Detalhes do Asset',
          html: assetContainer.outerHTML, // Converte a div para uma string HTML
          showCloseButton: true,
          showConfirmButton: false,
          width: 650,
          height: 250
        });
      } else {
        console.log('Nenhum asset encontrado.');
        Swal.fire({
          title: 'Nenhum asset encontrado',
          text: 'Não foram encontrados assets para esta conta.',
          icon: 'info',
          showCloseButton: true,
          showConfirmButton: true
        });
      }
    } catch (error) {
      console.error('Erro ao buscar assets:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao buscar os assets.',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: true
      });
    }
  };

  const showProject = async (account_address) => {
    try {
      // Buscar detalhes do projeto
      const projectResponse = await axios.patch(
        `${currentUrl}/api/social_carbon/project_list_view/`,
        { account_id: account_address },
        { headers }
      );
  
      //console.log(projectResponse.data.projects);
      const projects = projectResponse.data.projects;
  
      // Criar uma div para exibir os detalhes do projeto
      const projectContainer = document.createElement('div');
      projectContainer.style.margin = '20px'; // Ajustar as margens conforme necessário
      projectContainer.style.border = '1px solid #ddd'; // Adicionando borda à div
      projectContainer.style.borderRadius = '5px'; // Adicionando borda arredondada
      projectContainer.style.fontSize = '8pt';
      projectContainer.style.textAlign = 'left';
      projectContainer.style.width = '550px';
      projectContainer.style.height = '400px';
  
      // Iterar sobre cada projeto e adicionar os detalhes à div
      if (projects.length > 0) {
        projects.forEach(project => {
          for (const key in project) {
            if (project.hasOwnProperty(key)) {
              const label = document.createElement('label');
              label.innerText = `${key}: `;
              const value = document.createElement('span');
              value.innerText = project[key];
    
              // Adicionar label e valor à projectContainer
              projectContainer.appendChild(label);
              projectContainer.appendChild(value);
    
              // Adicionar quebra de linha entre os campos
              const lineBreak = document.createElement('br');
              projectContainer.appendChild(lineBreak);
            }
          }
    
          // Adicionar uma quebra de linha entre os projetos
          const lineBreak = document.createElement('br');
          projectContainer.appendChild(lineBreak);
        });
    
        // Exibir a div dentro do Swal.fire
        Swal.fire({
          title: 'Detalhes do Projeto',
          html: projectContainer.outerHTML, // Converte a div para uma string HTML
          showCloseButton: true,
          showConfirmButton: false,
          width: 650,
          height: 250
        });
      } else {
        console.log('Nenhum projeto encontrado.');
        Swal.fire({
          title: 'Nenhum projeto encontrado',
          text: 'Não foram encontrados projetos para esta conta.',
          icon: 'info',
          showCloseButton: true,
          showConfirmButton: true
        });
      }

    } catch (error) {
      console.error('Erro ao buscar detalhes do projeto:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao buscar os detalhes do projeto.',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: true
      });
    }
  };
  const showRetirements = async (account_address) => {
    try {
      // Buscar detalhes das aposentadorias
      const retirementResponse = await axios.patch(
        `${currentUrl}/api/social_carbon/retirement_list_view/`,
        { account_id: account_address },
        { headers }
      );
  
      //console.log(retirementResponse.data);
      const projects = retirementResponse.data.projects;
  
      // Criar uma div para exibir os detalhes das aposentadorias
      const retirementContainer = document.createElement('div');
      retirementContainer.style.margin = '20px'; // Ajustar as margens conforme necessário
      retirementContainer.style.border = '1px solid #ddd'; // Adicionando borda à div
      retirementContainer.style.borderRadius = '5px'; // Adicionando borda arredondada
      retirementContainer.style.fontSize = '8pt';
      retirementContainer.style.textAlign = 'left';
      retirementContainer.style.width = '550px';
      retirementContainer.style.minHeight = '400px';
  
      // Iterar sobre cada projeto e adicionar os detalhes das aposentadorias à div
      if (projects.length > 0) {
        projects.forEach(project => {
          const retirements = project.retirements;

          //console.log(retirements);

          if (retirements && retirements.length > 0) {
            retirements.forEach(retirement => {
              for (const key in retirement) {
                if (retirement.hasOwnProperty(key)) {
                  const label = document.createElement('label');
                  label.innerText = `${key}: `;
                  const value = document.createElement('span');
                  value.innerText = retirement[key];
  
                  // Adicionar label e valor à retirementContainer
                  retirementContainer.appendChild(label);
                  retirementContainer.appendChild(value);
  
                  // Adicionar quebra de linha entre os campos
                  const lineBreak = document.createElement('br');
                  retirementContainer.appendChild(lineBreak);
                }
              }
  
              // Adicionar uma quebra de linha entre as aposentadorias
              const lineBreak = document.createElement('br');
              retirementContainer.appendChild(lineBreak);
            });

            // Exibir a div dentro do Swal.fire
            Swal.fire({
              title: 'Detalhes das Aposentadorias',
              html: retirementContainer.outerHTML, // Converte a div para uma string HTML
              showCloseButton: true,
              showConfirmButton: false,
              width: 650,
              height: 250
            });
          } else {
            console.log('Nenhuma aposentadoria encontrada.');
            Swal.fire({
              title: 'Nenhuma aposentadoria encontrada',
              text: 'Não foram encontradas aposentadorias para esta conta.',
              icon: 'info',
              showCloseButton: true,
              showConfirmButton: true
            });
          }
        });
      } else {
        console.log('Nenhum projeto encontrado.');
        Swal.fire({
          title: 'Nenhum projeto encontrado',
          text: 'Não foram encontrados projetos para esta conta.',
          icon: 'info',
          showCloseButton: true,
          showConfirmButton: true
        });
      }
  
    } catch (error) {
      console.error('Erro ao buscar detalhes das aposentadorias:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao buscar os detalhes das aposentadorias.',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: true
      });
    }
  };
  
  const showRetirementForm = (_credit_name, _balance, updateProgress) => {
    if (_balance <= 0) {
        Swal.fire({
            title: 'Sem Créditos',
            text: 'Nenhum crédito encontrado para ser aposentado.',
            icon: 'info',
            showCloseButton: true,
            showConfirmButton: true
        });
        return;
    }


    const formContainer = document.createElement('div');
    formContainer.style.margin = '20px';
    formContainer.style.border = '1px solid #ddd';
    formContainer.style.borderRadius = '5px';
    formContainer.style.fontSize = '8pt';
    formContainer.style.textAlign = 'left';
    formContainer.style.width = '400px';
    formContainer.style.minHeight = '330px';

    formContainer.innerHTML = `
      <div style="float:left;">
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">
            <label>Credit Name:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">
            <input id="credit-name" placeholder="Enter credit name" value="${_credit_name}">
          </div>
        </div>      
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">
            <label>Quantity to retire:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">
            <input id="quantity-to-retire" placeholder="Enter quantity to retire" type="number">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">
            <label>Beneficiary:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">            
            <input id="beneficiary" placeholder="Enter beneficiary name">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">    
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">      
            <label>Purpose:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">               
            <input id="purpose" placeholder="Enter purpose of retirement">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">      
            <label>Wilder User:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">               
            <input id="wilder_user" placeholder="wilder user" value="jardini@vertecotech.com">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">
            <label>Password:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">             
            <input id="password" placeholder="Enter password" type="password" value="Demo123!">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">
          <div style="float:left; width: 120px; height: 50px; padding: 10px;">
            <label>Pin:</label>
          </div>
          <div style="float:left; width: 200px; height: 50px; padding: 8px;">                  
            <input id="pin" placeholder="Enter pin" type="password" value="1234">
          </div>
        </div>
        <div style="float:left; width: 400px; height: 50px;">
          <label>
              <input id="confirmation" type="checkbox"> I confirm that I would like to retire these assets
          </label>
        </div>          
      </div>
    `;

    Swal.fire({
        title: 'Retirement Request',
        html: formContainer.outerHTML,
        focusConfirm: false,
        width: 500,
        minHeight: 250,
        preConfirm: () => {
            const popup = Swal.getPopup();

            const credit_name = popup.querySelector('#credit-name').value;
            const quantityToRetire = popup.querySelector('#quantity-to-retire').value;
            const beneficiary = popup.querySelector('#beneficiary').value;
            const purpose = popup.querySelector('#purpose').value;
            const wilder_user = popup.querySelector('#wilder_user').value;
            const password = popup.querySelector('#password').value;
            const pin = popup.querySelector('#pin').value;
            const confirmation = popup.querySelector('#confirmation').checked;

            if (!credit_name || !quantityToRetire || !beneficiary || !purpose || !wilder_user || !password || !pin || !confirmation) {
                Swal.showValidationMessage('Please fill out all fields and confirm the retirement.');
                return false;
            }

            return {
                credit_name,
                quantityToRetire,
                beneficiary,
                purpose,
                wilder_user,
                password,
                pin,
                confirmation
            };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const startTime = new Date().getTime();

            try {
                const totalSteps = 6; // Total de etapas
                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

                // parte 1
                const part1StartTime = new Date().getTime();
                console.log('1: authentication bearer token (start)');
                updateProgress(0, totalSteps, 'Autenticação de token iniciada');
                const getBearerToken = await axios.patch(
                    `${currentUrl}/api/social_carbon/get_authenticate/`,
                    {
                        wilder_user: result.value.wilder_user,
                        password: result.value.password,
                        pin: result.value.pin,
                    },
                    { headers }
                );
                const bearer_token = getBearerToken.data.success.response.token;
                const part1EndTime = new Date().getTime();
                console.log(`2: authentication bearer token (finish) - Time: ${part1EndTime - part1StartTime}ms`);
                updateProgress(1, totalSteps, `Autenticação de token concluída - time: ${part1EndTime - part1StartTime}ms`);

                await delay(2000);

                // parte 2
                const part2StartTime = new Date().getTime();
                console.log('3: exec retirement credit (start)');
                updateProgress(1, totalSteps, 'Execução de aposentadoria iniciada');
                const setRetirementResponse = await axios.patch(
                    `${currentUrl}/api/social_carbon/set_retirement/`,
                    {
                        credit_name: result.value.credit_name,
                        quantity: result.value.quantityToRetire,
                        beneficiary: result.value.beneficiary,
                        purpose: result.value.purpose,
                        wilder_user: result.value.wilder_user,
                        password: result.value.password,
                        pin: result.value.pin,
                        confirmation: result.value.confirmation,
                        bearer_token: bearer_token,
                    },
                    { headers }
                );
                const part2EndTime = new Date().getTime();
                console.log(`4: exec retirement credit (finish) - Time: ${part2EndTime - part2StartTime}ms`);
                updateProgress(2, totalSteps, `Execução de aposentadoria concluída - time: ${part2EndTime - part2StartTime}ms`);

                await delay(2000);

                // parte 3
                const part3StartTime = new Date().getTime();
                console.log('5: get user session (start)');
                updateProgress(2, totalSteps, 'Sessão do usuário iniciada');
                const response1 = await axios.patch(
                    `${currentUrl}/api/social_carbon/wilder/get_user_session/1/`,
                    { username: "jardini@vertecotech.com", password: "Demo123!", pin: "1234" },
                    { headers }
                );
                const userSession = response1.data.success.response.session;
                const part3EndTime = new Date().getTime();
                console.log(`6: get user session (finish) - Time: ${part3EndTime - part3StartTime}ms`);
                updateProgress(3, totalSteps, `Sessão do usuário obtida - time: ${part3EndTime - part3StartTime}ms`);

                await delay(2000);

                // parte 4
                const part4StartTime = new Date().getTime();
                console.log('7: get update accounts (start)');
                updateProgress(3, totalSteps, 'Atualização de contas iniciada');
                const response2 = await axios.patch(
                    `${currentUrl}/api/social_carbon/wilder/get_accounts/1/`,
                    { user_session: userSession },
                    { headers }
                );
                const accountsData = response2.data;
                const part4EndTime = new Date().getTime();
                console.log(`8: get update accounts (finish) - Time: ${part4EndTime - part4StartTime}ms`);
                updateProgress(4, totalSteps, `Contas atualizadas - time: ${part4EndTime - part4StartTime}ms`);

                await delay(2000);

                // parte 5
                const part5StartTime = new Date().getTime();
                console.log('9: export update accounts (start)');
                updateProgress(4, totalSteps, 'Exportação de contas iniciada');
                const response3 = await axios.patch(
                    `${currentUrl}/api/social_carbon/export_data_assets/`,
                    { json_response: accountsData },
                    { headers }
                );
                const part5EndTime = new Date().getTime();
                console.log(`10: export update accounts (finish) - Time: ${part5EndTime - part5StartTime}ms`);
                updateProgress(5, totalSteps, `Contas exportadas - time: ${part5EndTime - part5StartTime}ms`);

                await delay(2000);

                // parte 6
                const part6StartTime = new Date().getTime();
                console.log('11: update info screen (start)');
                updateProgress(5, totalSteps, 'Atualização da tela iniciada');
                const response4 = await axios.patch(
                    `${currentUrl}/api/social_carbon/account_list_view/`,
                    { json: 1 },
                    { headers }
                );
                setAccountsData(response4.data);
                const part6EndTime = new Date().getTime();
                console.log(`12: update info screen (finish) - Time: ${part6EndTime - part6StartTime}ms`);
                updateProgress(6, totalSteps, `Tela de informações atualizada - time: ${part6EndTime - part6StartTime}ms`);

                await delay(2000);

                const endTime = new Date().getTime();
                console.log(`Total execution time: ${endTime - startTime}ms`);
                updateProgress(6, totalSteps, `Total execution time: ${endTime - startTime}ms`);

                await delay(4000);

            } catch (error) {
                console.error('Erro ao fazer baixa do crédito:', error);
            }
        }
    });
  };


  const Accounts = ({ data }) => {
    const initialProgress = data.accounts.map(() => 0); // Inicializa o progresso de cada conta
    const initialProgressText = data.accounts.map(() => ''); // Inicializa o texto de progresso de cada conta
    const [progress, setProgress] = useState(initialProgress);
    const [progressText, setProgressText] = useState(initialProgressText);

    const refs = useRef(data.accounts.map(() => React.createRef()));

    const updateProgress = (index, step, totalSteps, stepDescription) => {
        const newProgress = [...progress];
        const newProgressText = [...progressText];
        newProgress[index] = (step / totalSteps) * 100;
        //newProgressText[index] = stepDescription;
        newProgressText[index] += (newProgressText[index] ? '\n' : '') + stepDescription;
        setProgress(newProgress);
        setProgressText(newProgressText);
        refs.current[index].current.updatePercentage((step / totalSteps) * 100, stepDescription);
    };

    return (
        <div>
            {data.accounts.map((account, index) => (
                <Card key={account.address}>
                    <div style={{ minHeight: '200px' }}>
                        <CardHeader>Account: {account.address}</CardHeader>
                        <CardContent>Balance: {account.balance}</CardContent>
                        <CardContent>Created: {formatDate(account.created)}</CardContent>
                        <CardContent>Modified: {formatDate(account.modified)}</CardContent>
                        <CardContent>Owner: {account.owner}</CardContent>
                        <CardContent>Ticker: {account.ticker}</CardContent>
                        <CardContent>Total: {account.total}</CardContent>
                        <CardContent>Type: {account.type}</CardContent>
                        <CardContent>Version: {account.version}</CardContent>
                    </div>
                    <div style={{ minHeight: '90px' }}>
                        <StyledButton onClick={() => showAsset(account.address)}>asset</StyledButton>
                        <StyledButton onClick={() => showProject(account.address)}>project</StyledButton>
                        <StyledButton onClick={() => showRetirements(account.address)}>retirement</StyledButton>
                        <StyledButton onClick={() => showRetirementForm(account.ticker, account.balance, (step, totalSteps, stepDescription) => updateProgress(index, step, totalSteps, stepDescription))}>retire credit</StyledButton>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <LoadingBar2 ref={refs.current[index]} totalFiles={100} progressText={progressText[index]} />           
                    </div>
                </Card>
            ))}
        </div>
    );
  };


  const LoadingBar2 = React.forwardRef(({ totalFiles, progressText }, ref) => {
    const [percentage, setPercentage] = useState(0);
    const [statusText, setStatusText] = useState(progressText || '');

    useImperativeHandle(ref, () => ({
        updatePercentage(newPercentage, newText) {
            setPercentage(newPercentage);
            setStatusText(newText || '');
        }
    }));

    return (
        <div>
            <div style={{ width: '100%', backgroundColor: '#ccc' }}>
                <div style={{ width: `${percentage}%`, backgroundColor: '#4caf50', textAlign: 'center', color: 'white' }}>
                    {percentage}%
                </div>
            </div>
            <div style={{ textAlign: 'left', marginTop: '10px', fontSize: '8pt' }}>
                {statusText}
            </div>
        </div>
    );
  });

  
  return (
    <div>
      <h2>Contas Wilder (Social Carbon)</h2>
      {accounts_data && <Accounts data={accounts_data} />}
    </div>
  );
};

export default ContasWilder;
