import { FastOrder_CartItem, ProductPricingType, Refill_CartItem, StockProduct } from "@/types/api-types";

export function getFastOrderCartProps(fastOrderItems: FastOrder_CartItem[]) {
  let originalPrice = 0,
    discount = 0,
    originalIndiPrice = 0,
    indiDiscount = 0,
    originalMerchPrice = 0,
    merchDiscount = 0;

  fastOrderItems.forEach(({ totalPrice, totalIndiPrice, totalMerchPrice, totalDiscount, totalIndiDiscount, totalMerchDiscount }) => {
    originalPrice += totalPrice;
    discount += totalDiscount;
    originalIndiPrice += totalIndiPrice;
    indiDiscount += totalIndiDiscount;
    originalMerchPrice += totalMerchPrice;
    merchDiscount += totalMerchDiscount;
  });

  const finalPrice = originalPrice - discount;
  const finalIndiPrice = originalIndiPrice - indiDiscount;
  const finalMerchPrice = originalMerchPrice - merchDiscount;
  const currency = fastOrderItems[0]?.branch.currency;

  return { originalPrice, discount, originalIndiPrice, indiDiscount, originalMerchPrice, merchDiscount, finalPrice, finalIndiPrice, finalMerchPrice, currency };
}

export function expandCartProduct(product: StockProduct, cartQuantity: number): FastOrder_CartItem {
  const newPrice = product.price - (product.price * product.discountPercentage) / 100;
  const totalPrice = newPrice * cartQuantity;
  const totalDiscount = product.price * cartQuantity - totalPrice;

  const newIndiPrice = product.indiPrice - (product.indiPrice * product.discountPercentage) / 100;
  const totalIndiPrice = newIndiPrice * cartQuantity;
  const totalIndiDiscount = product.indiPrice * cartQuantity - totalIndiPrice;

  const newMerchPrice = product.merchPrice - (product.merchPrice * product.discountPercentage) / 100;
  const totalMerchPrice = newMerchPrice * cartQuantity;
  const totalMerchDiscount = product.merchPrice * cartQuantity - totalMerchPrice;

  return { ...product, cartQuantity, newPrice, totalPrice, totalDiscount, newIndiPrice, totalIndiPrice, totalIndiDiscount, newMerchPrice, totalMerchPrice, totalMerchDiscount };
}

export function getRefillCartProps(refillItems: Refill_CartItem[]) {
  let totalPrice = 0;
  refillItems.forEach(({ purchasePrice, cartQuantity }) => {
    totalPrice += purchasePrice * cartQuantity;
  });
  return { totalPrice };
}

export function switchPrices(type: ProductPricingType, indi: number, merch: number, standard?: number) {
  return type == "indi" ? indi : type == "merch" ? merch : standard!;
}
