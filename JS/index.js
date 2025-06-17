import { bergenAirConditioners } from "./data.js";
import { cartArr } from "./cart.js";
import { createCartMarkup } from "./cart.js";
import { onRemoveBtnClick } from "./cart.js"; 
import { onIncrementBtnClick } from "./cart.js";
import { onDecrementBtnClick } from "./cart.js";
const goodsList = document.querySelector(".goods-list");
const cartList = document.querySelector(".cart-list");
const notification = document.querySelector(".notification")
const notificationText = document.querySelector(".notification-text")
const cartInnerWrapper = document.querySelector(".cart-inner-counter")


const createMarkup = (goods) => {
    return goods.map((item) => {
        return `<li id=${item.id} class="good-list-item">
                            <img
                                class="goods-img"
                                width="300"
                                height="300"
                                src="./images/Fjord-cond.jpg"
                                alt="конндиціонер Bergen Fjord"
                            />
                            <div class="item-info-wrapper">
                                <h2 class="title-model">
                                    Інверторний кондиціонер <span class="title-model-name">${item.name}</span>
                                </h2>
                                <p class="min-tec-spec">
                                    Холодовиробництво, кВт ${item.specifications.coolingCapacity}  
                                </p>
                                 <p class="min-tec-spec">
                                    Потужність обогріву, кВт ${item.specifications.heatingCapacity}
                                </p>
                                <p class="price">${item.price}₴</p>
                            </div>
                            <div class="buttons-wrapper">
                                <button class="item-button to-cart">ДО КОШИКА</button>
                                <a href = "./index${item.btiIdx}.html" class="item-button detail">ДЕТАЛЬНІШЕ</a>
                            </div>
                        </li>`;
    });
};

const renderMarkup = () => {
    const markup = createMarkup(bergenAirConditioners).join("");
    if(goodsList){
    goodsList.innerHTML = markup;    
    }
    
};
renderMarkup();
const cartButtons = document.querySelectorAll(".to-cart");
cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});

 function onAddToCartClick(event){
const id = event.currentTarget.closest("li").id
const cartItemObject = bergenAirConditioners.find((item)=>{
    return item.id === Number(id)
})
if(cartArr.filter((item)=>{
    return item.id===cartItemObject.id
}).length
)
{
notificationText.textContent = "Цей товар вже у Вашому кошику"
notification.classList.add("fixed")
setTimeout(()=>{
notification.classList.remove("fixed")
}, 3000) 
return
}
cartItemObject.quantity = 1
cartArr.push(cartItemObject)
localStorage.setItem("cartArr", JSON.stringify(cartArr))
const markup = createCartMarkup(cartItemObject)
cartList.insertAdjacentHTML("beforeend", markup)
cartList.lastElementChild.addEventListener("click",onRemoveBtnClick)
cartList.lastElementChild.addEventListener("click",onDecrementBtnClick)
cartList.lastElementChild.addEventListener("click",onIncrementBtnClick)

if(cartArr.length){
    cartInnerWrapper.style.display = "flex"
}else{
    cartInnerWrapper.style.display = "none"
}
cartInnerWrapper.textContent = cartArr.length
}



