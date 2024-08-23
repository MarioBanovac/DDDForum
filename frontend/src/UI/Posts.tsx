import dayjs from "dayjs";

interface IProps {
  posts: Array<any>;
}

export function Posts({ posts }: IProps) {
  const getVotesNumber = (post): number => {
    return post.reduce((acc: number, currentPost) => {
      if (currentPost.voteType === "Upvote") acc += 1;
      if (currentPost.voteType === "Downvote") acc -= 1;
      return acc;
    }, 0);
  };

  const getFormattedDate = (date: string): string => {
    const dayJSDate = dayjs(date);

    const today = dayjs();
    const monthsAgo = today.diff(dayJSDate, "month");
    const daysAgo = today.diff(dayJSDate, "day");

    if (monthsAgo === 1) {
      return "1 month ago";
    } else if (monthsAgo > 1) {
      return `˙${monthsAgo} months ago`;
    } else {
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div style={{ marginTop: 70, rowGap: 8 }} className="flex column">
      {posts.map((post) => (
        <>
          <div style={{ gap: 25 }} className="flex align-center">
            <div className="flex column align-center">
              <img
                className="pointer"
                style={{ height: 20 }}
                src="../../public/arrow-up.svg"
                alt=""
              />
              <p style={{ fontSize: 20 }}>{getVotesNumber(post.votes)}</p>
              <img
                className="pointer"
                style={{ height: 20 }}
                src="../../public/arrow-down.svg"
                alt=""
              />
            </div>
            <h2>{post.title}</h2>
          </div>
          <div style={{ gap: 10, marginLeft: 45 }} className="flex">
            <p>{getFormattedDate(post.dateCreated)} | </p>
            <a>by {post?.memberPostedBy?.user?.username} | </a>
            <p>{post?.comments?.length} comments</p>
          </div>
        </>
      ))}
    </div>
  );
}
