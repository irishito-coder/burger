let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 5,
        name: 'Proweb burger',
        price: 44000,
        img: 'https://avatars.mds.yandex.net/i?id=2938dcff13a418627da129bf223a85e0fc537144-5469569-images-thumbs&n=13',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
]

const wrapperList = document.querySelector('.wrapper__list')

// outBurgers() - будет перебирать массива products и получать данные и выводить их внутри wrapperList
function outBurgers() {
    
    products.forEach((item) => {
        let {id, name, price, img} = item
        
        wrapperList.innerHTML += `<div class="wrapper__list-card" id="${id}">
            <p class="wrapper__list-count"></p>
            <img class="wrapper__list-image" src="${img}" alt="">
            <h3 class="wrapper__list-title">${name}</h3>
            <div class="wrapper__list-sub">
                <p class="wrapper__list-text">${price} сум</p>
                <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
            </div>
        </div>`
    })
}
outBurgers()

const   burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
        cartBtn    = document.querySelector('.wrapper__navbar-btn'),
        cartClose  = document.querySelector('.wrapper__navbar-close'),
        basket     = document.querySelector('.wrapper__navbar-basket'),
        cartAmount = document.querySelector('.warapper__navbar-count'),
        cartPrice  = document.querySelector('.wrapper__navbar-totalprice'),
        cartList   = document.querySelector('.wrapper__navbar-checklist');
        
let cart = []

cartBtn.addEventListener('click', () => basket.classList.add('active'))
cartClose.addEventListener('click', () => basket.classList.remove('active'))

burgerBtns.forEach((btn) => {
    btn.addEventListener('click', () => addAmount(btn))
})


function addAmount(btn) {
    // closest() - метод который подключается к указаному ближайшему родителю
    // getAttribute() - метод который получает значение указаного атрибута
    let id = btn.closest('.wrapper__list-card').getAttribute('id')
    let burger = products.find((item) => item.id == id)
    burger.amount < 10 ?  burger.amount++ :  alert('Слишком много')
    addToCart(burger)
}


function addToCart(burger) {
    if(burger.amount > 0) {
        if(!cart.includes(burger)) {
            cart.push(burger)
        }
    }
    outAmountAndPrice()
}

function outAmountAndPrice() {
    cartPrice.innerHTML = getTotalPrice()
    let totalAmount = getTotalAmount()
    if(totalAmount > 0) {
        cartAmount.classList.add('active')
        cartAmount.innerHTML = totalAmount
    }else {
        cartAmount.classList.remove('active')
        cartAmount.innerHTML = ''
    }
    
    cartList.innerHTML = ''
    cart.forEach((burger) => {
        cartList.innerHTML += createBurger(burger)
    })
}

function createBurger({name, img, price, amount}) {
 return `
    <div class="navbar__item">
    <div class="navbar__item-left">
        <img src="${img}" alt="">
        <div class="navbar__item-left-info">
            <p class="navbar__item-left-name">${name}</p>
            <p class="navbar__item-left-price">${price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button data-symbol="-" class="navbar__item-btn">-</button>
        <output class="navbar__item-count">${amount}</output>
        <button data-symbol="+" class="navbar__item-btn">+</button>
    </div>
    </div>  
 `
}


function getTotalPrice() {
    let sum = 0
    products.forEach((item) => {
        sum += item.totalSum
    })
    return sum + ' сумм'
}

function getTotalAmount() {
    let sum = 0
    products.forEach((item) => {
        sum += item.amount
    })
    return sum 
}


window.addEventListener('click', (event) => {
   if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let burgerName = btn.closest('.navbar__item').querySelector('.navbar__item-left-name').innerHTML
        let burger = products.find((item) => item.name == burgerName)
        let dataValue = btn.getAttribute('data-symbol')
        if(dataValue == '+') {
            burger.amount++
        }else if(dataValue == '-') {
            burger.amount--
        }
        cart = cart.filter((burger) => burger.amount > 0)
        outAmountAndPrice()
   }
})

document.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    const counterElement = document.getElementById('counter');
    const interval = setInterval(() => {
        counterElement.textContent = count;
        count++;
        if (count > 100) {
            clearInterval(interval);
        }
    }, 30); 
});
