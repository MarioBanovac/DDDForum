import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async(req: Request, res: Response) => {
  //...
})

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  //...
})

// Find a user by email
app.get('/users', async(req: Request, res: Response) => {
 //...
})

const PORT = 3000

app.listen(PORT, () => {
  console.info('Server is listening on port: ', PORT)
})


