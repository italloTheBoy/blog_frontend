import { Card, Container } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { PostForm } from "./PostForm";
import { Timeline } from "../../../layouts/timeline/Timeline";
import { TimelineProvier } from "../../../../provider/TimelineProvider";
import { PerfilNavbar } from "./PerfilNavbar";

export function Perfil() {
  const { user, deleteUser } = useAuth();

  return (
    <TimelineProvier font={{ type: "user", id: user!.id }}>
      <Container as="main" className="m-auto w-75 p-2 d-grid gap-3">
        <Card as="header">
          <Card.Header as="header" className="p-0">
            <PerfilNavbar />
          </Card.Header>

          <Card.Body>
            <PostForm />
          </Card.Body>
        </Card>

        <Container as="main" className="p-0 d-grid gap-3">
          <Timeline />
        </Container>
      </Container>
    </TimelineProvier>
  );
}
