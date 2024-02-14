const serachInput = document.querySelector("#search")
let serachInputMin = document.querySelector("#min-price")
let serachInputMax = document.querySelector("#max-price")
const priceBtn = document.querySelector(".price-search")
const productsDOM = document.querySelector(".product-center")
const btns = document.querySelectorAll(".btn");

let allProductdata = [];
const filters = {
    searchItems: "",
};
const filtersPrice = {
    searchItems: "",
};

document.addEventListener("DOMContentLoaded", ()=>{
    axios.get("http://localhost:3000/items").then(res => {
        allProductdata = res.data;
        // render product on DOM
        renderProducts(res.data, filters);
    })
    .catch(err => console.log(err));
})

function renderProducts(_products, _filters){

   const filtredProducts = _products.filter(p => {
    // p.title
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    })


    productsDOM.innerHTML = ""
    // console.log(filtredProducts);
    // render to DOM


    filtredProducts.forEach((item, index) => {
        // create
        // content
        // append to .products
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('product')
        productsDiv.innerHTML = `
        
        <div class="img-container">
            <img src="${item.image}" alt="p-${index}">
        </div>
        <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
        </div>
        `;
        productsDOM.appendChild(productsDiv)
        
    });
}
function renderProductsPrice(_products, _price1, _price2){

   const filtredProducts = _products.filter(p => {
    // p.price
        return p.price >= _price1.searchItems && p.price <= _price2.searchItems
    })


    productsDOM.innerHTML = ""
    // console.log(filtredProducts);
    // render to DOM


    filtredProducts.forEach((item, index) => {
        // create
        // content
        // append to .products
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('product')
        productsDiv.innerHTML = `
        
        <div class="img-container">
            <img src="${item.image}" alt="p-${index}">
        </div>
        <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
        </div>
        `;
        productsDOM.appendChild(productsDiv)
        
    });
}
// input
serachInput.addEventListener("input", (e)=>{
    filters.searchItems = e.target.value;
    renderProducts(allProductdata, filters)
})

// price
priceBtn.addEventListener('click', ()=>{
    let minVal = parseFloat(serachInputMin.value)
    let maxVal = parseFloat(serachInputMax.value)

    
    filters.searchItems = minVal;
    filtersPrice.searchItems = maxVal;
    renderProductsPrice(allProductdata, filters, filtersPrice)
})

// filter group btn :

btns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const filter = e.target.dataset.filter;
        filters.searchItems = filter;
        renderProducts(allProductdata, filters)
    })
})