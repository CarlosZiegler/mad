const {
  createProduct,
  findProductById,
  findProductByName,
  getAllProducts,
} = require('../../../data/product/product.repository');

module.exports = {
  async index(req, res, next) {
    try {
      const { id } = req.params;
      const product = await findProductById(id);
      if (!product) {
        return res.status(404).json({
          message: 'Not found coupon',
        });
      }
      res.json({ product });
    } catch (error) {
      res.json(error);
    }
  },
  async store(req, res, next) {
    try {
      const { name, price, description, inStock } = req.body;
      const product = await findProductByName(name);
      if (product) {
        // return 409 to duplicate resource
        return res.status(409).json({
          message: 'Product exist',
        });
      }

      const result = await createProduct({ name, price, description, inStock });
      if (!result) {
        return res.status(500).json({
          message: 'Error while create coupon',
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res, next) {
    try {
      const products = await getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  },
};
