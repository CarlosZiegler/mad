// some functions to get values from db
const Coupon = require('./coupon.model');

const findCouponByCode = async (code) => {
  return await Coupon.findOne({ code });
};
const findCouponById = async (id) => {
  return await Coupon.findOne({ _id: id });
};
const createCoupon = async (coupon) => {
  return await Coupon.create(coupon);
};

const getCouponsFromListOfCoupons = async (coupons) => {
  try {
    return await Promise.all(
      coupons.map(async (couponId) => {
        const found = await findCouponById(couponId);
        return found.value;
      })
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  findCouponByCode,
  createCoupon,
  getCouponsFromListOfCoupons,
};
