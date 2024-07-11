import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errors";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    throw Errors.ServerError;
  }
};
