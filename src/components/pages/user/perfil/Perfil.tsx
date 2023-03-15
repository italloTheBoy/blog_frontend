import { Card, Container } from "react-bootstrap";
import { PostForm } from "./PostForm";
import { Timeline } from "../../../layouts/timeline/Timeline";
import { TimelineProvier } from "../../../../provider/TimelineProvider";
import { PerfilNavbar } from "./PerfilNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../statusCode/NotFound";
import { AuthAPI } from "../../../../helpers/AuthAPI";
import { IUser } from "../../../../types/contexts/authTypes";

export function Perfil() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);

  const loadUser = async () => {
    await AuthAPI.getUser(id!)
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return user ? (
    <TimelineProvier font={{ type: "user", id: id! }}>
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
  ) : (
    <NotFound />
  );
}
