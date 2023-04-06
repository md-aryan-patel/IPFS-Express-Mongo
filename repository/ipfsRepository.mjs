import { create } from "ipfs-http-client";
import fs from "fs";
import "dotenv/config";

const ipfs = create("https://gateway.pinata.cloud/ipfs/");

const postData = async (_file) => {
  const buffer = fs.readFileSync(process.env.PUBLIC_FOLDER + _file);
  const result = await ipfs.add(buffer);
  return result;
};

export default { postData };
