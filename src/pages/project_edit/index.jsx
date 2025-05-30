import {
  Container,
  InnerContainer,
  Column,
  Label,
  ShowInput,
  TextArea,
  Span,
  Button,
  ButtonContainer,
  ButtonLink,
  StyledSelect,
  StyledSelectForUser,
  FileContainer,
  InputLabel,
  SmallText,
  SubContainer,
  StyledButtonSalvar,
  StyledButtonVoltar,
} from "./styles";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { storeOwnerId } from "../../store/modules/app_data/actions";
import { motion } from "framer-motion";
import axios from "axios";
import {
  returnYesorNoforBoolean,
  returnUserName,
} from "../../constants/functions";
import { useSelector, useDispatch } from "react-redux";
import { currentUrl } from "../../constants/global";
import Swal from "sweetalert2";
import {
  regularMaskforNumbers,
  extractNumbers,
} from "../../constants/functions";
import {
  addProjectToProjects,
  resetProjects,
  eraseProjects,
} from "../../store/modules/app_data/actions";
import { appStatus } from "../../store/modules/app_status/actions";
import WarningDeleteModal from "../../components/warning_delete_modal";

const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const project = location.state.project;
  const userNames = useSelector((state) => state.app_data.users);
  const projects = useSelector((state) => state.app_data.projects);
  const [totalArea, setTotalArea] = useState(project.total_area);
  const [totalReserveArea, setTotalReserveArea] = useState(
    project.legal_reserve_area
  );
  const [address, setAddress] = useState(project.address);
  const [owner, setOwner] = useState(project.owner);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState(project.title);
  const currentUser = useSelector((state) => state.user.currentUser);

  // SICAR
  const [selectedCar, setSelectedCar] = useState(project.status_car);

  const optionsCar = [
    { value: "Ativo", label: "Ativo" },
    { value: "Pendente", label: "Pendente" },
    { value: "Cancelado", label: "Cancelado" },
    { value: null, label: "Não possui CAR" },
  ];

  const handleOptionsCar = (selectedCar) => {
    setSelectedCar(selectedCar.value);
  };

  // Status Matrícula
  const [selectedMatriculaStatus, setSelectedMatriculaStatus] = useState(
    project.matricula_status
  );

  const optionsMatriculaStatus = [
    { value: "Vigente", label: "Vigente" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Cancelada", label: "Cancelada" },
  ];

  const handleMatriculaStatus = (selectedMatriculaStatus) => {
    setSelectedMatriculaStatus(selectedMatriculaStatus.value);
  };

  // Código SICAR
  const [sicarCode, setSicarCode] = useState(project.sicar_code);

  // Georreferenciamento
  const [
    selectedGeorreferenciamentoStatus,
    setSelectedGeorreferenciamentoStatus,
  ] = useState(project.georeferencing_status);

  const optionsGerorreferenciamentoStatus = [
    { value: "Atualizado", label: "Atualizado" },
    { value: "Em atualização", label: "Em atualização" },
    { value: "Pendente", label: "Pendente" },
    { value: "Não aplicável", label: "Não aplicável" },
  ];

  const handleGeorreferenciamentoStatus = (
    selectedGeorreferenciamentoStatus
  ) => {
    setSelectedGeorreferenciamentoStatus(
      selectedGeorreferenciamentoStatus.value
    );
  };

  // Situação da reserva legal da propriedade

  const [selectedReservaSituation, setSelectedReservaSituation] = useState(
    project.reserve_legal_status
  );

  const optionsReservaSituation = [
    {
      value: "Sem vegetação / em regeneração natural",
      label: "Sem vegetação / em regeneração natural",
    },
    {
      value: "Em regeneração a partir de reflorestamento",
      label: "Em regeneração a partir de reflorestamento",
    },
    { value: "Completamente florestada", label: "Completamente florestada" },
  ];

  const handleReservaSituation = (selectedReservaSituation) => {
    setSelectedReservaSituation(selectedReservaSituation.value);
  };

  // Unidade de Conservação (UC) do imóvel

  const [selectedUnidadeConservacao, setSelectedUnidadeConservacao] = useState(
    project.conservation_unit
  );

  const optionsUnidadeConservacao = [
    { value: "Privada", label: "Privada" },
    { value: "Pública", label: "Pública" },
    { value: "Não possui", label: "Não possui" },
  ];

  const handleUnidadeConservacao = (selectedUnidadeConservacao) => {
    setSelectedUnidadeConservacao(selectedUnidadeConservacao.value);
  };

  // Dívida Federal

  const [selectedPossuiDivida, setSelectedPossuiDivida] = useState(
    project.has_federal_debt
  );

  const optionsPossuiDivida = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const handlePossuiDivida = (selectedPossuiDivida) => {
    setSelectedPossuiDivida(selectedPossuiDivida.value);
  };

  // Possui déficit de reserva legal?
  const [selectedPossuiDeficit, setSelectedPossuiDeficit] = useState("");

  const optionsPossuiDeficit = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const handlePossuiDeficit = (selectedPossuiDeficit) => {
    setSelectedPossuiDeficit(selectedPossuiDeficit.value);
  };

  // A propriedade está sob domínio de uma pessoa física ou jurídica?

  const [selectedPessoaJuridicaOuFisica, setSelectedPessoaJuridicaOuFisica] =
    useState(project.physical_or_legal_entity);

  const optionsPessoaJuridicaOuFisica = [
    { value: "Física", label: "Física" },
    { value: "Jurídica", label: "Jurídica" },
  ];

  const handlePessoaFisicaOuJuridica = (selectedPessoaJuridicaOuFisica) => {
    setSelectedPessoaJuridicaOuFisica(selectedPessoaJuridicaOuFisica.value);
  };

  // Máscara CPF ou CNPJ
  const [CNPJ, setCNPJ] = useState(project.cnpj);
  const [mask, setMask] = useState("99.999.999/9999-99");
  const [boolean, setBoolean] = useState(false);

  const handleInputChange = () => {
    if (!boolean) {
      setMask("99.999.999/9999-99");
    } else {
      setMask("999.999.999-99");
    }
  };

  // Rotas

  const handleClick = () => {
    dispatch(appStatus(""));
    navigate("/intern_project", { state: { project } });
  };

  const [ownerActionsToPreserveForest, setOwnerActionsToPreserveForest] =
    useState(project.owner_actions_to_preserve_forest);

  // file uploader
  const ownerID = useSelector((state) => state.app_data.owner_id);

  const [selectedFiles, setSelectedFiles] = useState({
    pdf_matricula_certificate: null,
    pdf_car: null,
    property_polygon: null,
    pdf_federal_debt_certificate: null,
    pdf_ccir: null,
    project_image: null,
    owner: ownerID, // alterar essa linha
  });

  const handleFileInput = (fieldName, e) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: e.target.files[0],
    }));
  };

  // preparar objeto para ser enviado para a requisição

  const preparedObject = {
    owner: owner,
    total_area: extractNumbers(totalArea),
    legal_reserve_area: extractNumbers(totalReserveArea),
    address: address,
    status_car: selectedCar,
    sicar_code: sicarCode,
    matricula_status: selectedMatriculaStatus,
    georeferencing_status: selectedGeorreferenciamentoStatus,
    reserve_legal_status: selectedReservaSituation,
    physical_or_legal_entity: "legal",
    cnpj: CNPJ,
    conservation_unit: selectedUnidadeConservacao,
    owner_actions_to_preserve_forest: ownerActionsToPreserveForest,
    legal_reserve_deficit: selectedPossuiDeficit,
    has_federal_debt: selectedPossuiDivida,
    physical_or_legal_entity: selectedPessoaJuridicaOuFisica,
    title: title,
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("Authorization");
      const url = `${currentUrl}/api/projects/${project.id}/update/`;

      const formData = new FormData();
      if (selectedFiles?.pdf_matricula_certificate) {
        formData.append(
          "pdf_matricula_certificate",
          selectedFiles.pdf_matricula_certificate
        );
      }
      if (selectedFiles?.pdf_car) {
        formData.append("pdf_car", selectedFiles.pdf_car);
      }
      if (selectedFiles?.property_polygon) {
        formData.append("property_polygon", selectedFiles.property_polygon);
      }
      if (selectedFiles?.pdf_federal_debt_certificate) {
        formData.append(
          "pdf_federal_debt_certificate",
          selectedFiles.pdf_federal_debt_certificate
        );
      }
      if (selectedFiles?.pdf_ccir) {
        formData.append("pdf_ccir", selectedFiles.pdf_ccir);
      }
      if (selectedFiles?.project_image) {
        formData.append("project_image", selectedFiles.project_image);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      for (const [key, value] of Object.entries(preparedObject)) {
        formData.append(key, value);
      }

      const response = await axios.put(url, formData, { headers });
      Swal.fire({
        title: "Sucesso!",
        text: "As informações foram editadas com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      const projectIndex = projects.findIndex((p) => p.id === response.data.id);

      if (projectIndex !== -1) {
        const updatedProjects = [...projects];
        updatedProjects.splice(projectIndex, 1);
        dispatch(eraseProjects());
        dispatch(resetProjects([...updatedProjects, response.data]));
        navigate("/welcome");
        dispatch(appStatus("Dashboard"));
      } else {
        // nunca vai existir isso
        dispatch(addProjectToProjects(response.data));
      }
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Algo deu errado ao tentar processar sua requisição.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error:", error);
      // Add code to handle the error
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <h2>Informações Cadastrais</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label style={{ fontSize: "16px" }}>
            Qual o nome (fantasia) da sua terra, fazenda ou reserva?
          </Label>
          <ShowInput
            type="text"
            placeholder="Ex: Fazenda Santa Júlia"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "88%", fontSize: "18px" }}
          />
        </div>
        <InnerContainer>
          <Column>
            <Label>Proprietário da área:</Label>
            <div style={{ marginBottom: "32px", marginTop: "8px" }}>
              {currentUser.user_type === "Regular"
                ? currentUser.full_name
                : returnUserName(project.owner, userNames)}
            </div>
            <Label>
              A propriedade está sob domínio de uma pessoa física ou jurídica?
            </Label>
            <StyledSelect
              onChange={handlePessoaFisicaOuJuridica}
              options={optionsPessoaJuridicaOuFisica}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.physical_or_legal_entity,
                label: project.physical_or_legal_entity,
              }}
            />

            <Label>
              {boolean ? "CPF" : "CNPJ"} do proprietário{" "}
              {
                <ButtonLink
                  onClick={() => handleInputChange(setBoolean(!boolean))}
                >
                  {boolean ? "Alternar para CNPJ" : "Alternar para CPF"}
                </ButtonLink>
              }
            </Label>
            <ShowInput
              mask="99.999.999/9999-99"
              alwaysShowMask={false}
              placeholder="CPF/CNPJ"
              defaultValue={CNPJ}
              onChange={(e) => setCNPJ(e.target.value)}
            />

            <Label>Qual o endereço da propriedade?</Label>
            <ShowInput
              type="text"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Label>Status da Matrícula</Label>
            <StyledSelect
              onChange={handleMatriculaStatus}
              options={optionsMatriculaStatus}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.matricula_status,
                label: project.matricula_status,
              }}
            />
            <Label>Possui déficit de reserva legal?</Label>
            <StyledSelect
              onChange={handlePossuiDeficit}
              options={optionsPossuiDeficit}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.legal_reserve_deficit,
                label: returnYesorNoforBoolean(project.legal_reserve_deficit),
              }}
            />
            <Label>Possui dívida federal pelo não pagamento de tributos?</Label>
            <StyledSelect
              onChange={handlePossuiDivida}
              options={optionsPossuiDivida}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.has_federal_debt,
                label: returnYesorNoforBoolean(project.has_federal_debt),
              }}
            />
          </Column>
          <Column>
            <Label>Área total da propriedade (ha)?</Label>
            <ShowInput
              type="text"
              placeholder="Em hectares (ha)"
              defaultValue={totalArea}
              onChange={(event) => regularMaskforNumbers(event, setTotalArea)}
            />

            <Label>Área total da reserva legal (ha)?</Label>
            <ShowInput
              type="text"
              placeholder="Em hectares (ha)"
              defaultValue={totalReserveArea}
              onChange={(event) =>
                regularMaskforNumbers(event, setTotalReserveArea)
              }
            />
            <Label>Status do CAR</Label>
            <StyledSelect
              onChange={handleOptionsCar}
              options={optionsCar}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.status_car,
                label: project.status_car,
              }}
            />
            <Label>Código SICAR (CAR)</Label>
            <ShowInput
              type="text"
              mask={"**-*******-****.****.****.****.****.****.****.****"}
              alwaysShowMask={false}
              placeholder="Ex: MS-5003207-785F.26BA.34BA.49FB.8327.7FAB.C58C.E4C2"
              onChange={(e) => setSicarCode(e.target.value)}
              defaultValue={sicarCode}
            ></ShowInput>
            <Label>Status do georreferenciamento no SIGEF</Label>
            <StyledSelect
              onChange={handleGeorreferenciamentoStatus}
              options={optionsGerorreferenciamentoStatus}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.georeferencing_status,
                label: project.georeferencing_status,
              }}
            />
            <Label>Situação da reserva legal da propriedade:</Label>
            <StyledSelect
              onChange={handleReservaSituation}
              options={optionsReservaSituation}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                label: project.reserve_legal_status,
                value: project.reserve_legal_status,
              }}
            />
            <Label>Possui Unidade de Conservação (UC) no imóvel?</Label>
            <StyledSelect
              onChange={handleUnidadeConservacao}
              options={optionsUnidadeConservacao}
              placeholder={"Selecione uma opção"}
              defaultValue={{
                value: project.conservation_unit,
                label: project.conservation_unit,
              }}
            />
          </Column>
        </InnerContainer>
        <Column style={{ marginTop: "36px" }}>
          <Label>
            Existem ações tomadas pelo proprietário para garantir a preservação
            das florestas existentes no imóvel?
          </Label>
          <Span>
            Descrever abaixo quais são essas ações e a data em que foram
            realizadas.
          </Span>
          <Span>
            Estas ações podem ser in loco, tal como cercamento ou aceiro, ou
            pode ser uma ação legal, tal como averbação da reserva legal na
            matrícula ou criação de uma RPPN.
          </Span>
          <p />
          <TextArea
            type="text"
            defaultValue={ownerActionsToPreserveForest}
            onChange={(e) => setOwnerActionsToPreserveForest(e.target.value)}
          />
        </Column>

        {/* file uploader */}
        <h2>Arquivos necessários para consolidação</h2>
        <SubContainer>
          <Column>
            <FileContainer>
              <InputLabel>Certidão de Matrícula</InputLabel>
              <SmallText>(atualizada em até 180 dias)</SmallText>
              <ShowInput
                type="file"
                onChange={(e) =>
                  handleFileInput("pdf_matricula_certificate", e)
                }
              />
            </FileContainer>
            <FileContainer>
              <InputLabel>PDF do CAR (SICAR)</InputLabel>
              <SmallText>
                (Preferencialmente PDF. Mas aceita outros tipos de)
              </SmallText>
              <ShowInput
                type="file"
                onChange={(e) => handleFileInput("pdf_car", e)}
              />
            </FileContainer>
            <FileContainer>
              <InputLabel>Polígono da propriedade</InputLabel>
              <SmallText>(Formatos aceitos: *.KMZ ou *.KML)</SmallText>
              <ShowInput
                type="file"
                onChange={(e) => handleFileInput("property_polygon", e)}
              />
            </FileContainer>
          </Column>
          <Column>
            <FileContainer>
              <InputLabel>Cópia do CCIR</InputLabel>
              <SmallText>
                (Preferencialmente PDF. Mas aceita outros tipos de)
              </SmallText>
              <ShowInput
                type="file"
                onChange={(e) => handleFileInput("pdf_ccir", e)}
              />
            </FileContainer>
            <FileContainer>
              <InputLabel>
                Certidão de Regularidade da Dívida Federal
              </InputLabel>
              <SmallText>
                (Preferencialmente PDF. Mas aceita outros tipos de)
              </SmallText>
              <ShowInput
                type="file"
                onChange={(e) =>
                  handleFileInput("pdf_federal_debt_certificate", e)
                }
              />
            </FileContainer>
            <FileContainer>
              <InputLabel>Imagem Representativa do Projeto</InputLabel>
              <SmallText>
                Adicione uma foto para identificar a sua área verde.
              </SmallText>
              <ShowInput
                type="file"
                onChange={(e) => handleFileInput("project_image", e)}
              />
            </FileContainer>
          </Column>
        </SubContainer>
        <ButtonContainer>
          <WarningDeleteModal
            text={"Deletar Projeto"}
            path={"projects"}
            id={project.id}
            width={"200px"}
            height={"35px"}
          />
          <StyledButtonSalvar
            onClick={() => handleSave()}
            style={{ margin: "0 15px" }}
          >
            Salvar
          </StyledButtonSalvar>
          <StyledButtonVoltar
            onClick={() => handleClick()}
            style={{ margin: "0px 65px 0px 0px" }}
          >
            Voltar
          </StyledButtonVoltar>
        </ButtonContainer>
      </Container>
    </motion.div>
  );
};

export default EditProject;
