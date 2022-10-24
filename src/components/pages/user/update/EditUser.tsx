import { Card, ListGroup } from "react-bootstrap";
import { EditUserData } from "./EditUserData";

export function EditUser() {
  return (
    <Card className="w-75 m-auto">
      <Card.Body>
        <Card.Title className="text-muted">
          <h1>Editar Dados</h1>
        </Card.Title>

        <ListGroup>
          <EditUserData />
        </ListGroup>
      </Card.Body>
    </Card>
  )
}