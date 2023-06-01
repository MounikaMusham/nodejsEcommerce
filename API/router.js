const express = require('express');
// const categories = require('./categories/category.route');
// const products = require('./products/products.route');
//const express = require('express');
const app = express();
//const app = require('./app');


//app.use(express.urlencoded({extended:false}))

const Router = express();

const categories = require('./categories/category.route');
app.use(express.json());

Router.use('/category',categories);


module.exports = Router;