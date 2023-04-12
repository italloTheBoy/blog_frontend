import { NavDropdown } from "react-bootstrap";

interface props {
  handleDelete: () => Promise<void>;
}

export function PostOptionsNav({ handleDelete }: props) {
  return (
    <NavDropdown as="nav" title="Opções">
      <NavDropdown.Item className="text-danger" onClick={handleDelete}>
        Deletar
      </NavDropdown.Item>
    </NavDropdown>
  );
}
