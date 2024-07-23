export function Post() {
  const data = [
    {
      title: "Domain services vs Application services",
      link: "#",
      date: "6 days ago",
      username: "stemmlerjs",
      comments: 5,
      upvotes: 9,
    },
    {
      title: "Ports and Adapters",
      link: "#",
      date: "5 days ago",
      username: "stemmlerjs",
      comments: 1,
      upvotes: 3,
    },
    {
      title: "An Introduction to Domain-Driven Design - DDD w/ Typescript",
      link: "#",
      date: "3 days ago",
      username: "stemmlerjs",
      comments: 0,
      upvotes: 2,
    },
  ];
  return (
    <div style={{ marginTop: 70, rowGap: 15 }} className="flex column">
      {data.map((post) => (
        <>
          <div style={{ gap: 25 }} className="flex align-center">
            <div className="flex column align-center">
              <img
                className="pointer"
                style={{ height: 20 }}
                src="../../public/arrow-up.svg"
                alt=""
              />
              <p style={{ fontSize: 20 }}>{post.upvotes}</p>
              <img
                className="pointer"
                style={{ height: 20 }}
                src="../../public/arrow-down.svg"
                alt=""
              />
            </div>
            <h2>{post.title}</h2>
            <a href={post.link}>[link]</a>
          </div>
          <div style={{ gap: 10, marginLeft: 45 }} className="flex">
            <p>{post.date} | </p>
            <a>by {post.username} | </a>
            <p>{post.comments} comments</p>
          </div>
        </>
      ))}
    </div>
  );
}
