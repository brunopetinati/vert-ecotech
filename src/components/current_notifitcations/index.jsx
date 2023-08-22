import { StyledContainer, StyledText, Notification, Title } from "./styles";

const CurrentNotifications = () => {
  return (
    <StyledContainer>
    <StyledText>
      <Notification>
        <Title>1. Em Espera -</Title> Seus documentos se encontram em análise pela engenharia ambiental. Em breve entraremos em contato!<br />
      </Notification>
      <Notification>
        <Title>2. Análise de Viabilidade -</Title> Estamos realizando a análise de viabilidade econômica e retorno financeiro da sua propriedade. Em breve entraremos em contato!<br />
      </Notification>
      <Notification>
        <Title>3. Título da Notificação -</Title> Conteúdo da Notificação<br />
      </Notification>
      <Notification>
        <Title>4. Contrato -</Title> Concluímos a elaboração do seu contrato. Em breve entraremos em contato!<br />
      </Notification>
      <Notification>
        <Title>5. Concluído -</Title> Iniciamos seu projeto de geração de crédito de carbono. Em breve entraremos em contato!<br />
      </Notification>
      <Notification>
        <Title>6. Perdido -</Title> Nossa equipe agradece o seu interesse nos nossos serviços, mas este não é o momento ideal para iniciarmos o seu projeto. Em breve entraremos em contato com maiores informações!<br />
      </Notification>
      <Notification>
        <Title>7. Proposta -</Title> Estamos elaborando uma proposta comercial.<br />
      </Notification>
      <Notification>
        <Title>8. Análise Jurídica -</Title> Nosso setor jurídico está preparando o seu contrato. Em breve entraremos em contato!<br />
      </Notification>
      <Notification>
        <Title>9. Em negociação -</Title> Concluímos a elaboração da sua proposta comercial. Em breve entraremos em contato!<br />
      </Notification>
    </StyledText>
  </StyledContainer>
  )
}

export default CurrentNotifications;