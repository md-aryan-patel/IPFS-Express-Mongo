import { CID, create } from "ipfs-http-client";
import fs from "fs";
import "dotenv/config";

const ipfs = create("http://127.0.0.1:5001");

const postData = async (_file) => {
  const buffer = fs.readFileSync(process.env.PUBLIC_FOLDER + _file);
  const result = await ipfs.add(buffer);
  return result;
};

const removeData = async (_cid) => {
  const result = await ipfs.pin.rm(CID.parse(_cid));
  return result;
};

export default { postData, removeData };
