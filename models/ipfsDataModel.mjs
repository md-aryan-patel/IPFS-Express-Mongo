import mongoose from "mongoose";

const IPFSSchems = mongoose.Schema({
  name: String,
  path: { type: String, unique: true },
  cid: String,
  size: Number,
});

export default mongoose.model("Data", IPFSSchems);
