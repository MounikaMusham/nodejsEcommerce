// const { router } = require('./ecommerceRouter');

let categories = [];
function createCategory(data) {
  const name = data.categoryName;
  let newCategory = {
    id: categories.length + 1,
    categoryName: name,
    products: [],
  };
  categories.push(newCategory);
  return newCategory;
}

function createProducts(data, res, imageFile) {
  const { categoryId, productName, color, size, price } = data;
  if (!productName || !color || !size || !price || !categoryId) {
    return res
      .status(400)
      .json({
        error: "Mandatory fields are missing",
        status: "Failed",
        statusCode: 400,
      });
  }
  const id = parseInt(categoryId);
  const category = categories.find((category) => category.id === id);
  if (!category) {
    return res
      .status(400)
      .json({ error: "Category not found", status: "Failed", statusCode: 400 });
  }
  const uploadedImage = imageFile;
  const newProduct = {
    id: category.products.length + 1,
    categoryId,
    productName,
    color,
    size,
    price,
    image: uploadedImage,
  };
  if (category.products) {
    category.products.push(newProduct);
  } else {
    category.products = [];
    category.products.push(newProduct);
  }
  return newProduct;
}

function getCategories(categories, name) {
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(name)
  );
  return filteredCategories;
}

function getProducts(data) {
  const { categoryId, color, size, n, nthProduct } = data;
  const id = parseInt(categoryId);
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res
      .status(400)
      .json({ error: "Category not found", status: "Failed", statusCode: 400 });
  }

  let filteredProducts = category.products;
  if (color || size) {
    try {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.color.toLowerCase().includes(color) ||
          product.size.toLowerCase().includes(size)
      );
    } catch (error) {}
  }
  if (n || nthProduct) {
    try {
      const sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
      if (n) {
        filteredProducts = sortedProducts.slice(0, n);
      }
      if (nthProduct) {
        filteredProducts = sortedProducts[nthProduct - 1];
      }
    } catch (error) {}
  }
  return filteredProducts;
}

module.exports = {
  categories,
  createCategory,
  createProducts,
  getCategories,
  getProducts,
};
