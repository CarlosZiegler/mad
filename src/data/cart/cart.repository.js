// some functions to get values from db
const Cart = require('./cart.model');
const { findProductById } = require('../product/product.repository');

const findCartById = async (id) => {
  return await Cart.findOne({ _id: id });
};
const createCart = async (cart) => {
  return await Cart.create(cart);
};
const updateCart = async (id, data) => {
  return await Cart.updateOne({ _id: id }, data);
};

const getPricesFromListOfProducts = async (arrayIds) => {
  try {
    return await Promise.all(
      arrayIds.map(async (id) => {
        const product = await findProductById(id);
        return product.price;
      })
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  findCartById,
  createCart,
  updateCart,
  getPricesFromListOfProducts,
};
