import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePosts from "./hooks/usePosts";
import axios from "axios";
import { IPost } from "./types/Post.types";

const App = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add post"],
    mutationFn: async (newPost: Omit<IPost, "id">) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", newPost),
    onSuccess: () => {
      console.log("success mutation");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // обновление постов при добавлении нового
    },
    onError: () => {
      console.log("error mutation");
    },
  });

  const { data, isLoading } = usePosts();

  const isTodosFetching = queryClient.isFetching({ queryKey: ["posts"] });

  console.log(isTodosFetching);

  return (
    <div>
      <h1>React Query</h1>
      <button
        onClick={() =>
          mutate({ body: "New body", title: "New title", userId: 1 })
        }
      >
        {isPending ? "Loading..." : "Create"}
      </button>
      {isLoading
        ? "Loading..."
        : data?.data?.length
        ? data?.data?.map((post, index) => <div key={index}>{post.title}</div>)
        : "Not found"}
    </div>
  );
};

export default App;
