const express = require("express");
const menTopFabricRouter = express.Router();
const multer = require("multer");
const {
  getFabricListQuantity,
  getTshirtQuantity,
} = require("../controllers/menTopfabricController.js");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

menTopFabricRouter.post("/menTopFabric/fabricQuantity", upload.fields([{ name: 'userFile' } , { name: 'tshirtFile' } ]), getFabricListQuantity);
menTopFabricRouter.get("/menTopFabric/getTshirtQuantity/:comapnyName", getTshirtQuantity);


module.exports =  menTopFabricRouter;