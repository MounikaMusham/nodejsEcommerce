const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const ecommerce = require('./service');
const path = require('path');
const fs = require("fs");
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
 let categories = ecommerce.categories;

//create categories 

router.post("/categories", (req, res) => {
  if (!req.body || !req.body.categoryName) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  let newCategory = ecommerce.createCategory(req.body)
  res.status(200).json({ message: "Category created successfully", data: newCategory });
});


//create products under categories
router.post("/categories/products", upload.single("image"), (req, res) => {
  let newProduct = ecommerce.createProducts(req.body,res,req.file);
  res.status(200).json({ message: "product created successfully", data: newProduct });
});


// get categories
router.get("/categories", (req, res) => {
  const { categoryName } = req.query;
  if (categoryName) {
    const filteredCategories = ecommerce.getCategories(categories,categoryName);
    res.status(200).json({message: "category fetched successfully",data: filteredCategories});
  } else {
    res.status(400).json({ message: "categories successfully", status:'false' });
  }
});

//filters
router.get("/categories/products", (req, res) => {
  let filteredProducts = ecommerce.getProducts(req.query)
  res.status(200).json({message: "products filtered successfully",data: filteredProducts});
});

module.exports =  router;