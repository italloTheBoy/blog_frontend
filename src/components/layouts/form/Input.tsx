import { FormControlProps } from "react-bootstrap";
import { Form } from "react-bootstrap";

interface IInputProps extends FormControlProps {
  name: string;
  label?: string;
  error?: string;
}

export function Input(props: IInputProps) {
  const {
    id,
    name,
    label,
    value,
    placeholder,
    htmlSize,
    size,
    error,
    plaintext,
    readOnly,
    disabled,
    type,
    as,
    onChange,
  } = props;

  const errorId = error ? `${id || name}Err` : undefined;

  return (
    <Form.Group as="section" controlId={id || name}>
      {label && <Form.Label className="text-captalize">{label}</Form.Label>}

      <Form.Control
        name={name}
        value={value}
        placeholder={placeholder}
        htmlSize={htmlSize}
        size={size}
        plaintext={plaintext}
        readOnly={readOnly}
        disabled={disabled}
        aria-describedby={errorId}
        as={as}
        type={type}
        onChange={onChange}
      />

      {error && (
        <Form.Text id={errorId} className="text-danger text-captalize">
          {error}
        </Form.Text>
      )}
    </Form.Group>
  );
}
