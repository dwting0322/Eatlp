import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';



function LoginFormModal({setShowModal}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} showModal={showModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;