import {
    cartArr,
    createCartMarkup,
    onDecrementBtnClick,
    onIncrementBtnClick,
    onRemoveBtnClick,
} from "./cart.js";

const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const cartButton = document.querySelector(".cart-button");
const closeModalBtn = document.querySelector(".close-modal-btn");
const cartList = document.querySelector(".cart-list");
const emptyCartTitle = document.querySelector(".empty-cart");
const totalCartPrice = document.querySelector(".cart-total-price");
const cartBtnWrapper = document.querySelector(".actions-button-wrapper");
const cartTotalPriceValue = document.querySelector(".cart-total-price-value");

cartButton.addEventListener("click", onCartBtnClick);
function onCartBtnClick() {
    if (cartArr.length) {
        const markup = cartArr.map((item) => createCartMarkup(item)).join("");
        cartList.innerHTML = markup;
        cartList.querySelectorAll("li").forEach((item) => {
            item.addEventListener("click", onRemoveBtnClick);
            item.addEventListener("click", onDecrementBtnClick);
            item.addEventListener("click", onIncrementBtnClick);
        });
    }

    if (cartArr.length) {
        emptyCartTitle.classList.remove("show");
        totalCartPrice.classList.add("show");
        cartBtnWrapper.classList.add("active");
        const totalPrice = cartArr.reduce((acc, item) => {
            acc += item.quantity * Number(item.price);
            return acc;
        }, 0);
        cartTotalPriceValue.textContent = `${totalPrice},00 ₴`;
    } else {
        emptyCartTitle.classList.add("show");
    }

    document.body.addEventListener("keydown", onEscBtnPress);
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

backdrop.addEventListener("click", onCartBackdropClick);
function onCartBackdropClick(event) {
    if (event.target === event.currentTarget) {
        document.body.style.overflow = "visible";
        backdrop.classList.remove("active");
        document.body.removeEventListener("keydown", onEscBtnPress);
    }
}

function onEscBtnPress(event) {
    if (event.code === "Escape") {
        backdrop.classList.remove("active");
        document.body.style.overflow = "visible";

        document.body.removeEventListener("keydown", onEscBtnPress);
    }
}

closeModalBtn.addEventListener("click", oncloseModalBtnClick);
function oncloseModalBtnClick() {
    document.body.style.overflow = "visible";
    backdrop.classList.remove("active");
}
const mobileMenu = document.querySelector(".mobile-menu-burger");

window.addEventListener("beforeunload", function (event) {
    mobileMenu.classList.add("hidden");
});
