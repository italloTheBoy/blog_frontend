import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Input } from "../form/Input";
import {
  ICommentBody,
  ICommentErrors,
  ICommentParams,
} from "../../../types/timelineTypes";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { usePost } from "../../../hooks/usePost";

export function CommentButton() {
  const { post, postMetrics, loadPostMetrics } = usePost();

  const [show, setShow] = useState<boolean>(false);
  const [errs, setErrs] = useState<ICommentErrors>({});
  const [createData, setCreateData] = useState<ICommentParams>({});

  const handleOpen = () => setShow(true);

  const handleClose = () => {
    setCreateData({});
    setErrs({});
    setShow(false);
  };

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) =>
    setCreateData({
      ...createData,
      [currentTarget.name]: currentTarget.value,
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body: ICommentBody = { comment: createData };

    await TimelineAPI.commentAnPost(post!.id, body)
      .then(() => handleClose())
      .catch((res) => setErrs(res.response.data.errors));
  };

  useEffect(() => {
    loadPostMetrics();
  }, [postMetrics]);

  return (
    <>
      <Card.Link
        className="pe-1 text-decoration-none text-secondary fs-5 ps-1"
        onClick={handleOpen}
      >
        <i className="bi bi-chat">{postMetrics?.comments}</i>
      </Card.Link>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Faça um comentario</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Input
              name="body"
              as="textarea"
              onChange={handleChange}
              value={createData.body || ""}
              placeholder="Insira um comentario"
              error={errs.body && errs.body[0]}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Comentar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
