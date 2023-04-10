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

const getByName = async (_name) => {
  const data = await Data.find().where("name").equals(_name);
  return data;
};

const deleteData = async (_cid) => {
  const result = await Data.deleteMany().where("cid").equals(_cid);
  return result;
};

export default { postData, getAllData, getByName, deleteData };
