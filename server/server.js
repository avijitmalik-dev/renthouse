import express from 'express';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import testRouter from './routes/test.route.js';
import userRoute from './routes/user.route.js';
dotenv.config();

const app = express();
const port = 8000;
const corsOptions = { 
    origin: process.env.CLIENT_URL, 
    credentials: true,  
}
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);
app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log(`Server is running on this port number:-${port}`);
});
