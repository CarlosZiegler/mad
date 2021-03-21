const ClassBase = require('../ClassBase');

class Cart extends ClassBase {
  constructor(data) {
    super(data);
    this.products = data.products;
    this.couponsId = data.couponsId;
    this.subtotal = data.subtotal;
    this.vat = data.vat;
    this.total = data.total;
  }
}

module.exports = Cart;
