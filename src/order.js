// const PromotionInfo = require('./promotionInfo')
// const OrderItem = require('./orderItem');

module.exports = class Order {
  constructor(orderItems) {
    this.orderItems = orderItems;
  }

  getTotalPrice() {
    return this.orderItems.reduce((sum, orderItem) =>
      sum += orderItem.price * orderItem.count, 0);
  }
}