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


    Promise.all([
        getGoods(BASKET_GOODS_PATH),
        getGoods(GOODS_PATH)
    ]).then(([ basketGoods, goods ]) => {

        const result = basketGoods.map((basketGood) => {
            const good = goods.find(({ id }) => id === basketGood.id);
            return {
                ...basketGood,
                data: good,
                total: good.price * basketGood.count
            }
        })
        req.send(JSON.stringify(result))
    })
});

app.post('/basket_goods', (res, req) => {
    getGoods(BASKET_GOODS_PATH).then((basketGoods) => {
        let hasGood = false;
        const result = basketGoods.map((basketGood) => {
            if(basketGood.id === res.body.id) {
                hasGood = true;
                return {
                    ...basketGood,
                    count: basketGood.count + 1
                }
            } else {
                return basketGood
            }
        })
        if(!hasGood) {
            result.push({
                id: res.body.id,
                count: 1
            })
        }
        const stringResult = JSON.stringify(result);
        writeFile(BASKET_GOODS_PATH, stringResult).then(() => {
            req.send(stringResult);
        })
    })
});

app.listen('8000', () => {
    console.log('server is starting')
})