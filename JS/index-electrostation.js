import { ncEnergyPowerStation } from "./data.js";
import { cartArr } from "./cart.js";
import { createCartMarkup } from "./cart.js";
import { onRemoveBtnClick } from "./cart.js";
import { onIncrementBtnClick } from "./cart.js";
import { onDecrementBtnClick } from "./cart.js";
const goodsList = document.querySelector(".goods-list");
const cartList = document.querySelector(".cart-list");
const notification = document.querySelector(".notification");
const notificationText = document.querySelector(".notification-text");
const filterForm = document.querySelector(".filter-form");
const filterPowerForm = document.querySelector(".power-form-js");
const availableForm = document.querySelector(".available-form-js");
const cartInnerWrapper = document.querySelector(".cart-inner-counter");
const availableArr = ncEnergyPowerStation.filter((item) => {
    return item.available;
});

const createMarkup = (goods) => {
    return goods.map((item) => {
        return `<li id=${item.id} class="good-list-item">
                            <img
                                class="goods-img"
                                width="300"
                                height="300"
                                src=${item.images.imgFace}
                                alt="конндиціонер Bergen Fjord"
                            />
                            <div class="item-info-wrapper">
                                <h2 class="title-model">
                                    Зарядна станція <span class="title-model-name">${item.name}</span>
                                </h2>
                                <p class="min-tec-spec">
                                    Потужність, кВт ${item.power}  
                                </p>
                                 <p class="min-tec-spec">
                                    Тип управління ${item.controlType}
                                </p>
                                <p class="price">${item.price}₴</p>
                            </div>
                            <div class="buttons-wrapper">
                                <button class="item-button to-cart">ДО КОШИКА</button>
                                <a href = "./${item.btiIdx}.html" class="item-button detail">ДЕТАЛЬНІШЕ</a>
                            </div>
                        </li>`;
    });
};

const renderMarkup = () => {
    const markup = createMarkup(ncEnergyPowerStation).join("");
    if (goodsList) {
        goodsList.innerHTML = markup;
    }
};
renderMarkup();

const cartButtons = document.querySelectorAll(".to-cart");

cartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
});

function onAddToCartClick(event) {
    const id = event.currentTarget.closest("li").id;
    const cartItemObject = ncEnergyPowerStation.find((item) => {
        return item.id === Number(id);
    });
    if (
        cartArr.filter((item) => {
            return item.id === cartItemObject.id;
        }).length
    ) {
        console.log("sdfbg");
        notificationText.textContent = "Цей товар вже у Вашому кошику";
        notification.classList.add("fixed");
        setTimeout(() => {
            notification.classList.remove("fixed");
        }, 3000);
        return;
    }
    cartItemObject.quantity = 1;
    cartArr.push(cartItemObject);
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    const markup = createCartMarkup(cartItemObject);
    cartList.insertAdjacentHTML("beforeend", markup);
    cartList.lastElementChild.addEventListener("click", onRemoveBtnClick);
    cartList.lastElementChild.addEventListener("click", onDecrementBtnClick);
    cartList.lastElementChild.addEventListener("click", onIncrementBtnClick);

    if (cartArr.length) {
        cartInnerWrapper.style.display = "flex";
    } else {
        cartInnerWrapper.style.display = "none";
    }
    cartInnerWrapper.textContent = cartArr.length;
}

////////////////////filterForm(filterSquareForm)
filterForm.addEventListener("change", onFilterSquareChange);
function onFilterSquareChange(event) {
    filterPowerForm.reset();
    let filteredArr = null;
    if (availableForm.elements[0].checked) {
        filteredArr = ncEnergyPowerStation.filter((item) => {
            return (
                Number(item.recommendedRoomArea) === Number(event.target.value)
            );
        });
    } else {
        filteredArr = availableArr.filter((item) => {
            return (
                Number(item.recommendedRoomArea) === Number(event.target.value)
            );
        });
    }
    const markup = createMarkup(filteredArr).join("");
    goodsList.innerHTML = markup;

    const cartButtons = document.querySelectorAll(".to-cart");
    cartButtons.forEach((button) => {
        button.addEventListener("click", onAddToCartClick);
    });
}

