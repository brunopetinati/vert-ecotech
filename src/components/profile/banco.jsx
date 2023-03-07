import Modal from "../default_modal";
import { Container, InnerContainer, ButtonContainer, Column, Label, Input, Button, Span } from './styles'

const Banco = ({ isOpen, onClose, children }) => {
  return(
    <Modal isOpen={isOpen} onClose={onClose} children={children}>

    </Modal>
  )
};

export default Banco;
