import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useCards from '../../hooks/useCards';

// ---- ЭТО ВСПЛЫВАЮЩАЯ МОДАЛКА ДЛЯ ДОБАВЛЕНИЯ ---

export default function CardForm() {
  const { cardSubmitHandler } = useCards();
  return (
    <Form onSubmit={cardSubmitHandler}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" type="number" placeholder="Enter price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFile">
        <Form.Label>Image</Form.Label>
        <Form.Control name="file" type="file" required />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBonus">
        <Form.Label>Bonus</Form.Label>
        <Form.Control name="bonus" type="number" placeholder="Enter bonus" defaultValue={0} />
      </Form.Group> */}
      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
