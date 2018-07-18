const best_charge = require('../src/best-charge')
const OrderItem = require('../src/orderItem')
const Order = require('../src/order')

describe('Take out food', function () {
  let order;
  beforeEach(() => {
    let orderItems = []
    orderItems.push(new OrderItem("ITEM0013", 4));
    orderItems.push(new OrderItem("ITEM0022", 1));
    order = new Order(orderItems);
  })

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = best_charge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = best_charge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should get item count when input item\'s string.', () => {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let realOutput = best_charge.getItemsCount(inputs)
    let expectedOutput = new Map();
    expectedOutput["ITEM0013"] = 4;
    expectedOutput["ITEM0022"] = 1;
    expect(realOutput).toEqual(expectedOutput);
  })

  it('should get order item given item count.', () => {
    let orderItem = new OrderItem("ITEM0013", 4);
    expect(orderItem.id).toEqual('ITEM0013');
    expect(orderItem.name).toEqual('肉夹馍');
    expect(orderItem.price).toEqual(6);
    expect(orderItem.count).toEqual(4);
  })

  it('should return total price given order items', () => {
    expect(order.getTotalPrice()).toEqual(32);
  })

  it('should return promotion info given order items', () => {
    expect(order.getPromotedInfo().type).toEqual("满30减6元");
    expect(order.getPromotedInfo().price).toEqual(6);

  })

});