import Modal from "../default_modal";
import { SimpleModal, ModalContent} from './styles'
import { currentUrl } from "../../constants/global";
import Swal from "sweetalert2";
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const KanbanUserCardModal = ({ user, isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} children={
      <SimpleModal isOpen={isOpen} onClick={onClose} >
        <ModalContent>
          <h2>{user.full_name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {/* Display other user information here */}
        </ModalContent>
      </SimpleModal> }
    >  
    </Modal>
  );
};

export default KanbanUserCardModal;

