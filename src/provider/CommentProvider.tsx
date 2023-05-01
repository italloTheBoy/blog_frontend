import { useEffect, useState } from "react";
import { IComment, ITimelineMetrics } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";
import { IUser } from "../types/contexts/authTypes";
import { AuthAPI } from "../helpers/AuthAPI";
import { ICommentProvider } from "../types/contexts/CommentContextTypes";
import { CommentContext } from "../contexts/CommentContext";

export function CommentProvider({
  children,
  commentData,
  commentId,
  loadAuthor = true,
  loadMetrics = true,
}: ICommentProvider) {
  const [comment, setComment] = useState<IComment | null>(null);

  const [commentAuthor, setCommentsAuthor] = useState<IUser | undefined>(
    undefined
  );

  const [commentMetrics, setCommentsMetrics] = useState<
    ITimelineMetrics | undefined
  >(undefined);

  const loadComment = async () => {
    if (commentData) setComment(commentData);

    if (comment)
      await TimelineAPI.getComment(comment.id).then((res) =>
        setComment(res.data.data.comment)
      );

    if (commentId)
      await TimelineAPI.getComment(commentId).then((res) =>
        setComment(res.data.data.comment)
      );
  };

  const loadCommentAuthor = !loadAuthor || !comment
    ? undefined
    : async () =>
        await AuthAPI.getUser(comment!.user_id).then((res) =>
          setCommentsAuthor(res.data.data.user)
        );

  const loadCommentMetrics = !loadMetrics || !comment
    ? undefined
    : async () =>
        await TimelineAPI.getCommentMetrics(comment!.id).then((res) =>
          setCommentsMetrics(res.data.data)
        );

  useEffect(() => {
    if (!comment) loadComment();
  }, []);

  useEffect(() => {
    if (loadCommentAuthor) loadCommentAuthor();
    if (loadCommentMetrics) loadCommentMetrics();
  }, [comment]);

  return (
    <CommentContext.Provider
      value={{
        comment,
        commentAuthor,
        commentMetrics,
        reloadComment: loadComment,
        reloadCommentAuthor: loadCommentAuthor,
        reloadCommentMetrics: loadCommentMetrics,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
