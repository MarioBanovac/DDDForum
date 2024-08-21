import { PrismaClient, User, Post, Vote, Comment } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: User[] = [
  {
    id: 1,
    email: "admin@gmail.com",
    username: "admin",
    password: "123456",
  },
  {
    id: 2,
    email: "moderator@gmail.com",
    username: "moderator",
    password: "123456",
  },
  {
    id: 3,
    email: "joe@gmail.com",
    username: "joe",
    password: "123456",
  },
];

const initialPosts: Post[] = [
  {
    id: 1,
    title: "First post!",
    content: "This is joe's first post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 3,
  },
  {
    id: 2,
    title: "Second post!",
    content: "This is joe's second post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 3,
  },
  {
    id: 3,
    title: "Moderator announcement!",
    content: "This is moderator's first post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 2,
  },
  {
    id: 4,
    title: "Links",
    content: "This is a link post by admin",
    postType: "<https://khalilstemmler.com>",
    dateCreated: new Date(),
    memberId: 1,
  },
];

const initialPostVotes: Vote[] = [
  // Everyone upvotes their own first post
  { id: 1, postId: 1, voteType: "Upvote", memberId: 3 },
  { id: 2, postId: 2, voteType: "Upvote", memberId: 3 },
  { id: 3, postId: 3, voteType: "Upvote", memberId: 2 },
  { id: 4, postId: 4, voteType: "Upvote", memberId: 1 },

  // Joe's post upvoted by moderator
  { id: 5, postId: 1, voteType: "Upvote", memberId: 2 },

  // Moderator's post downvoted by admin
  { id: 6, postId: 3, voteType: "Downvote", memberId: 1 },
];

const initialPostComments: Comment[] = [
  {
    id: 1,
    text: "Comment left by admin on the first post!",
    memberId: 1,
    postId: 1,
    parentCommentId: null,
  },
  {
    id: 2,
    text: "Moderator left feedback on Joes post",
    memberId: 2,
    postId: 1,
    parentCommentId: null,
  },
];

async function main() {
  for (const user of initialUsers) {
    const newUser = await prisma.user.create({
      data: user,
    });

    await prisma.member.create({
      data: {
        user: {
          connect: { id: newUser.id },
        },
      },
    });
  }

  for (const post of initialPosts) {
    await prisma.post.create({ data: post });
  }

  for (const vote of initialPostVotes) {
    await prisma.vote.create({
      data: vote,
    });
  }

  for (const comment of initialPostComments) {
    await prisma.comment.create({
      data: comment,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
