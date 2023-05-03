import { useEffect } from "react";
import { usePost } from "../../../hooks/usePost";
import { CommentProvider } from "../../../provider/CommentProvider";
import { TimelineComment } from "../../layouts/timeline/TimelineComment";

export function CommentList() {
    const { comments, loadComments } = usePost();

    useEffect(() => {
      loadComments()
    }, [])

    return (
      <div className="d-flex flex-column gap-4">
        {comments.length === 0 ? (
          <p>Não encontramos nemhum commentário</p>
        ) : (
          comments.map((comment) => (
            <CommentProvider commentData={comment} key={comment.id}>
              <TimelineComment />
            </CommentProvider>
          ))
        )}
      </div>
    );
  }