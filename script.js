const GET_GOOD_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const GET_GOOD_BASKET = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

function service(url) {
	return fetch(url).then(response => response.json())
}

function init () {
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