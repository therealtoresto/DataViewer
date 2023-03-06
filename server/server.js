import express from 'express';
import parser from 'body-parser';
import { connectToDb } from './db/mongodb.js';
import {
  createUser,
  getUsers,
  getUserById
} from './controllers/user.js';
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./config.json"));

const { development } = config;
const { json } = parser;
const port = development.port;

const app = express();
app.use(json());
connectToDb();

app.get('/', (req, res) => {
  res.send('<h1>Hello there 👋🏻✨!</h1>');
});


app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);

app.listen(port || 8001, () => {
  console.log(`Server is started on ${port || 8001} 🎛️`)
});