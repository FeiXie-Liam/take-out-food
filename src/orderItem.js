const loadAllItems = require('./items')

module.exports = class OrderItem{
  constructor(id, count){
    this.id = id;
    this.count = count;
    let items = loadAllItems();
    let curItem = items.find(item=>item.id === id);
    this.name = curItem.name;
    this.price = curItem.price;
  }
}