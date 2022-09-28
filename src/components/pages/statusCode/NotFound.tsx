import { Col, Container, Row } from "react-bootstrap";

export function NotFound() {
  return (
    <Container>
      <Row as="h1" className="position-absolute bottom-50 end-50 fs-1">
        404: Not Found
      </Row>
    </Container>
  )
} 