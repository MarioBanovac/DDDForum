import { prisma } from "../db";

interface INewUser {
  email: string;
  username: string;
  password: string;
}

interface IUpdateUser {
  email: string;
  username: string;
}

export const createUser = async (userInput: INewUser) => {
  try {
    return await prisma.user.create({
      data: userInput,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userInput: IUpdateUser, id: number) =>
  await prisma.user.update({
    data: userInput,
    where: {
      id,
    },
  });

export const findUserById = async (userId: number) =>
  await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

export const findUserByEmail = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
  });

export const findUserByUsername = async (username: string) =>
  await prisma.user.findUnique({
    where: {
      username,
    },
  });

export const findPosts = async () =>
  await prisma.post.findMany({
    include: {
      votes: true,
      memberPostedBy: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comments: true,
    },
    orderBy: {
      dateCreated: 'desc'
    }
  });
