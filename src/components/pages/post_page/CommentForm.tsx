import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import {
  ICommentErrors,
  ICommentParams,
  IPostErrors,
} from "../../../types/timelineTypes";
import { Input } from "../../layouts/form/Input";
import { usePost } from "../../../hooks/usePost";

export function CommentForm() {
  const { post } = usePost();
  const [createData, setCreateData] = useState<ICommentParams>({});
  const [errs, setErrs] = useState<ICommentErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = { comment: createData };

    await TimelineAPI.commentAnPost(post!.id, body)
      .then(() => {
        setCreateData({});
        setErrs({});
        // reload comment list
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
  };

  return (
    <Form className="d-grid gap-3 m-auto" onSubmit={handleSubmit}>
      <Input
        name="body"
        as="textarea"
        onChange={handleChange}
        value={createData.body || ""}
        placeholder="Faça seu comentário"
        error={errs.body}
      />

      <Button className="p-2" type="submit">
        Comentar
      </Button>
    </Form>
  );
}
