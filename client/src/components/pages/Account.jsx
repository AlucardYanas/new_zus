import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppModal from '../ui/AppModal';
import CardsWrapper from '../ui/CardsWrapper';
import CardForm from '../ui/CardForm';
import EditCardModal from '../ui/EditCardModal';
import useStore from '../../store';
import useCards from '../../hooks/useCards';

export default function CardPage() {
  const user = useStore((state) => state.user);
  const { cardSubmitHandler } = useCards();

  return (
    <Row>
      {user.data && (
        <Col>
          <AppModal title="Create a card" buttonText="Create a card">
            <CardForm onSubmit={cardSubmitHandler} />
          </AppModal>
        </Col>
      )}
      <CardsWrapper showDeleteButton />
      <EditCardModal />
    </Row>
  );
}
