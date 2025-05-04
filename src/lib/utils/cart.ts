import { FastOrder_CartItem, Refill_CartItem, StockProduct } from "@/types/api-types";

export function getFastOrderCartProps(fastOrderItems: FastOrder_CartItem[]) {
  let originalPrice = 0;
  let discount = 0;
  fastOrderItems.forEach(({ price, cartQuantity, totalDiscount }) => {
    originalPrice += price * cartQuantity;
    discount += totalDiscount;
  });
  const finalPrice = originalPrice - discount;
  return { originalPrice, discount, finalPrice };
}

export function expandCartProduct(product: StockProduct, cartQuantity: number): FastOrder_CartItem {
  const newPrice = product.price - (product.price * product.discountPercentage) / 100;
  const totalPrice = newPrice * cartQuantity;
  const totalDiscount = product.price * cartQuantity - totalPrice;
  return { ...product, cartQuantity, newPrice, totalPrice, totalDiscount };
}

export function getRefillCartProps(refillItems: Refill_CartItem[]) {
  let totalPrice = 0;
  refillItems.forEach(({ purchasePrice, cartQuantity }) => {
    totalPrice += purchasePrice * cartQuantity;
  });
  return { totalPrice };
}
