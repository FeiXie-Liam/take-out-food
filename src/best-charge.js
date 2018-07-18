const OrderItem = require('./orderItem')
const Order = require('./order')
function bestCharge(selectedItems) {
  let itemsCount = getItemsCount(selectedItems);

  let ids = Object.keys(itemsCount);
  let orderItems = []
  for (let i = 0; i < ids.length; ++i) {
    let orderItem = new OrderItem(ids[i], itemsCount[ids[i]]);
    orderItems.push(orderItem);
  }

  order = new Order(orderItems);

  let result = order.printOrder();

  return result;
}

function getItemsCount(inputs) {
  let itemsCount = new Map()
  inputs.forEach(item => {
    splitedItem = item.split(' x ');
    itemsCount[splitedItem[0]] = parseInt(splitedItem[1], 10);
  })
  return itemsCount;
}

module.exports = {
  bestCharge: bestCharge,
  getItemsCount: getItemsCount
}
