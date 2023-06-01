const express = require('express');
const categoryRouter = express.Router();
const app = require('../app')
const categoryService = require('./category.service');
// const express = require("express");
// const app = express();
// const router = express.Router();

let categories = [];
categoryRouter.post('/createCategory',(req,res)=>{
    const result = categoryService(req.body);
    categories.push(newCategory);
    res
    .status(200)
    .json({ message: "category created successfully", data: newCategory });
})