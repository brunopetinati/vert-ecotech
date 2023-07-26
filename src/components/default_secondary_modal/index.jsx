import { ModalContainer, ModalBox } from './styles'

const DefaultSecondaryModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalBox>
        {children}
      </ModalBox>
    </ModalContainer>
  );
};

export default DefaultSecondaryModal;