const express = require("express");
const multer = require("multer");
const sellerRouter = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware.js");

const {
  addCustomer,
  allCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  addFabricStock,
  updateFabricStock,
  deleteFabricStock,
  getProductListByBrandSize,
  getFabricStock,
  getFabricStocks,
  saveBrandSize,
  deleteFabricCategory,
  saveFabricCategory,
  getFabricCategory,
  loginSeller,
  getFabricBrand,
  deleteFabricBrand,
  getSellerCustomers,
  sellerRequestForm,
  sellerRequestFormList,
  updateFabricBrand
} = require("../controllers/sellerController.js");

const {
  protect,
  ensureSeller,
  ensureGuest,
  validateId,
} = require("../middleware/authMiddleware.js");
const { addNewItem, sellerBrandsInDB } = require("../controllers/products/addNItem.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
sellerRouter.get("/seller/addNewItem", ensureSeller, addNewItem)
sellerRouter.get("/seller/allBrandInDB", ensureSeller, sellerBrandsInDB)
sellerRouter.post("/seller/signup", protect, ensureSeller);
sellerRouter.post("/seller/customer/:id", protect, ensureSeller, addCustomer);
sellerRouter.get("/seller/customers/:id", protect, ensureSeller, allCustomers);
sellerRouter.get(
  "/seller/customer/:customerid/:sellerId",
  protect,
  ensureSeller,
  getCustomer
);
sellerRouter.put("/seller/customer/:id", protect, ensureSeller, updateCustomer);
sellerRouter.delete(
  "/seller/customer/:id",
  protect,
  ensureSeller,
  deleteCustomer
);
sellerRouter.post(
  "/seller/fabric/stock/:sellerId",
  protect,
  ensureSeller,
  upload.single("Image"),
  addFabricStock
);
sellerRouter.get(
  "/seller/fabric/stock/:stockId",
  protect,
  // ensureSeller,
  getFabricStock
);
sellerRouter.get(
  "/seller/fabric/stocks/:sellerId",
  protect,
  ensureSeller,
  getFabricStocks
);
sellerRouter.put(
  "/seller/fabric/stock/:sellerId",
  protect,
  ensureSeller,
  upload.single("Image"),
  updateFabricStock
);
sellerRouter.delete(
  "/seller/fabric/stock/:stockId",
  protect,
  ensureSeller,
  deleteFabricStock
);
sellerRouter.post(
  "/seller/fabric/filterd-products/:sellerId",
  protect,
  ensureSeller,
  getProductListByBrandSize
);
sellerRouter.post(
  "/seller/brandSize/:sellerId",
  protect,
  ensureSeller,
  saveBrandSize
);
sellerRouter.post(
  "/seller/fabric/category/:sellerId",
  protect,
  ensureSeller,
  saveFabricCategory
);
sellerRouter.delete(
  "/seller/fabric/category/:categoryId",
  protect,
  ensureSeller,
  deleteFabricCategory
);
sellerRouter.get(
  "/seller/fabric/category/:sellerId",
  protect,
  ensureSeller,
  getFabricCategory
);
sellerRouter.post("/seller/login", ensureGuest, loginSeller);
sellerRouter.get("/seller/:sellerId", protect, getSellerCustomers);
sellerRouter.get(
  "/seller/fabric/brand/:sellerId",
  protect,
  ensureSeller,
  getFabricBrand
);
sellerRouter.delete(
  "/seller/fabric/brand/:brandId",
  protect,
  ensureSeller,
  deleteFabricBrand
);
sellerRouter.put(
  "/update/fabric/brand/:brandId",


  updateFabricBrand
);

sellerRouter.post("/seller-request", protect, upload.single("profile_image"), sellerRequestForm);
sellerRouter.get("/admin/receiveSellerRequest", sellerRequestFormList);




module.exports = sellerRouter;
