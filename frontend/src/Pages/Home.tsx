import { Header, PostsSwitch, Container, Post } from "components";

export function Home() {
  return (
    <Container>
      <Header />
      <PostsSwitch />
      <Post />
    </Container>
  );
}
