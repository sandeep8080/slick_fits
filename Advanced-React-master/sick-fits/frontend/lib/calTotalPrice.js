export default function calTotalPrice(cart) {
  return cart.reduce((total, cartItem) => {
    if (!cartItem.product) return total;
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);
}
