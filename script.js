const goods = [
  { title: 'Shirt', price: 150, img: 'url(img/shirt.jpg)' },
  { title: 'Socks', price: 50, img: 'url(img/socks.jpg)' },
  { title: 'Jacket', price: 350, img: 'url(img/jacket.jpg)' },
  { title: 'Shoes', price: 250, img: 'url(img/shoes.jpg)' },
];

const renderGoodsItem = (title = "Товар", price = "0", img = 'gray') => {
  return `
    <div class="goods-item" style = "background: ${img} center / cover;">
      <div class = "goods-item-info">
        <div class = "goods-item-title">${title}:</div>
        <div class = "goods-item-price">${price} &#8364</div>
      </div>
      <div class="goods-item-add">Добавить</div>
    </div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
  document.querySelector('.goods-list').innerHTML = goodsList.join(''); // .join('') - Убираем запятые (разделитель массива ",")
}

renderGoodsList(goods);