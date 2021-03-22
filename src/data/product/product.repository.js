// some functions to get values from db
const Product = require('./product.model');

const findProductById = async (id) => {
  return await Product.findOne({ _id: id });
};
const findProductByName = async (name) => {
  return await Product.findOne({ name });
};
const createProduct = async (product) => {
  return await Product.create(product);
};
const getAllProducts = async () => {
  return await Product.find();
};

module.exports = {
  findProductById,
  createProduct,
  findProductByName,
  getAllProducts,
};
