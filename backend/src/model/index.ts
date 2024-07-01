import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient()

interface IUserInput {
  email: string,
  username: string,
  firstName: string,
  lastName: string
}



export const createUser = async(userInput: IUserInput) => {
  try {
    const user = await prisma.user.create({
      data : userInput}) 
      const userCopy = JSON.parse(JSON.stringify(user))
      delete userCopy.password
      return userCopy
  } catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      if(e.meta?.target) {
        return `${e.meta?.target} is already in use`
      }
      return 'Something went wrong!'
    }
  }
}

export const findUser = async(emailToSearch: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: emailToSearch
    }
  })
  return user
}
