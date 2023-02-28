import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export function usePost() {
  return useContext(PostContext);
}
