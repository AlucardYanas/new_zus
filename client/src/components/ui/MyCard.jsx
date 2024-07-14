import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from 'react';
import useStore from '../../store';
import useCards from '../../hooks/useCards';
import useModalCards from '../../hooks/useModalCards';

export default function MyCard({ showDeleteButton, card }) {
  const { deleteHandler, incrementBonus, decrementBonus } = useCards();
  const { handleEditClick } = useModalCards();
  const user = useStore((state) => state.user);

  console.log(card);

  return (
    <Col md={4} className="mt-2 position-relative">
      <Card>
        <h2 className="p-2">{card.title}</h2>
        <p className="p-2">{card.price}</p>
        <Card.Img
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
          }}
          variant="top"
          src={`http://localhost:3000/img/${card.image}`}
        />
        <div className="d-flex flex-row justify-content-end gap-4">
          {showDeleteButton && user.data && user.data.id === card.userId && (
            <>
              <Button
                onClick={() => incrementBonus(card.id)}
                variant="outline-success"
                className="mb-2"
              >
                +1 балл
              </Button>
              <Button
                onClick={() => decrementBonus(card.id)}
                variant="outline-warning"
                className="mb-2"
              >
                -1 балл
              </Button>
              <Button
                onClick={() => handleEditClick(card)}
                variant="outline-primary"
                className="mb-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteHandler(card.id)}
                variant="outline-danger"
                className="mb-2"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </Card>
    </Col>
  );
}
