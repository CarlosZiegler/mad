const {
  findCouponByCode,
  createCoupon,
} = require('../../data/coupon/coupon.repository');

const Coupon = require('../../data/coupon/coupon.entity');

class CouponController {
  async index(req, res, next) {
    try {
      const { code } = req.params;
      const found = await findCouponByCode(code);
      if (!found) {
        return res.status(404).json({
          message: 'Not found coupon',
        });
      }
      const coupon = new Coupon(found);
      res.json(coupon);
    } catch (error) {
      res.json(error);
    }
  }

  async store(req, res, next) {
    try {
      const data = req.body;
      const found = await findCouponByCode(data.code);
      if (found) {
        // return 409 to duplicate resource
        return res.status(409).json({
          message: 'Coupon exist',
        });
      }

      const newCoupon = new Coupon(data).withoutId();

      const result = await createCoupon(newCoupon);
      if (!result) {
        return res.status(500).json({
          message: 'Error while create coupon',
        });
      }

      const createdCoupon = new Coupon(result);
      return res.status(200).json(createdCoupon);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CouponController;
