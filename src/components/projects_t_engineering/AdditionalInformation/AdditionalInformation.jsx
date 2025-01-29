import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentUrl } from '../../../../src/constants/global';
import styled from 'styled-components';
import { StyledButtonSalvar } from '../styles';

const styles = {
  formContainer: {
    position: 'absolute',
    width: '722px',
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

export const Input = styled.input`
  margin-bottom: 5px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  width: 400px;
  background: rgba(245, 245, 245, 0.2); 
  margin-top: 5px;

  &:focus {
    border-color: #007bff;
  }
`;

const Label = styled.label`
  --margin-bottom: 10px;
  --font-weight: 700;
  font-size: 10pt;
  color: rgb(54, 54, 54);
`;

const AdditionalInformation = ({ project_id, matchObjectId }) => {
  const [fileStates, setFileStates] = useState({
    metodologia: '',
    tipo_de_projeto: '',
    tipo_de_ativo: '',
    data_de_emissao: '',
    additional_information: '',
    responsavel_projeto: '',
    duracao_projeto: '',
    certificadora: '',
  });

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${currentUrl}/api/engineering/${matchObjectId}/`, { headers })
      .then((response) => {
        setFileStates(prevState => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [matchObjectId]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('project', project_id);

    if (fileStates.metodologia) {
      formData.append('metodologia', fileStates.metodologia);
    }
    if (fileStates.tipo_de_projeto) {
      formData.append('tipo_de_projeto', fileStates.tipo_de_projeto);
    }
    if (fileStates.tipo_de_ativo) {
      formData.append('tipo_de_ativo', fileStates.tipo_de_ativo);
    }
    if (fileStates.data_de_emissao) {
      formData.append('data_de_emissao', fileStates.data_de_emissao);
    }
    if (fileStates.additional_information) {
      formData.append('additional_information', fileStates.additional_information);
    }
    if (fileStates.responsavel_projeto) {
      formData.append('responsavel_projeto', fileStates.responsavel_projeto);
    }
    if (fileStates.duracao_projeto) {
      formData.append('duracao_projeto', fileStates.duracao_projeto);
    }
    if (fileStates.certificadora) {
      formData.append('certificadora', fileStates.certificadora);
    }

    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(`${currentUrl}/api/engineering/${matchObjectId}/update/`, formData, { headers })
      .then((response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seus arquivos foram enviados com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
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


  return (
    <div>
      <div>
        <h2>Informações PDD</h2>
        <div>
          <Label htmlFor="metodologia">
            Metodologia
          </Label>
          <div>
            <Input
              type="text"
              id="metodologia"
              name="metodologia"
              value={fileStates.metodologia}
              onChange={(e) => setFileStates({ ...fileStates, metodologia: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tipo_de_projeto">
            Tipo de Projeto
          </Label>
          <div>
            <Input
              type="text"
              id="tipo_de_projeto"
              name="tipo_de_projeto"
              value={fileStates.tipo_de_projeto}
              onChange={(e) => setFileStates({ ...fileStates, tipo_de_projeto: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tipo_de_ativo">
            Tipo de Ativo
          </Label>
          <div>
            <Input
              type="text"
              id="tipo_de_ativo"
              name="tipo_de_ativo"
              value={fileStates.tipo_de_ativo}
              onChange={(e) => setFileStates({ ...fileStates, tipo_de_ativo: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="data_de_emissao">
            Data de Emissão
          </Label>
          <div>
            <Input
              type="text"
              id="data_de_emissao"
              name="data_de_emissao"
              value={fileStates.data_de_emissao}
              onChange={(e) => setFileStates({ ...fileStates, data_de_emissao: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="additional_information">
            Informações adicionais
          </Label>
          <div>
            <Input
              type="text"
              id="additional_information"
              name="additional_information"
              value={fileStates.additional_information}
              onChange={(e) => setFileStates({ ...fileStates, additional_information: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="responsavel_projeto">
            Responsável do Projeto
          </Label>
          <div>
            <Input
              type="text"
              id="responsavel_projeto"
              name="responsavel_projeto"
              value={fileStates.responsavel_projeto}
              onChange={(e) => setFileStates({ ...fileStates, responsavel_projeto: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="duracao_projeto">
            Duração do Projeto
          </Label>
          <div>
            <Input
              type="text"
              id="duracao_projeto"
              name="duracao_projeto"
              value={fileStates.duracao_projeto}
              onChange={(e) => setFileStates({ ...fileStates, duracao_projeto: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="certificadora">
            Certificadora
          </Label>
          <div>
            <Input
              type="text"
              id="certificadora"
              name="certificadora"
              value={fileStates.certificadora}
              onChange={(e) => setFileStates({ ...fileStates, certificadora: e.target.value })}
            />
          </div>
        </div>

        <div style={{ paddingBottom: '35px' }}>
          <StyledButtonSalvar style={{ marginTop: '15px' }} type="button" onClick={handleUpload}>
            Salvar
          </StyledButtonSalvar>
        </div>

      </div>
    </div>
  );
};

export default AdditionalInformation;
