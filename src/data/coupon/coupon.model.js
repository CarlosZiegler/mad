const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    value: {
      type: Number,
      required: true,
    },
    availableUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const CouponModel = mongoose.model('coupon', CouponSchema);

module.exports = CouponModel;
