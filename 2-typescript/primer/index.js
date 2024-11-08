let stock = {
  item: "Beer",
  _price: 1.25,
  _quantity: 100,

  set price(newPrice) {
    this._price = newPrice;
  },

  get price() {
    return this._price;
  },

  set quantity(newQuantity) {
    this._quantity = newQuantity;
  },

  get quantity() {
    return this._quantity;
  },

  get worth() {
    return this._price * this._quantity;
  },
};

console.log(`stock worth before: ${stock.worth}`);
stock.price *= 1.03; // inflation
stock.quantity += 100; // hoarding
console.log(`stock worth after: ${stock.worth}`);
