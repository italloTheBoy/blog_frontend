import { useContext } from "react";
import { CommentContext } from "../contexts/CommentContext";

export function useComment() {
  return useContext(CommentContext);
}
