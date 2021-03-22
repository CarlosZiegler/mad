const {
  createCart,
  findCartById,
  updateCart,
  deleteCart,
  getAllCarts,
} = require('../../data/cart/cart.repository');

const Cart = require('../../data/cart/cart.entity');

class CartController {
  async show(req, res, next) {
    try {
      const result = await getAllCarts();
      const carts = result.map((item) => new Cart(item));
      res.json(carts);
    } catch (error) {
      res.json(error);
    }
  }
  async index(req, res, next) {
    try {
      const { id } = req.params;
      const found = await findCartById(id);
      if (!found) {
        return res.status(404).json({
          message: 'Not found cart',
        });
      }
      const cart = new Cart(found);
      res.json(cart);
    } catch (error) {
      res.json(error);
    }
  }

  async store(req, res, next) {
    try {
      let data = req.body;
      const cart = await Cart.buildCartWithCalculations(data);

      const result = await createCart(cart.withoutId());
      if (!result) {
        return res.status(500).json({
          message: 'Error while create cart',
        });
      }
      const createdCart = new Cart(result);

      return res.status(200).json(createdCart);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const cart = await Cart.buildCartWithCalculations(data);

      const result = await updateCart(id, cart);
      if (result.nModified !== 1) {
        return res.status(500).json({
          message: 'Error while update cart',
        });
      }
      return res.status(200).json({ message: 'Cart updated' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Error while update cart, cart not found',
      });
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
