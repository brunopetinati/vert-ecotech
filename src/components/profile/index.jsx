import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Banco from "../bank";
import { StyledButton, StyledButtonSalvar } from "../default_button/styles";
import {
  StyledSelect,
  ProfileContainerInfo,
  IndexContainer,
  Row,
  Label,
  ShowInput,
  ButtonContainer,
  FormContainer,
  LeftColumn,
  RightColumn,
} from "./styles";
import { handleCepChange } from "../../api/requests/cep";
import { currentUrl } from "../../constants/global";
import { motion } from "framer-motion";
import { userUpdater } from "../../store/modules/login/actions";
import Swal from "sweetalert2";
import WarningDeleteModal from "../warning_delete_modal";

const Profile = () => {
  const dispatch = useDispatch();

  const [showModalBanco, setShowModalBanco] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const [userUpdate, setUserUpdate] = useState({
    id: user.id || "",
    full_name: user.full_name || "",
    rg: user.rg || "",
    cpf: user.cpf || "",
    phone: user.phone || "",
    email: user.email || "",
    user_type: user.user_type || "",
    cep: user.cep || "",
    cnpj: user.cnpj || "",
    street: user.street || "",
    number: user.number || "",
    complement: user.complement || "",
    district: user.district || "",
    state: user.state || "",
    city: user.city || "",
  });

  const handleAccesTypeChange = (e) => {
    setUserUpdate({ ...userUpdate, user_type: e.value });
  };

  const optionsAccess = [
    { value: "COM", label: "Comercial" },
    { value: "ENG", label: "Engenharia" },
    { value: "ADM", label: "Admin" },
    { value: "Regular", label: "Regular" },
  ];

  const handleCepOnForm = async (cep) => {
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length - 1))) {
      const cepObject = await handleCepChange(cep.replace("-", ""));
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
    const token = sessionStorage.getItem("Authorization");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(`${currentUrl}/api/users/${user.id}/update/`, userUpdate, {
        headers,
      })
      .then((response) => {
        Swal.fire({
          title: "Sucesso!",
          text: "Sua requisição foi processada com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
        });
        dispatch(userUpdater(userUpdate));
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro!",
          text: "Algo deu errado ao tentar processar sua requisição.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("erro a seguir", error);
        return;
      });
  };

  const collapsed = useSelector((state) => state.sidebar);

  const handleDelete = () => {
    console.log("Deleting the account"); // Replace with your actual delete function
  };

  return (
    <IndexContainer collapsed={collapsed}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileContainerInfo collapsed={collapsed}>
          <h2>Meu perfil</h2>
          <FormContainer>
            <LeftColumn>
              <Row>
                <Label>Nome completo:</Label>
                <ShowInput
                  type="text"
                  value={userUpdate.full_name}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, full_name: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Email:</Label>
                <ShowInput
                  type="text"
                  value={userUpdate.email}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, email: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Whatsapp:</Label>
                <ShowInput
                  type="text"
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, phone: e.target.value })
                  }
                  mask="(99) 99999-9999"
                  value={userUpdate.phone}
                />
              </Row>
              <Row>
                <Label>RG:</Label>
                <ShowInput
                  type="text"
                  mask="99.999.999-9"
                  value={userUpdate.rg}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, rg: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>CPF:</Label>
                <ShowInput
                  type="text"
                  mask="999.999.999-99"
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
                  mask={"99.999.999/9999-99"}
                  value={userUpdate.cnpj}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, cnpj: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Tipo de acesso:</Label>
                <StyledSelect
                  options={optionsAccess}
                  onChange={handleAccesTypeChange}
                  value={
                    optionsAccess.find(
                      (option) => option.value === userUpdate.user_type
                    ) || null
                  }
                />
              </Row>
            </LeftColumn>

            <RightColumn>
              <Row>
                <Label>CEP:</Label>
                <ShowInput
                  type="text"
                  mask="99999-999"
                  value={userUpdate.cep}
                  onChange={(event) => {
                    setUserUpdate({ ...userUpdate, cep: event.target.value });
                    handleCepOnForm(event.target.value);
                  }}
                />
              </Row>
              <Row>
                <Label>Rua:</Label>
                <ShowInput type="text" value={userUpdate.street} disabled />
              </Row>
              <Row>
                <Label for="bairro">Bairro:</Label>
                <ShowInput
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={userUpdate.district}
                  disabled
                />
              </Row>
              <Row>
                <Label for="cidade">Cidade:</Label>
                <ShowInput
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={userUpdate.city}
                  disabled
                />
              </Row>
              <Row>
                <Label for="uf">UF:</Label>
                <ShowInput
                  type="text"
                  id="uf"
                  name="uf"
                  value={userUpdate.state}
                  disabled
                />
              </Row>
              <Row>
                <Label>Número:</Label>
                <ShowInput
                  type="text"
                  value={userUpdate.number}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, number: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Complemento:</Label>
                <ShowInput
                  type="text"
                  value={userUpdate.complement}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, complement: e.target.value })
                  }
                />
              </Row>
            </RightColumn>
          </FormContainer>

          <ButtonContainer>
            <WarningDeleteModal text={"Deletar"} path={"users"} id={user.id} />
            <StyledButtonSalvar onClick={handleRegister}>
              Salvar Alterações
            </StyledButtonSalvar>
          </ButtonContainer>
        </ProfileContainerInfo>
      </motion.div>
    </IndexContainer>
  );
};

export default Profile;
