// const express = require("express");
// const app = express();
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// app.use(express.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (!fs.existsSync(__dirname + "/temp")) {
//       fs.mkdirSync(__dirname + "/temp");
//     }
//     cb(null, "temp/"); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); 
//   },
// });

// const upload = multer({ storage: storage });
// let categories = [];
// router.post("/categories", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({
//         error: "Category name is required",
//         status: "Failed",
//         statusCode: 400,
//       });
//   }
//   const newCategory = {
//     id: categories.length + 1,
//     name,
//     products: [],
//   };
//   categories.push(newCategory);
//   res
//     .status(200)
//     .json({ message: "category created successfully", data: newCategory });
// });

// router.post("/categories/products", upload.single("image"), (req, res) => {
//   const { categoryId, name, color, size, price } = req.body;
//   const id = parseInt(categoryId);
//   const uploadedImage = req.file;
//   if (!name || !color || !size || !price || !categoryId) {
//     return res
//       .status(400)
//       .json({
//         error: "Mandatory fields are missing",
//         status: "Failed",
//         statusCode: 400,
//       });
//   }
//   const category = categories.find((category) => category.id === id);
//   if (!category) {
//     return res
//       .status(400)
//       .json({ error: "Category not found", status: "Failed", statusCode: 400 });
//   }

//   const newProduct = {
//     id: category.products.length + 1,
//     categoryId,
//     name,
//     color,
//     size,
//     price,
//     image: uploadedImage,
//   };
//   if (category.products) {
//     category.products.push(newProduct);
//   } else {
//     category.products = [];
//     category.products.push(newProduct);
//   }

//   res
//     .status(200)
//     .json({ message: "product created successfully", data: newProduct });
// });
// router.get("/categories", (req, res) => {
//   const { name } = req.query;

//   if (name) {
//     const filteredCategories = categories.filter((category) =>
//       category.name.toLowerCase().includes(name)
//     );
//     res.status(200).json({
//       message: "category fetched successfully",
//       data: filteredCategories,
//     });
//   } else {
//     res
//       .status(400)
//       .json({ message: "categories successfully", status:'false' });
//   }
// });

// router.get("/categories/products", (req, res) => {
//   const { categoryId, color, size, n, nthProduct } = req.query;
//   const id = parseInt(categoryId);
//   const category = categories.find((c) => c.id === id);
//   if (!category) {
//     return res
//       .status(400)
//       .json({ error: "Category not found", status: "Failed", statusCode: 400 });
//   }

//   let filteredProducts = category.products;
//   if (color || size) {
//     try {
//       filteredProducts = filteredProducts.filter(
//         (product) =>
//           product.color.toLowerCase().includes(color) ||
//           product.size.toLowerCase().includes(size)
//       );
//     } catch (error) {
//       // res.status(404).json({ error: 'color not found' });
//     }
//   }
//   if (n || nthProduct) {
//     try {
//       const sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
//       if (n) {
//         filteredProducts = sortedProducts.slice(0, n);
//       }
//       if (nthProduct) {
//         filteredProducts = sortedProducts[nthProduct - 1];
//       }
//     } catch (error) {}
//   }
//   res.status(200).json({
//     message: "products filtered successfully",
//     data: filteredProducts,
//   });
// });

// // router.get("/categories", (req, res) => {
// //   const { name, color, size, top5, NthHighest } = req.query;
// //   let filteredCategories = categories;
// //   //category filter
// //     if (name) {
// //       const categoryName = name;
// //       filteredCategories = categories.filter(
// //         (category) => category.name === categoryName
// //       );
// //       res.json(filteredCategories);
// //     }
// // // color or size filter
// //     if(color || size){
// //       const category = categories.find((c) => c.name === name);

// //     if (!category) {
// //       return res.status(404).json({ error: 'Category not found' });
// //     }
// //     let filteredProducts = category.products;
// //     if (color) {
// //       filteredProducts = filteredProducts.filter((product) =>
// //         product.color.toLowerCase().includes(color.toLowerCase())
// //       );
// //     }
// //     if (size) {
// //       filteredProducts = filteredProducts.filter((product) =>
// //         product.size.toLowerCase().includes(size.toLowerCase())
// //       );
// //     }
// //     res.json(filteredProducts);
// //   }
// //  //top 5 highest price filter
// //  if(top5){
// //   const category = categories.find((c) => c.name === name);

// //   if (!category) {
// //     return res.status(404).json({ error: 'Category not found' });
// //   }
// //   const n=top5
// //   const sortedProducts = category.products.sort((a, b) => b.price - a.price);
// //   const top5Products = sortedProducts.slice(0, n);

// //   res.json(top5Products);
// //  }
// // //nth highest product
// // if(NthHighest){
// //   const category = categories.find((c) => c.name === name);

// //   if (!category) {
// //     return res.status(404).json({ error: 'Category not found' });
// //   }

// //   const sortedProducts = category.products.sort((a, b) => b.price - a.price);
// //   const nthHighestProducts = sortedProducts.slice(0, NthHighest);

// //   res.json(nthHighestProducts);
// // }

// //   //  res.json(categories);
// //   // res.json(filteredCategories);
// // });

// module.exports = router;
