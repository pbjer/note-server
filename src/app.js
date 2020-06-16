import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import notes from './routes/notes';
import auth from './routes/auth';

const app = express();

// middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors({
  origin: [`${process.env.CLIENT_URL}`],
  credentials: true,
}));
app.use(express.json());

// mount routes
app.use('/user', notes);
app.use('/auth', auth);

// start the server
app.listen( process.env.SERVER_PORT, () => {
  console.log(`server started at http://localhost:${process.env.SERVER_PORT}`);
});
