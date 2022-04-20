const goods = [
  { title: 'Shirt', price: 150, img: 'url(img/shirt.jpg)' },
  { title: 'Socks', price: 50, img: 'url(img/socks.jpg)' },
  { title: 'Jacket', price: 350, img: 'url(img/jacket.jpg)' },
  { title: 'Shoes', price: 250, img: 'url(img/shoes.jpg)' },
];
const GET_GOOD_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const GET_GOOD_BASKET = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses//getBasket.json';

const basket = document.querySelector('.basket'),
      basketBtn = document.querySelector('.cart-button');
let basketCount = 0;

basketBtn.addEventListener('click', () => {
  if(basketCount % 2 === 0) {
    basket.classList.add('basket_dblock');
    basketCount ++;
  } else {
    basket.classList.remove('basket_dblock');
    basketCount ++;
  }
})

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  }
}

class GoodsItem {
  constructor({product_name = "Товар", price = "0"}) {
    this.product_name = product_name;
    this.price = price;
  }
  render () {
    return `
    <div class="goods-item" style="border: 1px solid black">
      <div class = "goods-item-info">
        <div class = "goods-item-title">${this.product_name}:</div>
        <div class = "goods-item-price">${this.price} &#8381;</div>
      </div>
      <div class="goods-item-add">Добавить</div>
    </div>`;
  }
}

class GoodsList {
  list = [];
  fetchGoods (callback) {
    service(GET_GOOD_ITEMS, (data) => {
      this.list = data;
      callback();
    });
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
goodsList.fetchGoods(() => {
  goodsList.render();
  goodsList.sum();
});

class GoodsBasketItem {
  constructor({product_name = "Товар", price = "0", quantity = "0"}) {
    this.product_name = product_name;
    this.price = price;
    this.quantity = quantity;
  }
  render () {
    return `
      <div class = "basket-item">
        <div class = "basket-item-title">${this.product_name}</div>
        <div class = "basket-item-price">Цена: ${this.price} &#8381;</div>
        <div class = "basket-item-quantity"> Количество: ${this.quantity}</div>
      </div>
      `;
  }
}


class GoodsBasket {
  item = [];
  fetchGoods(callback) {
    service(GET_GOOD_BASKET, (data) => {
      this.item = data;
      callback();
    })
  }
  render () {
    let goodsBasketList = this.item.contents.map(item => {
      const goodsBasketItem = new GoodsBasketItem(item);
      return goodsBasketItem.render();
    });
    const basket = document.querySelector('.basket');
    basket.innerHTML = goodsBasketList.join('');
    basket.insertAdjacentHTML("beforeend", '<hr>');
    basket.insertAdjacentHTML("beforeend", `<div class="basket-result">Количество товаров: ${this.item.countGoods}</div>`);
    basket.insertAdjacentHTML("beforeend", `<div class="basket-result">Общая сумма: ${this.item.amount} &#8381</div>`);

  }
}

const goodsBasket = new GoodsBasket();
goodsBasket.fetchGoods(() => {
  goodsBasket.render();
});
