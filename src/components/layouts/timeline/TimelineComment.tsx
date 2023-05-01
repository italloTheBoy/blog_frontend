import { useComment } from "../../../hooks/useComment";

export function TimelineComment() {
  const {comment} = useComment()

  return (
    <p>{comment?.body}</p>
  )
}