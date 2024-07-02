import express, { Request, Response } from "express";
import cors from "cors";
import { createUser, findUser, findUserByEmail } from "../model";
import { Errors } from "../utils/errors";
import { request } from "http";

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

// Create a new user
app.post("/users/new", async (req: Request, res: Response) => {
  try {
    const { email, username, firstName, lastName } = req.body;
    if (!email || !username || !firstName || !lastName) {
      throw Errors.ValidationError;
    } else {
      const createdUser = await createUser({
        email,
        username,
        firstName,
        lastName,
      });
      res.status(201).json({
        error: undefined,
        data: createdUser,
        success: true,
      });
    }
  } catch (error) {
    res.status(getErrorStatusCode(error)).json({
      error,
      data: undefined,
      success: false,
    });
  }
});

// Edit a user
app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, username, firstName, lastName } = req.body;
    if (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !req.params ||
      !userId ||
      isNaN(parseInt(userId))
    ) {
      throw Errors.ValidationError;
    }
    const targetUser = await findUser(parseInt(userId), {
      email,
      username,
      firstName,
      lastName,
    });
    res.status(200).json({
      error: undefined,
      data: targetUser,
      success: true,
    });
  } catch (error) {
    res.status(getErrorStatusCode(error)).json({
      error,
      data: undefined,
      success: false,
    });
  }
});

// Find a user by email
app.get("/users", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw Errors.ValidationError;
    }
    const targetUser = await findUserByEmail(email.toString())
    if(!targetUser) {
      throw Errors.UserNotFound
    }
    res.status(200).json({
      error: undefined,
      data: targetUser,
      success: true
    })
  } catch (error) {
    res.status(getErrorStatusCode(error)).json({
      error,
      data: undefined,
      success: false
    })
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.info("Server is listening on port: ", PORT);
});
