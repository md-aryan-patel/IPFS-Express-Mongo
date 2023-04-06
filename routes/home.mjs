import { Router } from "express";
import mainRepo from "../repository/mainRepository.mjs";
import ipfsRepo from "../repository/ipfsRepository.mjs";

const routes = Router();

routes.post("/push/:filename", async (req, res) => {
  const result = await ipfsRepo.postData(req.params.filename);
  const object = {
    name: req.params.filename,
    path: process.env.IPFS_BASE + result.path,
    cid: result.cid.toString(),
    size: result.size,
  };
  const data = await mainRepo.postData(object);
  console.log(result);
  res.send(data);
});

routes.get("/getall", async (req, res) => {
  const result = await mainRepo.getAllData();
  res.send(result);
});

export default { routes };
