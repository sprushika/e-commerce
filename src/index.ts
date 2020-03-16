import {IProduct} from './interface';
import './styles.scss';


const cartBtn = document.querySelector(".cart-btn");

const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const productDOM = document.querySelector(".products-center");
//Cart
let cart = [];
let productsList;
//Getting the Products
class Products {
    getProducts() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', './localData.json', false);
        try {
            xhr.send();
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                productsList = xhr.response;
                productsList = JSON.parse(productsList).products;
                return productsList;
            }
        } catch(err) { // instead of onerror
            alert("Request failed");
        }
    }
}
//Display Products
class toUI {
    displayProducts(products) {
        let result = '';
        products.forEach((product:IProduct) => {
            result += `
                <article class="product">
                    <div class="img-container">
                        <img src="${product.img}" alt="product" class="product-img">
                        <button class="bag-btn" data-id="${product.id}">
                            <i class="fas fa fa-shopping-cart"></i>
                            add to bag
                        </button>
                    </div>
                    <h3>${product.title}</h3>
                    <h4>${product.price}</h4>
                </article>
            `
        });
        productDOM.innerHTML = result;
    }
}
//Local Storage
class Storage {

}
document.addEventListener('DOMContentLoaded', () => {
    const ui = new toUI();
    const products = new Products();
    ui.displayProducts(products.getProducts());
});
