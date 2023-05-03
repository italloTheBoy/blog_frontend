import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  IComment,
  IPost,
  IPostReaction,
  ITimelineMetrics,
  reactionType,
} from "../../../types/timelineTypes";
import { TimelineAPI } from "../../../helpers/TimelineAPI";

interface ReactionButtonProps {
  reactable: IPost | IComment;
  reactableType: "post" | "comment";
  metrics: ITimelineMetrics | null;
  metricsLoader(): Promise<void>;
}

export function ReactionButton({
  reactableType,
  reactable,
  metrics,
  metricsLoader,
}: ReactionButtonProps) {
  const [reaction, setReaction] = useState<IPostReaction | undefined>(
    undefined
  );

  const loadReaction = async () => {
    if (reactableType === "post")
      await TimelineAPI.getReactionByPost(reactable!.id).then((res) =>
        setReaction(res.data.data.reaction)
      );

    if (reactableType === "comment")
      await TimelineAPI.getReactionByCommment(reactable!.id).then((res) =>
        setReaction(res.data.data.reaction)
      );
  };

  const createReaction = async (type: reactionType) => {
    const body = {
      reaction: { type },
    };

    if (reactableType === "post")
      await TimelineAPI.reactPost(reactable!.id, body)
        .then((res) => TimelineAPI.getReaction(res.data.data.id))
        .then((res) => setReaction(res.data.data.reaction));

    if (reactableType === "comment")
      await TimelineAPI.reactComment(reactable!.id, body)
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
    metricsLoader();
  }, [reaction]);

  return (
    <>
      <Card.Link
        className="text-decoration-none text-primary fs-5"
        onClick={handleLike}
      >
        <i className={likeBtnClass}>{metrics?.likes}</i>
      </Card.Link>

      <Card.Link
        className="text-decoration-none text-danger fs-5"
        onClick={handleDislike}
      >
        <i className={dislikeBtnClass}>{metrics?.dislikes}</i>
      </Card.Link>
    </>
  );
}
