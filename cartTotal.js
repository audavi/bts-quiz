function getCartTotal(items) {
  let total = 0;
  // Bug: i <= items.length reads items[items.length] (undefined) -> crash.
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}

module.exports = { getCartTotal };
