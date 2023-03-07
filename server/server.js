import express from 'express';
import parser from 'body-parser';
import cookie from 'cookie-parser';
import { connectToDb } from './db/mongodb.js';
import { readFileSync } from "fs";
import { userRouter } from './routes/user.js'
import { loginRouter } from './routes/login.js';
import { signinRouter } from './routes/signin.js';

const config = JSON.parse(readFileSync("./config.json"));

const { development } = config;
const { json } = parser;
const port = development.port;

const app = express();
app.use(cookie());
app.use(json());
connectToDb();

app.get('/', (req, res) => {
  res.send('<h1>Hello there 👋🏻✨!</h1>');
});
app.use(loginRouter);
app.use(userRouter);
app.use(signinRouter);

app.listen(port || 8001, () => {
  console.log(`Server is started on ${port || 8001} 🎛️`)
});