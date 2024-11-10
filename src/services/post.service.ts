import axios from "axios";
import { IPost } from "../types/Post.types";

class PostService {
  private URL = "https://jsonplaceholder.typicode.com/posts";

  getPosts() {
    try {
      return axios.get<IPost[]>(this.URL);
    } catch (error) {
      console.error("Ошибка при получении постов:", error);
      throw error;
    }
  }
  getPost(id: number) {
    try {
      return axios.get<IPost>(`${this.URL}/${id}`);
    } catch (error) {
      console.error("Ошибка при получении поста:", error);
      throw error;
    }
  }
}

export const postService = new PostService();
