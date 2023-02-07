import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { IPostReaction, reactionType } from "../../../types/timelineTypes";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { TId } from "../../../types/appTypes";

interface ReactionButtonProps {
  postId: TId;
}

export function ReactionButton(props: ReactionButtonProps) {
  const { postId } = props;

  const [reaction, setReaction] = useState<IPostReaction | undefined>(
    undefined
  );

  const loadReaction = async () => {
    await TimelineAPI.getReactionByPost(postId).then((res) =>
      setReaction(res.data.data.reaction)
    );
  };

  const createReaction = async (type: reactionType) => {
    const body = {
      reaction: { type },
    };

    await TimelineAPI.reactPost(postId, body)
      .then((res) => TimelineAPI.getReaction(res.data.data.id))
      .then((res) => setReaction(res.data.data.reaction));
  };

  const updateReaction = async () => {
    await TimelineAPI.toggleReactionType(reaction!.id)
      .then((res) => TimelineAPI.getReaction(res.data.data.id))
      .then((res) => setReaction(res.data.data.reaction));
  };

  const deleteReaction = async () => {
    await TimelineAPI.deleteReaction(reaction!.id).then((res) =>
      setReaction(undefined)
    );
  };

  const handleLike = () => {
    if (!reaction?.type) createReaction("like");
    if (reaction!.type !== "like") updateReaction();
    if (reaction!.type === "like") deleteReaction();
  };

  const handleDislike = () => {
    if (!reaction?.type) createReaction("dislike");
    if (reaction!.type !== "dislike") updateReaction();
    if (reaction!.type === "dislike") deleteReaction();
  };

  const likeBtnClass = `bi ${
    reaction?.type === "like" ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
  }`;

  const dislikeBtnClass = `bi ${
    reaction?.type === "dislike"
      ? "bi-hand-thumbs-down-fill"
      : "bi-hand-thumbs-down"
  }`;

  useEffect(() => {
    loadReaction();
  }, []);

  return (
    <Container className="ps-0">
      <Card.Link className="text-primary fs-5" onClick={handleLike}>
        <i className={likeBtnClass}></i>
      </Card.Link>

      <Card.Link className="text-danger fs-5" onClick={handleDislike}>
        <i className={dislikeBtnClass}></i>
      </Card.Link>
    </Container>
  );
}
