const goods = [
  { title: 'Shirt', price: 150, img: 'url(img/shirt.jpg)' },
  { title: 'Socks', price: 50, img: 'url(img/socks.jpg)' },
  { title: 'Jacket', price: 350, img: 'url(img/jacket.jpg)' },
  { title: 'Shoes', price: 250, img: 'url(img/shoes.jpg)' },
];

class GoodsItem {
  constructor({title = "Товар", price = "0", img = 'gray'}) {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render () {
    return `
    <div class="goods-item" style = "background: ${this.img} center / cover;">
      <div class = "goods-item-info">
        <div class = "goods-item-title">${this.title}:</div>
        <div class = "goods-item-price">${this.price} &#8364</div>
      </div>
      <div class="goods-item-add">Добавить</div>
    </div>`;
  }
}

class GoodsList {
  list = [];
  fetchGoods () {
    this.list = goods;
  }
  render () {
    let goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
  sum () {
    let result = this.list.reduce((sum, current) => sum + current.price ,0);
    document.querySelector('.goods-list-sum').innerHTML = `Суммарная стоимость всех товаров ${result}`;
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
goodsList.sum();