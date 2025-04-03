import React, { useState, useEffect } from "react";
import axios from "axios";
import Banco from "../../components/bank";
import {
  StyledButtonSalvar,
  StyledButtonVoltar,
  StyledButtonProjetos,
} from "../../components/default_button/styles";
import {
  ProfileContainerInfo,
  MainContainer,
  Row,
  Label,
  ShowInput,
  FormContainer,
  LeftColumn,
  RightColumn,
  ButtonContainer,
} from "./styles";
import { handleCepChange } from "../../api/requests/cep";
import { currentUrl } from "../../constants/global";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { appStatus } from "../../store/modules/app_status/actions";
import WarningDeleteModal from "../../components/warning_delete_modal";
import Swal from "sweetalert2";
import folha1 from "../../assets/icons/folha1.png";
import { useSelector, useDispatch } from "react-redux";

const UserIntern = () => {
  const location = useLocation();
  const user = location.state?.user || {};
  const collapsed = useSelector((state) => state.sidebar);
  const [showModalBanco, setShowModalBanco] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalBanco = () => {
    setShowModalBanco(!showModalBanco);
  };

  const [userUpdate, setUserUpdate] = useState({
    id: user.id || "",
    full_name: user.full_name || "",
    rg: user.rg || "",
    cpf: user.cpf || "",
    cnpj: user.cnpj || "",
    phone: user.phone || "",
    email: user.email || "",
    user_type: user.user_type || "",
    cep: user.cep || "",
    street: user.street || "",
    number: user.number || "",
    complement: user.complement || "",
    district: user.district || "",
    state: user.state || "",
    city: user.city || "",
  });

  const [userProjects, setUserProjects] = useState([]);

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
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro!",
          text: "Algo deu errado ao tentar processar sua requisição.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error);
        return;
      });
  };

  const handleComeBack = () => {
    dispatch(appStatus("Usuários"));
    navigate("/welcome");
  };

  useEffect(() => {
    if (user && user.id) {
      setUserUpdate((prevUserUpdate) => {
        // Verifica se os dados do usuário já estão corretos antes de atualizar
        if (JSON.stringify(prevUserUpdate) !== JSON.stringify(user)) {
          return {
            id: user.id,
            full_name: user.full_name || "",
            rg: user.rg || "",
            cpf: user.cpf || "",
            cnpj: user.cnpj || "",
            phone: user.phone || "",
            email: user.email || "",
            user_type: user.user_type || "",
            cep: user.cep || "",
            street: user.street || "",
            number: user.number || "",
            complement: user.complement || "",
            district: user.district || "",
            state: user.state || "",
            city: user.city || "",
          };
        }
        return prevUserUpdate;
      });
  
      const fetchData = async () => {
        try {
          //console.log("Buscando projetos para user.id:", user.id);
          const token = sessionStorage.getItem("Authorization");
          const response = await axios.get(
            `${currentUrl}/api/projects/${user.id}/by_user/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserProjects(response.data);
        } catch (error) {
          console.error("Erro ao buscar projetos:", error);
        }
      };
  
      fetchData();
    }
  }, [user]); // O efeito executa apenas quando `user` muda
  
  

  const sendInternProject = (project) => {
    dispatch(appStatus(""));
    navigate("/intern_project", { state: { project, user } });
  };

  return (
    <MainContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileContainerInfo collapsed={collapsed}>
          <h2>Informações Cadastrais</h2>
          <FormContainer>
            <LeftColumn>
              <Row>
                <Label>Nome completo</Label>
                <ShowInput
                  type="text"
                  defaultValue={userUpdate.full_name}
                  onChange={(e) =>
                    setUserUpdate({
                      ...userUpdate,
                      full_name: e.target.value,
                    })
                  }
                />
              </Row>

              <Row>
                <Label>Email</Label>
                <ShowInput
                  type="text"
                  defaultValue={userUpdate.email}
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
                  value={userUpdate.phone}
                />
              </Row>
              <Row>
                <Label htmlFor="rg">RG:</Label>
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
                <Label htmlFor="cpg">CPF:</Label>
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
            </LeftColumn>

            <RightColumn>
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
                <Label htmlFor="rua">Complemento:</Label>
                <ShowInput
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={userUpdate.complement}
                  onChange={(e) =>
                    setUserUpdate({
                      ...userUpdate,
                      complement: e.target.value,
                    })
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
            </RightColumn>
          </FormContainer>

          <ButtonContainer>
            <WarningDeleteModal
              text={"Deletar Usuário"}
              path={"users"}
              id={user.id}
            />
            <StyledButtonSalvar
              onClick={handleRegister}
              style={{ margin: "0 15px" }}
            >
              Salvar
            </StyledButtonSalvar>
            <StyledButtonVoltar
              onClick={handleComeBack}
              style={{ margin: "0px 65px 0px 0px" }}
            >
              Voltar
            </StyledButtonVoltar>
          </ButtonContainer>

          <ButtonContainer>
            {showModalBanco && (
              <Banco isOpen={showModalBanco} onClose={handleModalBanco} />
            )}

            {userProjects.length > 0 && (
              <div style={{ marginTop: "-25px" }}>
                <div style={{ float: "left" }}>
                  <h3
                    style={{
                      height: "20px",
                      width: "325px",
                      float: "left", // ✅ Mantendo apenas uma vez
                    }}
                  >
                    Projetos de Crédito de Carbono
                  </h3>

                  <div
                    style={{
                      float: "left",
                      width: "25px",
                      height: "25px",
                      marginTop: "15px",
                      backgroundImage: `url(${folha1})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
                <div style={{ float: "left", width: "100%" }}>
                  {userProjects.map((project) => (
                    <StyledButtonProjetos
                      key={project.id} // ✅ Adicionado um identificador único
                      style={{ margin: "0px 32px 32px 0" }}
                      onClick={() => sendInternProject(project)}
                    >
                      {project.title.toUpperCase()}
                    </StyledButtonProjetos>
                  ))}
                </div>
              </div>
            )}
          </ButtonContainer>
        </ProfileContainerInfo>
        <p />
      </motion.div>
    </MainContainer>
  );
};

export default UserIntern;
