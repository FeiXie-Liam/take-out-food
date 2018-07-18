const PromotionInfo = require('./promotionInfo')
// const OrderItem = require('./orderItem');
const loadPromotions = require('./promotions')

module.exports = class Order {
  constructor(orderItems) {
    this.orderItems = orderItems;
  }

  getTotalPrice() {
    return this.orderItems.reduce((sum, orderItem) =>
      sum += orderItem.price * orderItem.count, 0);
  }

  getPromotedInfo() {
    let promotions = loadPromotions();

    let specHalfItems = promotions[1].items;
    let specHalfPrice = 0;
    specHalfItems.forEach(item => {
      let cur_item = this.orderItems.find(orderItem => orderItem.id === item);
      if (cur_item !== undefined) {
        specHalfPrice += cur_item.price * cur_item.count / 2;
      }
    })
    let fullReducePrice = Math.floor(this.getTotalPrice() / 30) * 6;

    if (fullReducePrice >= specHalfPrice) {
      return new PromotionInfo(promotions[0].type, fullReducePrice);
    }
    return new PromotionInfo(promotions[1].type + "(黄焖鸡，凉皮)", specHalfPrice);
  }

  printOrder() {
    let msg = "============= 订餐明细 =============\n";
    this.orderItems.forEach(orderItem => {
      msg += `${orderItem.name} x ${orderItem.count} = ${orderItem.price * orderItem.count}元\n`;
    })
    let promotedInfo = this.getPromotedInfo();
    if (promotedInfo.price !== 0) {
      msg += '-----------------------------------\n';
      msg += '使用优惠:\n';
      msg += `${promotedInfo.type}，省${promotedInfo.price}元\n`;
    }
    msg += '-----------------------------------\n';
    msg += `总计：${this.getTotalPrice() - promotedInfo.price}元\n`;
    msg += '===================================';
    return msg;
  }
}