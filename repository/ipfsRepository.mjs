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

/* Test functions */

const addPinOnPinata = async () => {
  await ipfs.pin.remote.service.add("pinata", {
    endpoint: new URL("https://api.pinata.cloud"),
    key: process.env.JWT,
  });
};

const removePinata = async () => {
  await ipfs.pin.remote.service.rm("pinata");
};

const addOnAllRemotes = async (_cid) => {
  ipfs.pin.remote.add(_cid);
};

export default { postData, removeData };
