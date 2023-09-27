import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './styles';
import Swal from 'sweetalert2';

const ButtonDelete = ({ name, apiUrl, project_id, card_name }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleButtonClick = async () => {

    setIsLoading(true);

    try {

      const token = sessionStorage.getItem('Authorization');
      const headers = { Authorization: `Bearer ${token}` };

      // Faça a chamada à API usando a URL passada como prop apiUrl
      const response = await axios.delete(`${apiUrl}/${project_id}/${card_name}`, { headers });

      // Lide com a resposta da API conforme necessário
      console.log('Resposta da API:', response.data);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Card excluído com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Define qualquer lógica adicional que você deseja executar após o sucesso da chamada
      // Por exemplo, exibir uma mensagem de sucesso, redirecionar o usuário, etc.
    } catch (error) {
      // Lide com os erros da API aqui
      console.error('Erro na chamada da API:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Card não encontrado, contate nosso suporte! suporte@vertecotech.com',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? 'Aguarde...' : name}
      </Button>
    </div>
  );
};

export default ButtonDelete;