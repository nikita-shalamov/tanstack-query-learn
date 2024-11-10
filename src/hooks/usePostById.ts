import { useQuery } from "@tanstack/react-query";
import { postService } from "../services/post.service";

const usePost = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getPost(id),
    select: (data) => data,
    enabled: !!id,
  });

  return { post: data, isLoading };
};

export default usePost;
