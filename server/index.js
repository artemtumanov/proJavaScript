import { writeFile, readFile } from 'fs/promises'
import express from 'express';
import cors from 'cors';

const GOODS_PATH = './static/goods.json',
      BASKET_GOODS_PATH = './static/basket-goods.json';

function getGoods(url) {
    return readFile(url, 'utf-8').then((file) => JSON.parse(file))
}


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/goods', (res, req) => {
    getGoods(GOODS_PATH).then((goods) => {
        req.send(JSON.stringify(goods));
    })
});

app.get('/basket_goods', (res, req) => {
    getGoods(BASKET_GOODS_PATH).then((goods) => {
        req.send(JSON.stringify(goods));
    })
});

app.listen('8000', () => {
    console.log('server is starting')
})