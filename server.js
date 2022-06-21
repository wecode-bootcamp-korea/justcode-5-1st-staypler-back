import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/user.js';
import mainRouter from './routes/main.js';
import roomRouter from './routes/room.js';
import myPageRouter from './routes/mypage.js';

dotenv.config();
const corsOption = {
  origin: ['http://localhost:3000'],
};

const app = express();
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/main', mainRouter);
app.use('/rooms', roomRouter);
app.use('/mypage', myPageRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
