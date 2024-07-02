import { PrismaClient } from "@prisma/client";
import { Errors } from "../utils/errors";
export const prisma = new PrismaClient()

interface IUserInput {
  email: string,
  username: string,
  firstName: string,
  lastName: string
}



export const createUser = async(userInput: IUserInput) => {
  try {
    
    const existingUserByEmail = await prisma.user.findFirst({where:{
      email: userInput.email
    }})
    
    if(existingUserByEmail) {
      throw Errors.EmailAlreadyInUse
    }
    
    const existingUserByUsername = await prisma.user.findFirst({where: {
      username: userInput.username
    }})
    
    if(existingUserByUsername) {
      throw Errors.UsernameAlreadyTaken
    }
    
    const user = await prisma.user.create({
      data : userInput}) 
      const userCopy = JSON.parse(JSON.stringify(user))
      delete userCopy.password
      return userCopy
  } catch(error) {
    throw error
  }
}

export const findUser = async(userId: number, newUserData: IUserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  
  if (!user) {
    throw Errors.UserNotFound
  }
  
  if (user.username === newUserData.username) {
    throw Errors.UsernameAlreadyTaken
  }
  
  if(user.email === newUserData.email) {
    throw Errors.EmailAlreadyInUse
  }
  
  const newUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: newUserData
  })
  
  const newUserCopy = JSON.parse(JSON.stringify(newUser))
  delete newUserCopy.password
  return newUserCopy
}

export const findUserByEmail = async (email: string) => (
  await prisma.user.findUnique({
    where: {
      email
    }
  })
)
