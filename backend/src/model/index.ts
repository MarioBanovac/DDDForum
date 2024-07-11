import { prisma } from "../db";

interface IUserInput {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const createUser = async (userInput: IUserInput) => {
  try {
    return await prisma.user.create({
      data: userInput,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userInput: IUserInput, id: number) =>
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
