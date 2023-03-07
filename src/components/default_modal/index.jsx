import { ModalContainer, ModalBox, CloseButton } from './styles'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalBox>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal;