import React, { useState } from "react";
import Banco from "../bank";
import {
  StyledButton,
  StyledButtonSalvar,
  StyledButtonVoltar,
} from "../default_button/styles";
import {
  MainContainer,
  ProfileContainerInfo,
  Row,
  Label,
  ShowInput,
  LeftColumn,
  RightColumn,
  FormContainer,
  ButtonContainer,
  StyledSelect,
} from "./styles";
import { handleCepChange } from "../../api/requests/cep";
import { color, motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { currentUrl } from "../../constants/global";
import { addUserToUsers } from "../../store/modules/app_data/actions";
import { useSelector, useDispatch } from "react-redux";
import { appStatus } from "../../store/modules/app_status/actions";

import folha1 from '../../assets/icons/folha1.png';

const InternRegisterUser = () => {
  const [showModalBanco, setShowModalBanco] = useState(false);

  const navigate = useNavigate();

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const collapsed = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  // Código pertinente ao preenchimento automático do CEP

  const [userObject, setUserObject] = useState({
    id: "", // O backend deve definir automaticamente
    full_name: "",
    rg: "",
    cpf: "",
    phone: "",
    email: "",
    user_type: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    state: "",
    city: "",
    password: "123123",
  });

  const clearFormFields = () => {
    setUserObject({
      id: "",
      full_name: "",
      rg: "",
      cpf: "",
      phone: "",
      email: "",
      user_type: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      state: "",
      city: "",
      password: "123123",
    });

    setTimeout(() => {
      setUserObject((prev) => ({ ...prev })); // Força re-render
    }, 0);
  };

  const handleCepOnForm = async (cep) => {
    if (cep.length === 9 && !isNaN(cep.charAt(cep.length - 1))) {
      const cepObject = await handleCepChange(cep.replace("-", ""));
      setUserObject({
        ...userObject,
        cep: cepObject.cep,
        street: cepObject.logradouro,
        district: cepObject.bairro,
        state: cepObject.uf,
        city: cepObject.localidade,
      });
    }
  };

  const handleAccesTypeChange = (e) => {
    setUserObject({ ...userObject, user_type: e.value });
  };

  const [verifyName, setVerifyName] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [verifyCEP, setVerifyCEP] = useState(false);
  const [verifyAccessType, setVerifyAccestype] = useState(false);

  const handleRegister = () => {
    const formValues = { ...userObject };
    delete formValues.id; // Removendo id antes de enviar

    if (
      !formValues.email ||
      !/^\S+@\S+\.\S+$/.test(formValues.email) ||
      !formValues.cep ||
      formValues.cep.length < 9 ||
      !formValues.full_name ||
      !formValues.phone
    ) {
      Swal.fire({
        title: "Erro!",
        text: "Verifique os campos que ainda faltam serem preenchidos.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    axios
      .post(`${currentUrl}/api/signup/`, formValues, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Sucesso!",
          text: "Sua requisição foi processada com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
        });
        clearFormFields();

        dispatch(addUserToUsers(response.data));
        navigate("/welcome");
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro!",
          text: "Algo deu errado ao tentar processar sua requisição.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error);
      });
  };

  const handleComeBack = () => {
    dispatch(appStatus("Usuários"));
    navigate("/welcome");
  };

  const optionsAccess = [
    { value: "COM", label: "Comercial" },
    { value: "ENG", label: "Engenharia" },
    { value: "ADM", label: "Admin" },
    { value: "Regular", label: "Regular" },
  ];

  return (
    <MainContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileContainerInfo collapsed={collapsed}>
          <h2>Cadastrar novo usuário</h2>
          <FormContainer>
            <LeftColumn>
              <Row>
                <Label>Nome completo:</Label>
                <ShowInput
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={userObject.full_name || ""}
                  onChange={(e) =>
                    setUserObject({ ...userObject, full_name: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Email:</Label>
                <ShowInput
                  type="text"
                  value={userObject.email || ""} // ✅ Agora o valor atualiza quando o estado muda
                  onChange={(e) =>
                    setUserObject({ ...userObject, email: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Whatsapp:</Label>
                <ShowInput
                  type="text"
                  onChange={(e) =>
                    setUserObject({ ...userObject, phone: e.target.value })
                  }
                  mask={"(99) 99999-9999"}
                  maskPlaceholder={"(21) 98787-5512"}
                  alwaysShowMask={false}
                  value={userObject.phone || ""}
                />
              </Row>
              <Row>
                <Label htmlFor="rg">RG:</Label>
                <ShowInput
                  type="text"
                  id="rg"
                  name="rg"
                  mask={"99.999.999-9"}
                  maskPlaceholder="47.857.659.3"
                  alwaysShowMask={false}
                  value={userObject.rg || ""}
                  onChange={(e) =>
                    setUserObject({ ...userObject, rg: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label htmlFor="cpg">CPF:</Label>
                <ShowInput
                  type="text"
                  id="cpf"
                  name="cpf"
                  mask={"999.999.999-99"}
                  maskPlaceholder="359.868.555-19"
                  alwaysShowMask={false}
                  value={userObject.cpf || ""}
                  onChange={(e) =>
                    setUserObject({ ...userObject, cpf: e.target.value })
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
                  alwaysShowMask={false}
                  value={userObject.cnpj || ""}
                  onChange={(e) =>
                    setUserObject({ ...userObject, cnpj: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label>Tipo de acesso:</Label>
                <StyledSelect
                  options={optionsAccess}
                  placeholder={"Selecione uma opção"}
                  value={
                    optionsAccess.find(
                      (option) => option.value === userObject.user_type
                    ) || null
                  }
                  onChange={handleAccesTypeChange}
                />

                {verifyAccessType && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "16px",
                      marginTop: "0px",
                      marginLeft: "10px",
                      fontStyle: "italic",
                      fontSize: "10px",
                    }}
                  >
                    Esse campo é necessário
                  </div>
                )}
              </Row>
            </LeftColumn>

            <RightColumn>
              <Row>
                <Label htmlFor="cep">CEP:</Label>
                <ShowInput
                  type="text"
                  id="cep"
                  name="cep"
                  value={userObject.cep}
                  onChange={(event) => {
                    setUserObject({ ...userObject, cep: event.target.value });
                    handleCepOnForm(event.target.value);
                  }}
                  mask={"99999-999"}
                  maskPlaceholder="13140-989"
                  alwaysShowMask={false}
                />
              </Row>
              <Row>
                <Label htmlFor="rua">Rua:</Label>
                <ShowInput
                  type="text"
                  id="rua"
                  name="rua"
                  value={userObject.street}
                  onChange={(e) =>
                    setUserObject({ ...userObject, street: e.target.value })
                  }
                  disabled
                  placeholder="Preencha o CEP para preenchimento automático"
                />
              </Row>

              <Row>
                <Label for="bairro">Bairro:</Label>
                <ShowInput
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={userObject.district}
                  disabled
                  placeholder="Preencha o CEP para preenchimento automático"
                  onChange={(e) =>
                    setUserObject({ ...userObject, district: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label for="cidade">Cidade:</Label>
                <ShowInput
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={userObject.city}
                  disabled
                  placeholder="Preencha o CEP para preenchimento automático"
                  onChange={(e) =>
                    setUserObject({ ...userObject, city: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label for="uf">UF:</Label>
                <ShowInput
                  type="text"
                  id="uf"
                  name="uf"
                  value={userObject.state}
                  disabled
                  placeholder="Preencha o CEP para preenchimento automático"
                  onChange={(e) =>
                    setUserObject({ ...userObject, state: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label htmlFor="numero">Número:</Label>
                <ShowInput
                  type="text"
                  id="numero"
                  name="numero"
                  value={userObject.number}
                  onChange={(e) =>
                    setUserObject({ ...userObject, number: e.target.value })
                  }
                />
              </Row>
              <Row>
                <Label htmlFor="complemento">Complemento:</Label>
                <ShowInput
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={userObject.complement}
                  onChange={(e) =>
                    setUserObject({ ...userObject, complement: e.target.value })
                  }
                />
              </Row>
            </RightColumn>
          </FormContainer>

          <ButtonContainer>
            <StyledButtonSalvar
              onClick={handleRegister}
              style={{ margin: "0 15px" }}
            >
              Cadastrar
            </StyledButtonSalvar>
            <StyledButtonVoltar
              onClick={handleComeBack}
              style={{ margin: "0px 65px 0px 0px" }}
            >
              Voltar
            </StyledButtonVoltar>
          </ButtonContainer>

        </ProfileContainerInfo>
      </motion.div>
    </MainContainer>
  );
};

export default InternRegisterUser;

/**
Não sei para quê esse modal está sendo usado, ele ficava em baixo de ButtonContainer, mas pelos meus testes não faz nada
vou deixar isso comentado por que o uso pode ser descuberto mais para frente
- Julia.
{showModalBanco && <Banco isOpen={showModalBanco} onClose={handleModalBanco} />} 
 */
