const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
        },
        qtd: Number,
      },
    ],
    couponsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'coupon',
      },
    ],
    discount: Number,
    subTotal: Number,
    vat: Number,
    total: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const CartModel = mongoose.model('cart', CartSchema);

module.exports = CartModel;
