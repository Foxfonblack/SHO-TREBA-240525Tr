import { bergenAirConditioners } from "./data.js";
import { cartArr } from "./cart.js";
import { createCartMarkup } from "./cart.js";
import { onRemoveBtnClick } from "./cart.js"; 
import { onIncrementBtnClick } from "./cart.js";
import { onDecrementBtnClick } from "./cart.js";
const API_KEY = "279f6e42f099a104003dce764d05d9d9"
const goodsList = document.querySelector(".goods-list");
const cartList = document.querySelector(".cart-list");
const emptyCartTitle = document.querySelector(".empty-cart")
const totalCartPrice = document.querySelector(".cart-total-price")
const cartBtnWrapper = document.querySelector(".actions-button-wrapper")
const cartTotalPriceValue = document.querySelector(".cart-total-price-value")
const notification = document.querySelector(".notification")
const notificationText = document.querySelector(".notification-text")
const filterForm = document.querySelector(".filter-form")
const filterClearButton = document.querySelector(".clear-filter")
const filterPowerForm = document.querySelector(".power-form-js")
const availableForm = document.querySelector(".available-form-js")
const clearCartBtn = document.querySelector(".clear-button")
const cartInnerWrapper = document.querySelector(".cart-inner-counter")
const itemGoodButton = document.querySelector(".item-button")
const availableArr = bergenAirConditioners.filter((item)=>{
 return item.available
})


// export const cartArr = JSON.parse(localStorage.getItem("cartArr")) || [] 
// if(cartArr.length){
//     cartInnerWrapper.style.display = "flex"
// }else{
//     cartInnerWrapper.style.display = "none"
// }
// cartInnerWrapper.textContent = cartArr.reduce((acc, item)=>{
//     acc+=item.quantity
//     return acc

// },0)




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
    console.log("sdfbg");
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

// export function onRemoveBtnClick(event){
// if (event.target.classList.contains("remove-button")){
// const id = Number(event.currentTarget.id)
// event.currentTarget.remove()
// const indexToRemove = cartArr.findIndex((item)=>{
// return item.id===id
// })
// cartArr.splice(indexToRemove, 1)
// const totalPrice = cartArr.reduce((acc, item)=>{
//     acc+=item.quantity*Number(item.price)
//     return acc
// },0) 
// cartTotalPriceValue.textContent = `${totalPrice},00₴`
// }
// if (!cartArr.length){
//     cartBtnWrapper.classList.remove("active")
//     totalCartPrice.classList.remove("show")
//     emptyCartTitle.classList.add("show")
// }
// if(cartArr.length){
//     cartInnerWrapper.style.display = "flex"
// }else{
//     cartInnerWrapper.style.display = "none"
// }
// cartInnerWrapper.textContent = cartArr.reduce((acc, item)=>{
//     acc+=item.quantity
//     return acc

// },0)
// localStorage.setItem("cartArr", JSON.stringify(cartArr))
// }
// export function onDecrementBtnClick(event){
//     if (event.target.classList.contains("counter-decrement")){
//         const id = Number(event.currentTarget.id)
//         const objectToIncrement = cartArr.find((item)=>{
//             return item.id === id
//         })
//         objectToIncrement.quantity-=1
//         if (objectToIncrement.quantity===0){
//             event.currentTarget.remove()
//             const indexToRemove = cartArr.findIndex((item)=>{
//                 return item.id===id
                
//                 })
//                 cartArr.splice(indexToRemove, 1)
//                 const totalPrice = cartArr.reduce((acc, item)=>{
//                     acc+=item.quantity*Number(item.price)
//                     return acc
//                 },0) 
//                 cartTotalPriceValue.textContent = `${totalPrice},00₴.`
//                 if(cartArr.length){
//                     cartInnerWrapper.style.display = "flex"
//                 }else{
//                     cartInnerWrapper.style.display = "none"
//                 }
//                 cartInnerWrapper.textContent = cartArr.reduce((acc, item)=>{
//                     acc+=item.quantity
//                     return acc
                
