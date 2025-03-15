import { useState } from "react";
import { createPost, updatePost, getPosts } from "../../services/api";
import styles from "./PostForm.module.css";
import { Button, TextField } from "@mui/material";

interface PostFormProps {
  postId?: number;
  initialData?: { title: string; body: string; id: number };
  onSuccess: (updatedPost?: {
    id: number;
    title: string;
    body: string;
  }) => void;
}

const PostForm = ({ postId, initialData, onSuccess }: PostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const isEditing = !!postId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updatedPost = await updatePost(postId!, { title, body, id: postId! });
        onSuccess(updatedPost);
      } else {
        const posts = await getPosts();
        const newId =
          posts.length > 0
            ? Math.max(...posts.map((post: { id: any }) => post.id)) + 1
            : 1;
        const newPost = await createPost({ title, body, id: newId });
        onSuccess(newPost);
      }
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{isEditing ? "Edit Post" : "Create Post"}</h3>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="outlined" color="secondary">
        {isEditing ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default PostForm;
