import { useEffect, useState } from "react";
import { PostProvider } from "../../../provider/PostProvider";
import { IPost } from "../../../types/timelineTypes";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useParams } from "react-router-dom";
import { NotFound } from "../statusCode/NotFound";
import { PostCard } from "./PostCard";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Card } from "react-bootstrap";

export function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<IPost | null>(null)
  
  const loadPost = async ()  => {
    await TimelineAPI.getPost(id!).then((res) => {
      setPost(res.data.data.post)
    })
  }

  useEffect(() => {
    loadPost()
  }, [])

  return post ? (
    <PostProvider postData={post!}>
      <div className="w-75 m-auto">
        <Card as="main">
          <PostCard />
        </Card>
        <section className="mt-4">
          <header className="border-bottom border-2">
            <h1 className="fs-3">Comentários</h1>
          </header>
          <CommentForm />
          <CommentList />
        </section>
      </div>
    </PostProvider>
  ) : (
    <NotFound />
  );

}