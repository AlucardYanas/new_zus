import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SignUpPage.css'; // Подключаем файл стилей
import useUser from '../../hooks/useUser';

export default function SignUpPage() {
  const { signUpHandler } = useUser();
  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <h3 className="text-center mb-4 fire-text">Sign Up</h3>
        <Form onSubmit={signUpHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter your password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign up
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
