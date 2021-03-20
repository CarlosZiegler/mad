// some functions to get values from db
const Coupon = require('./coupon.model');

const findCouponByCode = async (code) => {
  return await Coupon.findOne({ code });
};
const createCoupon = async (coupon) => {
  return await Coupon.create(coupon);
};

module.exports = { findCouponByCode, createCoupon };
