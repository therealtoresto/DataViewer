import mongoose from 'mongoose';
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./config.json"));
const { connect } = mongoose;
const { development } = config;
const { username, password, db_name } = development;

const uri = `mongodb+srv://${username}:${password}
@cluster0.qvvopo6.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await connect(uri);
    console.log('Server is connected to MongoDB 🌱');
  }
  catch(err) {
    if (err) {
      console.log(err);
    }
  }
}

export { connectToDb };