import express, { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import cors from "cors";
import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  updateUser,
  findPosts,
} from "../model";
import { Errors } from "../utils/errors";
import { connectDB } from "../db";

require("dotenv").config();

(async () => {
  await connectDB();
})().catch((e) => {
  process.exit(1);
});

const app = express();
app.use(express.json());
app.use(cors());

const getErrorStatusCode = (error: unknown): number => {
  if (
    error === Errors.UsernameAlreadyTaken ||
    error === Errors.EmailAlreadyInUse
  ) {
    return 409;
  }

  if (error === Errors.UserNotFound) {
    return 404;
  }

  if (error === Errors.ValidationError) {
    return 400;
  }
  return 500;
};

const createUserResponse = (userModel: any) => {
  const userModelCopy = JSON.parse(JSON.stringify(userModel));
  delete userModelCopy.password;
  return userModelCopy;
};

// Create a new user
app.post(
  "/users/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password) {
        throw Errors.ValidationError;
      } else {
        const existingUserByEmail = await findUserByEmail(email);
        if (existingUserByEmail) {
          throw Errors.EmailAlreadyInUse;
        }

        const existingUserByUsername = await findUserByUsername(username);

        if (existingUserByUsername) {
          throw Errors.UsernameAlreadyTaken;
        }
        const createdUser = await createUser({
          email,
          username,
          password,
        });
        res.status(201).json({
          error: undefined,
          data: createUserResponse(createdUser),
          success: true,
        });
      }
    } catch (error: any) {
      if (
        error === Errors.ValidationError ||
        error === Errors.EmailAlreadyInUse ||
        error === Errors.UsernameAlreadyTaken
      ) {
        res.status(getErrorStatusCode(error)).json({
          error,
          data: undefined,
          success: false,
        });
      } else {
        next(error);
      }
    }
  }
);

// Edit a user
app.post(
  "/users/edit/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { email, username } = req.body;
      const payload = {
        email,
        username,
      };
      if (
        !email ||
        !username ||
        !req.params ||
        !userId ||
        isNaN(parseInt(userId))
      ) {
        throw Errors.ValidationError;
      }
      const targetUser = await findUserById(parseInt(userId));
      if (!targetUser) {
        throw Errors.UserNotFound;
      }

      const updatedUser = await updateUser(payload, parseInt(userId));

      res.status(200).json({
        error: undefined,
        data: createUserResponse(updatedUser),
        success: true,
      });
    } catch (error) {
      if (error === Errors.ValidationError || error === Errors.UserNotFound) {
        res.status(getErrorStatusCode(error)).json({
          error,
          data: undefined,
          success: false,
        });
      } else {
        next(error);
      }
    }
  }
);

// Find a user by email
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw Errors.ValidationError;
    }
    const targetUser = await findUserByEmail(email.toString());
    if (targetUser) {
      res.status(200).json({
        error: undefined,
        data: createUserResponse(targetUser),
        success: true,
      });
    }

    if (!targetUser) {
      throw Errors.UserNotFound;
    }
  } catch (error: any) {
    if (
      error === Errors.ValidationError ||
      error === Errors.UserNotFound ||
      error?.name === Errors.UserNotFound
    ) {
      res.status(getErrorStatusCode(error || error?.name)).json({
        error: error || error?.name,
        data: undefined,
        success: false,
      });
    } else {
      next(error);
    }
  }
});

app.get("/posts", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sort } = req.query;

    if (sort !== "recent") {
      return res
        .status(400)
        .json({ error: Errors.ClientError, data: undefined, success: false });
    }

    const posts = await findPosts();
    return res.json({
      error: undefined,
      data: { posts: [posts] },
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err?.code === "P2002" && Array.isArray(err?.meta?.target)) {
      const failedField = err?.meta?.target[0];
      res.status(409).json({
        error:
          failedField === "email"
            ? Errors.EmailAlreadyInUse
            : Errors.UsernameAlreadyTaken,
        success: false,
      });
    }
  }
  res.status(500).json({
    error: Errors.ServerError,
    data: undefined,
    success: false,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.info("Server is listening on port: ", PORT);
});
