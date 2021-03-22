const ClassBase = require('../ClassBase');

class Coupon extends ClassBase {
  constructor(data) {
    super(data);
    this.code = data.code;
    this.value = data.value;
    this.availableUntil = data.availableUntil;
  }
}

module.exports = Coupon;
