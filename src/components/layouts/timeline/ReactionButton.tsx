import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IPostReaction, reactionType } from "../../../types/timelineTypes";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { usePost } from "../../../hooks/usePost";

export function ReactionButton() {
  const { post, postMetrics, loadPostMetrics } = usePost();

  const [reaction, setReaction] = useState<IPostReaction | undefined>(
    undefined
  );

  const loadReaction = async () => {
    await TimelineAPI.getReactionByPost(post!.id).then((res) =>
      setReaction(res.data.data.reaction)
    );
  };

  const createReaction = async (type: reactionType) => {
    const body = {
      reaction: { type },
    };

    await TimelineAPI.reactPost(post!.id, body)
      .then((res) => TimelineAPI.getReaction(res.data.data.id))
      .then((res) => setReaction(res.data.data.reaction));
  };

  const updateReaction = async () => {
    await TimelineAPI.toggleReactionType(reaction!.id)
      .then((res) => TimelineAPI.getReaction(res.data.data.id))
      .then((res) => setReaction(res.data.data.reaction));
  };

  const deleteReaction = async () => {
    await TimelineAPI.deleteReaction(reaction!.id).then(() =>
      setReaction(undefined)
    );
  };

  const handleLike = () => {
    if (!reaction) createReaction("like");
    else if (reaction.type === "dislike") updateReaction();
    else if (reaction.type === "like") deleteReaction();
  };

  const handleDislike = () => {
    if (!reaction) createReaction("dislike");
    else if (reaction.type === "like") updateReaction();
    else if (reaction.type === "dislike") deleteReaction();
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

  useEffect(() => {
    loadPostMetrics();
  }, [reaction]);

  return (
    <>
      <Card.Link
        className="text-decoration-none text-primary fs-5"
        onClick={handleLike}
      >
        <i className={likeBtnClass}>{postMetrics?.likes}</i>
      </Card.Link>

      <Card.Link
        className="text-decoration-none text-danger fs-5"
        onClick={handleDislike}
      >
        <i className={dislikeBtnClass}>{postMetrics?.dislikes}</i>
      </Card.Link>
    </>
  );
}
