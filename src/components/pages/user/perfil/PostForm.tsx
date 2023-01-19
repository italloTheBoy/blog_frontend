import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { IPostErrors, IPostParams } from "../../../../types/postTypes";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils/api";
import { Input } from "../../../layouts/form/Input";

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
      setErrs({});
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
    <Container as="section">
      <Form className="d-grid gap-2 m-auto" onSubmit={handleSubmit}>
        <Input
          name="title"
          onChange={handleChange}
          value={createData.title}
          placeholder="Insira um titulo"
          error={errs.title}
        />

        <Input
          name="body"
          as="textarea"
          onChange={handleChange}
          value={createData.body}
          placeholder="Insira seus pensamentos"
          error={errs.title}
        />

        <Button className="mt-1 p-2" type="submit">
          Postar
        </Button>
      </Form>
    </Container>
  );
}
