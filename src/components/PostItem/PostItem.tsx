import styles from "./PostItem.module.css";
import { Button } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostItem = ({ post, onEdit, onDelete }: PostItemProps) => {
  return (
    <li className={styles.postItem}>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <Button variant="outlined" onClick={() => onEdit(post)}>Edit</Button>
      <Button variant="outlined" onClick={() => onDelete(post.id)}>Delete</Button>
    </li>
  );
};

export default PostItem;
