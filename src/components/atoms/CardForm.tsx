import "./CardForm.css";
import Card from "react-bootstrap/Card";

function CardForm({ children }: any) {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default CardForm;
