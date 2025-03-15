import axios from "axios";

const API_URL = "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// CRUD functions
export const getPosts = async () => (await api.get("/posts")).data;
export const getPost = async (id: number) => (await api.get(`/posts/${id}`)).data;
export const createPost = async (postData: { title: string; body: string, id: number }) => {
  console.log("Sending request to create post with data:", postData);
  const response = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  console.log("Response received:", response);
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  const newPost = await response.json();
  console.log("New post created:", newPost);
  return newPost;
};
// export const updatePost = async (id: number, data: { title: string; body: string }) =>
//   (await api.put(`/posts/${id}`, data)).data;
export const updatePost = async (id: number, data: { title: string; body: string }) => {
  console.log("Sending request to update post with id:", id, "and data:", data);
  try {
    const response = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Response received:", response);
    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`Failed to update post: ${response.status} ${response.statusText}`);
    }

    const updatedPost = await response.json();
    console.log("Post updated successfully:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
};
// export const deletePost = async (id: number) => (await api.delete(`/posts/${id}`)).data;
export const deletePost = async (id: number) => {
  console.log("Sending request to delete post with id:", id);
  const response = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Response received:", response);
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
  console.log("Post deleted successfully");
  return await response.json();
};