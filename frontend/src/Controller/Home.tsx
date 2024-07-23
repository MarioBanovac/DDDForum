import { Header, PostsSwitch, Container, Post } from "UI";

export function Home() {
  return (
    <Container>
      <Header />
      <PostsSwitch />
      <Post />
    </Container>
  );
}