//                 },0)
//                 if (!cartArr.length){
//                     cartBtnWrapper.classList.remove("active")
//                     totalCartPrice.classList.remove("show")
//                     emptyCartTitle.classList.add("show")
//                 } return
//         }
       
//         const cartMarkup = createNoteCartMarkup(objectToIncrement)
//         cartList.replaceChild(cartMarkup, event.currentTarget)
//         const totalPrice = cartArr.reduce((acc, item)=>{
//             acc+=item.quantity*Number(item.price) 
//             return acc   
//             },0)
//             cartTotalPriceValue.textContent = `${totalPrice},00₴`
//         cartList.querySelector(`[id="${id}"]`).addEventListener("click",onRemoveBtnClick)
//         cartList.querySelector(`[id="${id}"]`).addEventListener("click",onDecrementBtnClick)
//         cartList.querySelector(`[id="${id}"]`).addEventListener("click",onIncrementBtnClick)
//         if(cartArr.length){
//             cartInnerWrapper.style.display = "flex"
//         }else{
//             cartInnerWrapper.style.display = "none"
//         }
//         cartInnerWrapper.textContent = cartArr.reduce((acc, item)=>{
//             acc+=item.quantity
//             return acc
        
//         },0)
        
//     }
//   localStorage.setItem("cartArr", JSON.stringify(cartArr))
// }
// export function onIncrementBtnClick(event){
// if (event.target.classList.contains("counter-increment")){
//     const id = Number(event.currentTarget.id)
//     const objectToIncrement = cartArr.find((item)=>{
//         return item.id === id
//     })
//     objectToIncrement.quantity+=1
//     const cartMarkup = createNoteCartMarkup(objectToIncrement)
//     cartList.replaceChild(cartMarkup, event.currentTarget)
//     const totalPrice = cartArr.reduce((acc, item)=>{
//     acc+=item.quantity*Number(item.price) 
//     return acc   
//     },0)
//     cartTotalPriceValue.textContent = `${totalPrice},00₴`
//     cartList.querySelector(`[id="${id}"]`).addEventListener("click",onRemoveBtnClick)
//     cartList.querySelector(`[id="${id}"]`).addEventListener("click",onDecrementBtnClick)
//     cartList.querySelector(`[id="${id}"]`).addEventListener("click",onIncrementBtnClick)
//     if(cartArr.length){
//         cartInnerWrapper.style.display = "flex"
//     }else{
//         cartInnerWrapper.style.display = "none"
//     }
//     cartInnerWrapper.textContent = cartArr.reduce((acc, item)=>{
//         acc+=item.quantity
//         return acc
    
//     },0)
    
// }
// localStorage.setItem("cartArr", JSON.stringify(cartArr))
// }

// function createNoteCartMarkup(item){
//     const cartItem = document.createElement("li")
//     cartItem.classList.add("cart-list-item")
//     cartItem.id = `${item.id}`
//     const cartImg = document.createElement("img")
//     cartImg.width = "100"
//     cartImg.height = "100"
//     cartImg.src = "./images/Fjord-cond.jpg"
//     cartImg.alt = "конндиціонер Bergen Fjord"
//     const cartTitle = document.createElement("p")
//     cartTitle.classList.add("cart-item-title")
//     cartTitle.textContent = `Інверторний кондиціонер ${item.name}`
//     const counterWrapper = document.createElement("div")
//     counterWrapper.classList.add("cart-item-counter-wrapper")
//     const dicrementBtn = document.createElement("button")
//     dicrementBtn.classList.add("counter-decrement")
//     dicrementBtn.textContent = "-"
//     const incrementBtn = document.createElement("button")
//     incrementBtn.classList.add("counter-increment")
//     incrementBtn.textContent = "+"
//     const counter = document.createElement("span")
//     counter.classList.add("cart-item-counter")
//     counter.textContent = `${item.quantity}`
//     counterWrapper.append(dicrementBtn, counter,incrementBtn)
//     const itemPrice = document.createElement("p")
//     itemPrice.classList.add("cart-item-total-price")
//     itemPrice.textContent=`${item.price*item.quantity}₴`
//     const removeBtn = document.createElement("button")
//     removeBtn.classList.add("remove-button")
//     removeBtn.innerHTML = "&#x2717"
//     cartItem.append(cartImg, cartTitle, counterWrapper, itemPrice, removeBtn)
//     return cartItem
// }

