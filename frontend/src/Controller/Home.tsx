import { useEffect, useState } from "react";
import { Header, PostsSwitch, Container, Posts } from "UI";
import { apiClient } from "Api";

export function Home() {
  const [posts, setPosts] = useState<any>([])
  
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