filterForm.addEventListener("submit", onFilterSquareSubmit);
function onFilterSquareSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    const markup = availableForm.elements[0].checked
        ? createMarkup(ncEnergyPowerStation).join("")
        : createMarkup(availableArr).join("");
    goodsList.innerHTML = markup;
}
////////////////////filterForm(filterSquareForm)
// ----------------------
////////////////////filterPowerForm
filterPowerForm.addEventListener("change", onFilterPowerChange);
function onFilterPowerChange(event) {
    filterForm.reset();
    let filteredArr = null;
    if (availableForm.elements[0].checked) {
        filteredArr = ncEnergyPowerStation.filter((item) => {
            return (
                Number(item.specifications.powerBto) ===
                Number(event.target.value)
            );
        });
    } else {
        filteredArr = availableArr.filter((item) => {
            return (
                Number(item.specifications.powerBto) ===
                Number(event.target.value)
            );
        });
    }
    const markup = createMarkup(filteredArr).join("");
    goodsList.innerHTML = markup;
    const cartButtons = document.querySelectorAll(".to-cart");
    cartButtons.forEach((button) => {
        button.addEventListener("click", onAddToCartClick);
    });
}
filterPowerForm.addEventListener("submit", onFilterPowerSubmit);
function onFilterPowerSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    const markup = availableForm.elements[0].checked
        ? createMarkup(ncEnergyPowerStation).join("")
        : createMarkup(availableArr).join("");
    goodsList.innerHTML = markup;
    const cartButtons = document.querySelectorAll(".to-cart");
    cartButtons.forEach((button) => {
        button.addEventListener("click", onAddToCartClick);
    });
}
////////////////////filterPowerForm
// ----------------------
////////////////////availableForm
availableForm.addEventListener("change", onAvailableFormChange);
function onAvailableFormChange(event) {
    if (event.target.value === "available") {
        const checked = [...filterForm].find((item) => {
            return item.checked;
        });

        const checkedPower = [...filterPowerForm].find((item) => {
            return item.checked;
        });
        if (checked || !checkedPower) {
            const filteredArr = checked
                ? availableArr.filter((item) => {
                      return Number(item.recommendedRoomArea) === checked.value;
                  })
                : availableArr;
            const markup = createMarkup(filteredArr).join("");
            goodsList.innerHTML = markup;
        }
        if (!checked || checkedPower) {
            const filteredArr = checked
                ? availableArr.filter((item) => {
                      return (
                          Number(item.specifications.powerBto) === checked.value
                      );
                  })
                : availableArr;
            const markup = createMarkup(filteredArr).join("");
            goodsList.innerHTML = markup;
        }
    }
    if (event.target.value === "all") {
        const checked = [...filterForm].find((item) => {
            return item.checked;
        });

        const checkedPower = [...filterPowerForm].find((item) => {
            return item.checked;
        });
        if (checked || !checkedPower) {
            const filteredArr = checked
                ? ncEnergyPowerStation.filter((item) => {
                      return Number(item.recommendedRoomArea) === checked.value;
                  })
                : ncEnergyPowerStation;
            const markup = createMarkup(filteredArr).join("");
            goodsList.innerHTML = markup;
        }
        if (!checked || checkedPower) {
            const filteredArr = checked
                ? ncEnergyPowerStation.filter((item) => {
                      return (
                          Number(item.specifications.powerBto) === checked.value
                      );
                  })
                : ncEnergyPowerStation;
            const markup = createMarkup(filteredArr).join("");
            goodsList.innerHTML = markup;
        }
    }
    const cartButtons = document.querySelectorAll(".to-cart");
    cartButtons.forEach((button) => {
        button.addEventListener("click", onAddToCartClick);
    });
}
