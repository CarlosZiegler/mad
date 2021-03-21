const {
  getCouponsFromListOfCoupons,
} = require('../../data/coupon/coupon.repository');
const {
  getPricesFromListOfProducts,
} = require('../../data/cart/cart.repository');

async function calculateCart(cart) {
  const subTotal = await calculateSubtotal(cart.products);
  const discount = await calculateDiscount(cart.couponsId);
  const vat = (subTotal - discount) * 0.19;
  const total = subTotal - discount + vat;
  return { ...cart, subTotal, discount, vat, total };
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

module.exports = { calculateCart, calculateSubtotal, calculateDiscount };
