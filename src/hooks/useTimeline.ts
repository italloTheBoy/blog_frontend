import { useContext } from "react";
import { TimelineContext } from "../contexts/TimelineContext";

export function useTimeline() {
  return useContext(TimelineContext)
}