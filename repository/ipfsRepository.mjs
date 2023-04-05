import { create } from "ipfs-http-client";
import fs from "fs";
import "dotenv/config";

const ipfs = create("http://127.0.0.1:5001");

const postData = async (_file) => {
  const buffer = fs.readFileSync(process.env.PUBLIC_FOLDER + _file);
  const result = await ipfs.add(buffer);
  console.log(result);
  return result;
};

export default { postData };
