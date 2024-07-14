import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useStore from '../../store';

// ---- ЭТО ВСПЛЫВАЮЩАЯ МОДАЛКА ДЛЯ создания ---

export default function AppModal({ title, children, buttonText }) {
  const show = useStore((state) => state.show);
  const setShow = useStore((state) => state.setShow);
//  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-secondary" className="mt-4" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
