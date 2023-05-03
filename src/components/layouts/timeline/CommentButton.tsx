import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Input } from "../form/Input";
import {
  IComment,
  ICommentBody,
  ICommentErrors,
  ICommentParams,
  IPost,
  ITimelineMetrics,
} from "../../../types/timelineTypes";

interface CommentButtonProps {
  commentableType: "post" | "comment";
  commentable: IPost | IComment;
  metrics: ITimelineMetrics | null;
  metricsLoader: () => Promise<void>;
}

export function CommentButton({
  commentableType,
  commentable,
  metrics,
  metricsLoader,
}: CommentButtonProps) {
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

    if (commentableType === "post")
      await TimelineAPI.commentAnPost(commentable.id, body)
        .then(() => handleClose())
        .catch((res) => setErrs(res.response.data.errors));

    if (commentableType === "comment")
      await TimelineAPI.commentAnComment(commentable.id, body)
        .then(() => handleClose())
        .catch((res) => setErrs(res.response.data.errors));

    metricsLoader();
  };

  // useEffect(() => {
  //   metricsLoader();
  // }, []);

  return (
    <>
      <Card.Link
        className="pe-1 text-decoration-none text-secondary fs-5 ps-1"
        onClick={handleOpen}
      >
        <i className="bi bi-chat">{metrics?.comments}</i>
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
