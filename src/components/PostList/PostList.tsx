import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../../services/api";
import PostForm from "../PostForm/PostForm";
import styles from "./PostList.module.css";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // post delete
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // post update
  const handleUpdate = (updatedPost?: Post) => {
    if (updatedPost) {
      setPosts((prev) =>
        prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    }
    setEditingPost(null);
  };

  return (
    <Card sx={{ boxShadow: 10, padding: 2 }}>
      <CardContent>
        <div>
          <h2>Posts</h2>

          {/* Create new post */}
          <PostForm onSuccess={() => fetchPosts()} />

          {/* Edit existing post */}
          {editingPost && (
            <PostForm
              postId={editingPost.id}
              initialData={{ title: editingPost.title, body: editingPost.body, id: editingPost.id }}
              onSuccess={handleUpdate} // Now safely handles updates
            />
          )}

          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <div className={styles.buttonContainer}>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostList;
