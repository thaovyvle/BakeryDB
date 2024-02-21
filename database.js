import { MongoClient } from 'mongodb'

let dbConnection

export const connectToDb = (cb) => {
  MongoClient.connect("mongodb://localhost:37017/project3")
    .then((client) => {
      dbConnection = client.db();
      console.log("Database connected")
      return cb;
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

export const getDb = () => dbConnection;