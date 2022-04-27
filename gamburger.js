'use strict'
let price = 0, cal = 0, mayonnaiseCount = 0, spiceCount = 0;
const small = { price: 50, cal: 20 },
      big = { price: 100, cal: 40 },
      cheese = { price: 10, cal: 20 },
      salad = { price: 20, cal: 5 },
      potato = { price: 15, cal: 10 },
      mayonnaise = { price: 20, cal: 5},
      spice = {price: 15, cal: 0};

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    }

    addTopping(topping) {
        if (topping === 'майонез') {
            price += mayonnaise.price;
            cal += mayonnaise.cal;
            mayonnaiseCount ++;
        } else if (topping === 'приправа') {
            price += spice.price;
            cal += spice.cal;
            spiceCount ++;
        }
    }

    removeTopping (topping) {
        if(mayonnaiseCount > 0) {
            if (topping === 'майонез') {
                price -= mayonnaise.price;
                cal -= mayonnaise.cal;
                mayonnaiseCount --;
            } 
        }
        if(spiceCount > 0) {
            if (topping === 'приправа') {
                price -= spice.price;
                cal -= spice.cal;
                spiceCount --;
            }
        }
    }

    getToppings () {
        console.log(`Количество майонеза: ${mayonnaiseCount}, количество приправы: ${spiceCount}`);
    }

    getSize() {
        this.size === small ? console.log("У Вас маленький гамбургер") : console.log("У Вас большой гамбургер");
    }
    
    getStuffing() {
        switch(this.stuffing) {
            case cheese:
                console.log("У Вас гамбургер с сыром");
                break
            case salad:
                console.log("У Вас гамбургер с салатом");
                break
            default:
                console.log("У Вас гамбургер с картошкой");
                break
        }
    }

    calculatePrice() {
        return console.log(this.size.price + this.stuffing.price + price);
    }

    calculateCalories() {
        return console.log(this.size.cal + this.stuffing.cal + cal);
    }
}

const hamburger = new Hamburger(small, salad);
hamburger.addTopping('майонез');
hamburger.addTopping('приправа');
hamburger.removeTopping('майонез');
hamburger.removeTopping('приправа');
hamburger.addTopping('приправа');
hamburger.addTopping('приправа');
hamburger.addTopping('майонез');
hamburger.addTopping('майонез');
hamburger.getToppings();
hamburger.getSize();
hamburger.getStuffing();
hamburger.calculatePrice();
hamburger.calculateCalories();


