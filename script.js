const GET_GOOD_ITEMS = 'http://localhost:8000/goods';
const GET_GOOD_BASKET = 'http://localhost:8000/basket_goods';

function service(url) {
	return fetch(url).then(response => response.json())
}

function init () {
	const goodsItem = Vue.component('goods-item', {
		props: ['item'],
		template: `
			<div class="goods-item">
				<div class = "goods-item-info">
					<div class = "goods-item-title">{{ item.product_name }}:</div>
					<div class = "goods-item-price">{{ item.price }} &#8381</div>
					</div>
				<div class="goods-item-add">Добавить</div>
			</div>
		`
	});

	const goodsSearch = Vue.component('goods-search', {
		props: ['value'],
		template: `
			<input id="search" 
			v-bind:value = 'value'
			v-on:input="$emit('input', $event.target.value)">
		`
	});

	const customButton = Vue.component('custom-button', {
		template: `
			<button class="cart-button" type="button" v-on:click="$emit('click')">Корзина</button>
		`
	});

	const basketGoods = Vue.component('basket-goods', {
		props: ['goods', 'item'],
		template: `
			<div class ="basket"> 
				<div class="basket-item" v-for ="item in goods"> 
					<div>Название: {{ item.data.product_name }}</div>
					<div>Цена: {{ item.data.price }}</div>
					<div>Количество: {{ item.count }}</div>
					<div>Общая сумма: {{ item.total }}</div>
				</div>
			</div>
		`
	});

	const sum = Vue.component('sum', {
		props: ['sum'],
		template: `
			<div class="goods-list-sum">Итого: {{ sum }} &#8381</div>
		`
	});


	const app = new Vue({
		el: '#root',
		data: {
			items: [],
			filteredItems: [],
			search: '',
			basketItems: []
		},
		methods: {
			fetchGoods () {
				service(GET_GOOD_ITEMS).then(data => {
						this.items = data;
						this.filteredItems = data;
					})
				.catch(() => {
					const noGoods = document.querySelector('.no_goods');
								noGoods.classList.add('dblock');
				})
			},
			filterItems () {
				this.filteredItems = this.items.filter(({ product_name }) => {
					return product_name.match(new RegExp(this.search, 'gui'))
				});
			},
			fetchBasket () {
				service(GET_GOOD_BASKET).then(data => {
					this.basketItems = data;
				});
			},
			showBasket () {
				const basket = document.querySelector('.basket');
				basket.classList.toggle('dblock');
			}
		},
		computed: {
			sum () {
				let result =  this.filteredItems.reduce((sum, current) => sum + current.price ,0);
				return result;
			}
		},
		mounted() {
			this.fetchGoods();
			this.fetchBasket();
		}
	})
}

window.onload = init;