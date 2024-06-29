import express, {Request, Response} from 'express';
import cors from 'cors';
import { createUser, findUser } from '../model';

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async(req: Request, res: Response) => {
  const { email, username, firstName, lastName } = req.body
  if(!email || !username || !firstName || !lastName) {
    res.status(400).json({
      message: 'All fields are required!'
    })
  } else {
    const createdUser = await createUser({ email, username, firstName, lastName })
    res.status(200).json(createdUser)
  }
})

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  //...
})

// Find a user by email
app.get('/users', async(req: Request, res: Response) => {
  const { email} = req.body
  if(!email) {
    return res.status(400).json({
      message: 'Email is required!'
    })
  } 
  if(Object.keys(req.body).length > 1) {
    return res.status(400).json({
      message: 'Request contains extra params!'
    })
  }
  const foundUser = await findUser(email)
  res.status(200).json(foundUser)
})

const PORT = 3000

app.listen(PORT, () => {
  console.info('Server is listening on port: ', PORT)
})