// export function createCartMarkup(item) {
//    return ` <li id=${item.id} class="cart-list-item">
//                          <img class="cart-item-img" width="100" height="100" src="./images/Fjord-cond.jpg"
//                                     alt="конндиціонер Bergen Fjord">
//                             <p class="cart-item-title">Інверторний кондиціонер ${item.name}</p>
//                             <div class="cart-item-counter-wrapper">
//                             <button class="counter-decrement">-</button>
//                             <span class="cart-item-counter">${item.quantity}</span>
//                             <button class="counter-increment">+</button>
//                             </div>                     
//                             <p class="cart-item-total-price">${item.price}₴</p>
//                             <button class="remove-button">&#x2717</button>
//                             </li>`;
//     }


////////////////////filterForm(filterSquareForm)
filterForm.addEventListener("change", onFilterSquareChange)
function onFilterSquareChange(event){
  filterPowerForm.reset()
  let filteredArr = null
  if (availableForm.elements[0].checked){
    filteredArr=bergenAirConditioners.filter((item)=>{
        return Number(item.recommendedRoomArea)===Number(event.target.value)
    })
  }  else{
    filteredArr=availableArr.filter((item)=>{
        return Number(item.recommendedRoomArea)===Number(event.target.value)
    })
  }
  const markup = createMarkup(filteredArr).join("")
  goodsList.innerHTML = markup

const cartButtons = document.querySelectorAll(".to-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});
}

filterForm.addEventListener("submit", onFilterSquareSubmit)
function onFilterSquareSubmit(event){
event.preventDefault()
event.currentTarget.reset()
const markup = availableForm.elements[0].checked ? createMarkup(bergenAirConditioners).join("") : createMarkup(availableArr).join("")
goodsList.innerHTML = markup
}
////////////////////filterForm(filterSquareForm)
// ----------------------
////////////////////filterPowerForm
filterPowerForm.addEventListener("change", onFilterPowerChange)
function onFilterPowerChange (event){
    filterForm.reset()
    let filteredArr = null
    if (availableForm.elements[0].checked){
      filteredArr=bergenAirConditioners.filter((item)=>{
          return Number(item.specifications.powerBto)===Number(event.target.value)
      })
    }  else{
      filteredArr=availableArr.filter((item)=>{
          return Number(item.specifications.powerBto)===Number(event.target.value)
      })
    }
    const markup = createMarkup(filteredArr).join("")
    goodsList.innerHTML = markup
    const cartButtons = document.querySelectorAll(".to-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});
}
filterPowerForm.addEventListener("submit", onFilterPowerSubmit)
function onFilterPowerSubmit(event){
    event.preventDefault()
event.currentTarget.reset()
const markup = availableForm.elements[0].checked ? createMarkup(bergenAirConditioners).join("") : createMarkup(availableArr).join("")
goodsList.innerHTML = markup
const cartButtons = document.querySelectorAll(".to-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});
}
////////////////////filterPowerForm
// ----------------------
////////////////////availableForm
availableForm.addEventListener("change", onAvailableFormChange)
function onAvailableFormChange (event){
    if (event.target.value==="available"){
        const checked = [...filterForm].find((item)=>{
            return item.checked
        })

        
        const checkedPower = [...filterPowerForm].find((item)=>{
            return item.checked
        })
        if (checked || !checkedPower) {
            const filteredArr = checked ? availableArr.filter((item)=>{
                return Number(item.recommendedRoomArea)===checked.value
            }) : availableArr
            const markup = createMarkup(filteredArr).join("")
    goodsList.innerHTML = markup
        }
        if (!checked || checkedPower){
            const filteredArr = checked ? availableArr.filter((item)=>{
                return Number(item.specifications.powerBto)===checked.value
            }) : availableArr
            const markup = createMarkup(filteredArr).join("")
    goodsList.innerHTML = markup
        }
    }
    if  (event.target.value==="all"){
        const checked = [...filterForm].find((item)=>{
            return item.checked
        })

        
        const checkedPower = [...filterPowerForm].find((item)=>{
            return item.checked
        })
        if (checked || !checkedPower) {
            const filteredArr = checked ? bergenAirConditioners.filter((item)=>{
                return Number(item.recommendedRoomArea)===checked.value
            }) : bergenAirConditioners
            const markup = createMarkup(filteredArr).join("")
    goodsList.innerHTML = markup
        }
        if (!checked || checkedPower){
            const filteredArr = checked ? bergenAirConditioners.filter((item)=>{
                return Number(item.specifications.powerBto)===checked.value
            }) : bergenAirConditioners
            const markup = createMarkup(filteredArr).join("")
    goodsList.innerHTML = markup
        }
       
    }
    const cartButtons = document.querySelectorAll(".to-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});
}
////////////////////availableForm

// cartCLEARButton?
// clearCartBtn.addEventListener("click", onClearBtnClick)
// export function onClearBtnClick(){
// cartList.innerHTML = ""
// cartBtnWrapper.classList.remove("active")
// totalCartPrice.classList.remove("show")
// emptyCartTitle.classList.add("show")
// cartArr.length = 0
// }


// Cocntact-form open/close
// const contactUsButton = document.querySelector(".contact-us")
// const contactUsForm = document.querySelector(".contact-us-form")
// const contactUsFormCloseBtn = document.querySelector(".contact-us-form-close-btn")
// const contactUsSubmitBtn = document.querySelector(".contact-us-submite-btn")
// contactUsFormCloseBtn.addEventListener("click", onClosecontactUsButtonClick)


// contactUsForm.addEventListener("submit", onContactUsFormSubmit)
// function onContactUsFormSubmit(event){
// event.preventDefault()
// onClosecontactUsButtonClick()
// }

// contactUsButton.addEventListener("click", onClosecontactUsButtonClick)

// function onClosecontactUsButtonClick(){
//     if (contactUsForm.classList.contains("show-contact-us-form")){
//         contactUsForm.classList.remove("show-contact-us-form")
//     }else {
//         contactUsForm.classList.add("show-contact-us-form")
//     }
// }

// contactUsForm.addEventListener("input", onContactUsFormInputChange)

// function onContactUsFormInputChange(event){
//     console.log(event.target.name);
//     if(event.target.value.length>=1 && event.target.name !== "question"){
        
//         // event.target.style.borderColor = "red"
//         event.target.style.backgroundColor = "rgb(255, 253, 207)"
//         event.target.nextElementSibling.classList.remove("show-error")
//     }else if(event.target.value.length===0 && event.target.name !== "question") {
//         // event.target.style.borderColor = "red"
//         event.target.style.backgroundColor = "rgba(173, 106, 106, 0.68)"
//         event.target.nextElementSibling.classList.add("show-error")
//     }
//     if(event.currentTarget.elements.name.value !=="" &&
//         event.currentTarget.elements.phone.value !==""
//     ){
//         contactUsSubmitBtn.classList.remove("disabled")
//     }else{
//         contactUsSubmitBtn.classList.add("disabled")
//     }
// }

// Cocntact-form open/close