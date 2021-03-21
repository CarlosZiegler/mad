const {
  createCart,
  findCartById,
  updateCart,
  deleteCart,
  getPricesFromListOfProducts,
} = require('../../data/cart/cart.repository');

class CartController {
  async show(req, res, next) {
    try {
      const carts = await getAllCarts();
      res.json({ carts });
    } catch (error) {
      res.json(error);
    }
  }
  async index(req, res, next) {
    try {
      const { id } = req.params;
      const cart = await findCartById(id);
      if (!cart) {
        return res.status(404).json({
          message: 'Not found cart',
        });
      }
      res.json({ cart });
    } catch (error) {
      res.json(error);
    }
  }

  async store(req, res, next) {
    try {
      let cart = req.body;

      if (cart.products.length > 0) {
        const prices = await getPricesFromListOfProducts(cart.products);
        const subtotal = prices.reduce((acc, item) => acc + item, 0);
        const vat = subtotal * 0.19;
        const total = subtotal + vat;
        cart = { ...cart, subtotal, vat, total };
      }
      // console.log(cart.total);
      const result = await createCart(cart);
      if (!result) {
        return res.status(500).json({
          message: 'Error while create cart',
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await updateCart(id, data);
      if (result.nModified !== 1) {
        throw error;
      }
      return res.status(200).json({ message: 'Cart updated' });
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const result = await deleteCart(id);

      return res.status(201).json({ message: 'Cart Deleted', result });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartController;
