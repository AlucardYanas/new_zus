import Row from 'react-bootstrap/esm/Row';

import React from 'react';
import CardsWrapper from '../ui/CardsWrapper';

export default function MainPage() {
  return (
    <Row>
      <CardsWrapper showDeleteButton={false} />
    </Row>
  );
}
