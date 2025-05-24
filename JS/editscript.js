import {bergenAirConditioners} from "./data.js"
const id = document.querySelector(".good-section").dataset.id;
const available = document.querySelector(".good-available")
const price = document.querySelector(".good-price")


const curentItem = bergenAirConditioners.find((item)=>{
 return item.id === Number(id)
})


available.textContent = curentItem.available ? "В наявності" : "Очікується"

price.textContent = curentItem.price
const priceSpan = document.createElement("span")
priceSpan.textContent = "₴"
priceSpan.classList.add("span-grn")

console.log(priceSpan);

price.append(priceSpan)