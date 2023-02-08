import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { IPostErrors, IPostParams } from "../../../../types/timelineTypes";
import { Input } from "../../../layouts/form/Input";
import { TimelineAPI } from "../../../../helpers/TimelineAPI";

export function PostForm() {
  const [createData, setCreateData] = useState<IPostParams>({});
  const [errs, setErrs] = useState<IPostErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = { post: createData };

    await TimelineAPI.createPost(body)
      .then(() => {
        setCreateData({});
        setErrs({});
      })
      .catch((res) => setErrs(res.response.data.errors));
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateData({
      ...createData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    console.log(createData);
  };

  return (
    <Container as="section">
      <Form className="d-grid gap-2 m-auto" onSubmit={handleSubmit}>
        <Input
          name="body"
          as="textarea"
          onChange={handleChange}
          value={createData.body || ""}
          placeholder="Insira seus pensamentos"
          error={errs.body}
        />

        <Button className="mt-1 p-2" type="submit">
          Postar
        </Button>
      </Form>
    </Container>
  );
}
