const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    productsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
        unique: true,
      },
    ],
    couponsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'coupon',
        unique: true,
      },
    ],
    subtotal: Number,
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
