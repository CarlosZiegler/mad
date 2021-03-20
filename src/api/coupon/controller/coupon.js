const {
  findCouponByCode,
  createCoupon,
} = require('../../../data/coupon/coupon.repository');

module.exports = {
  async index(req, res, next) {
    try {
      const { code } = req.params;
      const coupon = await findCouponByCode(code);
      if (!coupon) {
        return res.status(404).json({
          message: 'Not found coupon',
        });
      }
      res.json({ coupon });
    } catch (error) {
      res.json(error);
    }
  },
  async store(req, res, next) {
    try {
      const { code, value, availableUntil } = req.body;
      const coupon = await findCouponByCode(code);
      if (coupon) {
        // return 409 to duplicate resource
        return res.status(409).json({
          message: 'Coupon exist',
        });
      }

      const result = await createCoupon({ code, value, availableUntil });
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
};
