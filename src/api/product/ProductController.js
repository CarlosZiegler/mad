const {
  createProduct,
  findProductById,
  findProductByName,
  getAllProducts,
} = require('../../data/product/product.repository');

const Product = require('../../data/product/product.entity');

class ProductController {
  async index(req, res, next) {
    try {
      const { id } = req.params;
      const found = await findProductById(id);
      if (!found) {
        return res.status(404).json({
          message: 'Not found coupon',
        });
      }
      const product = new Product(found);
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }
  async store(req, res, next) {
    try {
      const data = req.body;

      const product = await findProductByName(data.name);
      if (product) {
        // return 409 to duplicate resource
        return res.status(409).json({
          message: 'Product exist',
        });
      }
      const newProduct = new Product(data).withoutId();

      const result = await createProduct(newProduct);
      if (!result) {
        //internal error
        return res.status(500).json({
          message: 'Error while create product',
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async show(req, res, next) {
    try {
      const result = await getAllProducts();
      const products = result.map((item) => new Product(item));
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ProductController;
