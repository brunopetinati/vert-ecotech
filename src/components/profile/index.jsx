import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Banco from '../bank';
import { StyledButton } from '../default_button/styles';
import { ProfileContainerInfo, IndexContainer, Row, Label, ShowInput } from './styles';
import { handleCepChange } from '../../api/requests/cep';
import { currentUrl } from '../../constants/global';
import { motion } from 'framer-motion';
import { userUpdater } from '../../store/modules/login/actions';
import Swal from 'sweetalert2';

const Profile = () => {
  const dispatch = useDispatch();

  const [showModalBanco, setShowModalBanco] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const [userUpdate, setUserUpdate] = useState({
    id: user.id || '',
    full_name: user.full_name || '',
    rg: user.rg || '',
    cpf: user.cpf || '',
    phone: user.phone || '',
    email: user.email || '',
    user_type: user.user_type || '',
    cep: user.cep || '',
    cnpj: user.cnpj || '',
    street: user.street || '',
    number: user.number || '',
    complement: user.complement || '',
    district: user.district || '',
    state: user.state || '',
    city: user.city || '',
  });

  const handleCepOnForm = async (cep) => {
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length - 1))) {
      const cepObject = await handleCepChange(cep.replace('-', ''));
      setUserUpdate({
        ...userUpdate,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade,
      });
    }
  };

  const handleRegister = () => {
    const token = sessionStorage.getItem('Authorization');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(`${currentUrl}/api/users/${user.id}/update/`, userUpdate, { headers })
      .then((response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sua requisição foi processada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        dispatch(userUpdater(userUpdate));
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao tentar processar sua requisição.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('erro a seguir', error);
        return;
      });
  };

  const collapsed = useSelector((state) => state.sidebar);

  return (
    <IndexContainer collapsed={collapsed}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileContainerInfo collapsed={collapsed}>
          <div
            style={{
              overflowY: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
            }}
          >
            <h3>Meu perfil</h3>
            <Row>
              <Label>Nome completo</Label>
              <ShowInput
                type="text"
                value={userUpdate.full_name}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, full_name: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label>Email</Label>
              <ShowInput
                type="text"
                value={userUpdate.email}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, email: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label>Whatsapp</Label>
              <ShowInput
                type="text"
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, phone: e.target.value })
                }
                mask="(99) 99999-9999"
                maskplaceholder="(21) 98787-5512"
                alwaysShowMask={false}
                value={userUpdate.phone}
              />
            </Row>
            <Row>
              <Label htmlFor="rg">RG:</Label>
              <ShowInput
                type="text"
                id="rg"
                name="rg"
                mask="99.999.999-9"
                maskplaceholder="47.857.659.3"
                alwaysShowMask={false}
                value={userUpdate.rg}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, rg: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="cpf">CPF:</Label>
              <ShowInput
                type="text"
                id="cpf"
                name="cpf"
                mask="999.999.999-99"
                alwaysShowMask={false}
                value={userUpdate.cpf}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, cpf: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="cnpj">CNPJ:</Label>
              <ShowInput
                type="text"
                id="cnpj"
                name="cnpj"
                mask="99.999.999/9999-99"
                alwaysShowMask={false}
                value={userUpdate.cnpj}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, cnpj: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="cep">CEP:</Label>
              <ShowInput
                type="text"
                id="cep"
                name="cep"
                value={userUpdate.cep}
                onChange={(event) => {
                  setUserUpdate({ ...userUpdate, cep: event.target.value });
                  handleCepOnForm(event.target.value);
                }}
                mask="99999-999"
                maskplaceholder="13140-989"
                alwaysShowMask={false}
              />
            </Row>
            <Row>
              <Label htmlFor="rua">Rua:</Label>
              <ShowInput
                type="text"
                id="rua"
                name="rua"
                value={userUpdate.street}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, street: e.target.value })
                }
                disabled
                placeholder="Preencha o CEP para preenchimento automático"
              />
            </Row>
            <Row>
              <Label htmlFor="numero">Número:</Label>
              <ShowInput
                type="text"
                id="numero"
                name="numero"
                value={userUpdate.number}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, number: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="complemento">Complemento:</Label>
              <ShowInput
                type="text"
                id="complemento"
                name="complemento"
                value={userUpdate.complement}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, complement: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="bairro">Bairro:</Label>
              <ShowInput
                type="text"
                id="bairro"
                name="bairro"
                value={userUpdate.district}
                disabled
                placeholder="Preencha o CEP para preenchimento automático"
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, district: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="cidade">Cidade:</Label>
              <ShowInput
                type="text"
                id="cidade"
                name="cidade"
                value={userUpdate.city}
                disabled
                placeholder="Preencha o CEP para preenchimento automático"
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, city: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label htmlFor="uf">UF:</Label>
              <ShowInput
                type="text"
                id="uf"
                name="uf"
                value={userUpdate.state}
                disabled
                placeholder="Preencha o CEP para preenchimento automático"
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, state: e.target.value })
                }
              />
            </Row>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              <StyledButton
                onClick={handleModalBanco}
                style={{ display: 'flex', alignSelf: 'flex-end', margin: '32px 0' }}
              >
                Informações de banco
              </StyledButton>
              <StyledButton
                onClick={handleRegister}
                style={{ display: 'flex', alignSelf: 'flex-end', margin: '32px 32px' }}
              >
                Salvar
              </StyledButton>
            </div>
            {showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />}
          </div>
        </ProfileContainerInfo>
        <p />
      </motion.div>
    </IndexContainer>
  );
};

export default Profile;
