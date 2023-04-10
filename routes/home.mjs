import { Router } from "express";
import mainRepo from "../repository/mainRepository.mjs";
import ipfsRepo from "../repository/ipfsRepository.mjs";
import mainRepository from "../repository/mainRepository.mjs";
import ipfsRepository from "../repository/ipfsRepository.mjs";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("<h1>Hello IPFS users</h1>");
});

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

routes.get("/get/:filename", async (req, res) => {
  const result = await mainRepository.getByName(req.params.filename);
  res.send(result);
});

routes.delete("/remove/:cid", async (req, res) => {
  try {
    await ipfsRepository.removeData(req.params.cid);
    const result = await mainRepo.deleteData(req.params.cid);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

export default { routes };
