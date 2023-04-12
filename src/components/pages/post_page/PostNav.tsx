import { NavDropdown } from "react-bootstrap";

interface props {
  handleDelete: () => Promise<void>;
}

export function PostNav({ handleDelete }: props) {
  return (
    <NavDropdown as="nav" title="Opções">
      <NavDropdown.Item className="text-danger" onClick={handleDelete}>
        Deletar
      </NavDropdown.Item>
    </NavDropdown>
  );
}
