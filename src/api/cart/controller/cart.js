const {
  createCart,
  findCartById,
  updateCart,
  getPricesFromListOfProducts,
} = require('../../../data/cart/cart.repository');

module.exports = {
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
  },
  async store(req, res, next) {
    try {
      let cart = req.body;
      // calculate price, vat , subtotal, total, ...
      if (cart.couponsId) {
        const prices = await getPricesFromListOfProducts(cart.couponsId);
        const subtotal = prices.reduce((acc, item) => acc + item, 0);
        const vat = subtotal * 0.19;
        const total = subtotal + vat;
        cart = { ...cart, subtotal, vat, total };
      }
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
  },
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
  },
};
