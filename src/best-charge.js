function bestCharge(selectedItems) {
  let itemsCount = getItemsCount(selectedItems);
  return /*TODO*/;
}

function getItemsCount(inputs){
  let itemsCount = new Map()
  inputs.forEach(item => {
    splitedItem = item.split(' x ');
    itemsCount[splitedItem[0]] = parseInt(splitedItem[1], 10);
  })
  return itemsCount;
}

module.exports = {
  bestCharge:bestCharge,
  getItemsCount:getItemsCount
}
