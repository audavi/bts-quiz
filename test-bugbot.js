function applyDiscount(price, percentOff) {
  if (percentOff < 0 || percentOff > 100) {
    throw new RangeError("percentOff must be between 0 and 100");
  }
  return price - price * (percentOff / 100);
}

module.exports = { applyDiscount };
