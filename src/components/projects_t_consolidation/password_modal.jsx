import React, { useState } from 'react';
import Swal from 'sweetalert2';

const PasswordModal = ({ onConfirm }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirm = () => {
    if (!password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    onConfirm(password);
  };

  return (
    <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default PasswordModal;
