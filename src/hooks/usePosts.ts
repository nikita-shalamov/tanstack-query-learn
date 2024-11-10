import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IPost } from "../types/Post.types";
import { postService } from "../services/post.service";

const initialData: { data: IPost[] } = {
  data: [
    {
      body: "Initial Body",
      id: 0,
      title: "Initial title",
      userId: 0,
    },
  ],
};

const usePosts = () => {
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["posts"], // ключ для кэширования
    queryFn: () => postService.getPosts(), // функция вызова
    select: (data) => data,
    enabled: true,
    initialData, // данные по умолчанию
  });

  useEffect(() => {
    if (isSuccess) console.log("Data fetched success");
  }, [isSuccess]);

  useEffect(() => {
    if (isError) console.log("Data fetched error");
  }, [isError]);

  useEffect(() => {
    if (isLoading) console.log("Loading: ", isLoading);
  }, [isLoading]);

  return { data, isLoading };
};

export default usePosts;
