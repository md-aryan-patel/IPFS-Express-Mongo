import mongoose from "mongoose";
import Data from "../models/ipfsDataModel.mjs";
import "dotenv/config";

mongoose.connect(process.env.MONGO_BASE + "IPFS");

const postData = (data) => {
  try {
    const result = Data.insertMany(data);
    return result;
  } catch (err) {
    console.log("An error occured... " + err.message);
  }
};

const getAllData = () => {
  const data = Data.find();
  return data;
};

export default { postData, getAllData };
