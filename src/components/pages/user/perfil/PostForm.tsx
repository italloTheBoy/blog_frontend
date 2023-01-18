import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { IPostErrors, IPostParams } from "../../../../types/postTypes";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils/api";

export function PostForm() {
  const [createData, setCreateData] = useState<IPostParams>({});
  const [errs, setErrs] = useState<IPostErrors>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      data: { errors },
    } = await api
      .post("/post", { post: createData })
      .catch((err) => err.response);

    if (errors) {
      setErrs(errors);
    } else {
      setCreateData({});
      navigate("/");
    }
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateData({
      ...createData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    console.log(createData)
  };

  return (
    <Container>
      <Form className="d-grid gap-2 m-auto" onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Control
            name="title"
            onChange={handleChange}
            value={createData.title || ""}
            placeholder="Insira um titulo"
            aria-describedby={errs.title ? "titleErr" : undefined}
          ></Form.Control>

          {errs.title && (
            <Form.Text id="titleErr" className="text-danger">
              {errs.title}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Control
            name="body"
            as="textarea"
            onChange={handleChange}
            value={createData.body || ""}
            aria-describedby={errs.body ? "bodyErr" : undefined}
          ></Form.Control>

          {errs.title && (
            <Form.Text id="bodyErr" className="text-danger">
              {errs.title}
            </Form.Text>
          )}
        </Form.Group>

        <Button className="mt-1 p-2" type="submit">
          Postar
        </Button>
      </Form>
    </Container>
  );
}
