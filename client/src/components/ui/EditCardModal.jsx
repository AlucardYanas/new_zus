import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useModalCards from '../../hooks/useModalCards';

export default function EditCardModal() {
  const {
    editModalShow,
    formData,
    currentCard,
    setEditModalShow,
    handleEditSave,
    handleFormChange,
  } = useModalCards();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      handleFormChange(name, files[0]); // Если изменяется файл, берем первый файл из массива
    } else {
      handleFormChange(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditSave(e, currentCard.id);
  };

  return (
    <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" value={formData.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Image</Form.Label>
            <Form.Control name="file" type="file" required value={formData.image} onChange={handleChange} />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
