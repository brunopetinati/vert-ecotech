import { ModalContainer, ModalBox, CloseButton } from './styles'

const DefaultModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalBox>
        <CloseButton onClick={onClose} >×</CloseButton>
        {children}
      </ModalBox>
    </ModalContainer>
  );
};

export default DefaultModal;