import { useEffect, useState } from "react";
import { Header, PostsSwitch, Container, Posts } from "UI";
import { apiClient } from "Api";
import { IPost } from "interfaces/Post";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([])
  
  async function loadPosts() {
    const posts = await apiClient.getPopularPosts()
    setPosts(posts)
  }
  
  useEffect(() => {
    loadPosts()
  },[])
  
  return (
    <Container>
      <Header />
      <PostsSwitch />
      <Posts posts={posts} />
    </Container>
  );
}
