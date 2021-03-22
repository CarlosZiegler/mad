const ClassBase = require('../ClassBase');
const { getCouponsFromListOfCoupons } = require('../coupon/coupon.repository');
const { getPricesFromListOfProducts } = require('./cart.repository');

class Cart extends ClassBase {
  constructor(data) {
    super(data);
    this.products = data.products;
    this.couponsId = data.couponsId;
    this.subTotal = data.subTotal;
    this.discount = data.discount;
    this.vat = data.vat;
    this.total = data.total;
  }

  static async buildCartWithCalculations(cart) {
    const subTotal = await calculateSubtotal(cart.products);
    const discount = await calculateDiscount(cart.couponsId);
    const vat = (subTotal - discount) * 0.19;
    const total = subTotal - discount + vat;
    return new Cart({ ...cart, subTotal, discount, vat, total });
  }
}

async function calculateSubtotal(products) {
  if (products.length > 0) {
    const prices = await getPricesFromListOfProducts(products);
    const subtotal = prices.reduce((acc, item) => acc + item, 0);
    return subtotal;
  }
  return 0;
}

async function calculateDiscount(couponsId) {
  if (couponsId.length > 0) {
    const prices = await getCouponsFromListOfCoupons(couponsId);
    const totalDiscount = prices.reduce((acc, item) => acc + item, 0);
    return totalDiscount;
  }
  return 0;
}

module.exports = Cart;
