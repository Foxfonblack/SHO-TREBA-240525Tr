import { cartArr } from "./cart.js";
import { onClearBtnClick } from "./cart.js";

const form = document.querySelector(".order-form");
const deliveryDeptWrapper = document.querySelector(".delivery-wrapper-dept");
const deliveryCourierWrapper = document.querySelector(
    ".delivery-wrapper-courier"
);
const backdropOrder = document.querySelector(".backdrop-order");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal-order");
const orderBtn = document.querySelector(".order-button");
const mainOrderBtn = document.querySelector(".order-submit-btn");
const orderNotifWrapper = document.querySelector(".order-notif-wrapper");
const orderList = document.querySelector(".order-list");
const orderListWrapper = document.querySelector(".order-list-wrapper");
const orderTotalPrice = document.querySelector(".order-total-price-value");
const cartList = document.querySelector(".cart-list");
const cartBtnWrapper = document.querySelector(".actions-button-wrapper");
const totalCartPrice = document.querySelector(".cart-total-price");
const emptyCartTitle = document.querySelector(".empty-cart");
const cartInnerWrapper = document.querySelector(".cart-inner-counter");
const orderNotification = document.querySelector(".order-notification");

// Доставка у відділення/Курʼєрська доставка
form.addEventListener("input", onRadioDeliveryChange);

function onRadioDeliveryChange(event) {
    if (event.target.id === "del") {
        const cityInput = event.currentTarget.elements.city;
        const departmentInput = event.currentTarget.elements.department;
        deliveryDeptWrapper.classList.add("hide");
        deliveryCourierWrapper.classList.add("show-deliver");
        cityInput.value = "";
        cityInput.style.borderColor = "rgba(0, 0, 0, 0.135)";
        cityInput.style.backgroundColor = "white";
        departmentInput.value = "";
        departmentInput.style.borderColor = "rgba(0, 0, 0, 0.135)";
        departmentInput.style.backgroundColor = "white";
        cityInput.nextElementSibling.classList.remove("show-error");
        departmentInput.nextElementSibling.classList.remove("show-error");
    }
    if (event.target.id === "dep") {
        const addressInput = event.currentTarget.elements.address;
        deliveryDeptWrapper.classList.remove("hide");
        deliveryCourierWrapper.classList.remove("show-deliver");
        addressInput.value = "";
        addressInput.style.borderColor = "rgba(0, 0, 0, 0.135)";
        addressInput.style.backgroundColor = "white";
        addressInput.nextElementSibling.classList.remove("show-error");
    }
}
// Доставка у відділення/Курʼєрська доставка

// form.addEventListener("submit", onOrderFormSubmit)
// function onOrderFormSubmit(event){
//     event.preventDefault()
// }

orderBtn.addEventListener("click", onOrderBtnClick);
function onOrderBtnClick() {
    document.body.addEventListener("keydown", onEscPress);
    backdropOrder.classList.add("active-order");
    backdrop.classList.remove("active");
    const totalPrice = cartArr.reduce((acc, item) => {
        acc += item.quantity * Number(item.price);
        return acc;
    }, 0);
    orderTotalPrice.textContent = `${totalPrice},00 ₴`;
    orderList.innerHTML = createOrderMarkup(cartArr).join("");
    orderList.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", onRemoveBtnClick);
        item.addEventListener("click", onDecrementBtnClick);
        item.addEventListener("click", onIncrementBtnClick);
    });
    // orderList.innerHTML=createOrderMarkup(cartArr).join("")
}

// document.body.addEventListener("keydown", onEscPress);
function onEscPress(event) {
    if (event.code === "Escape") {
        backdropOrder.classList.remove("active-order");
        document.body.style.overflow = "visible";
        document.body.removeEventListener("keydown", onEscPress);
    }
}

backdropOrder.addEventListener("click", onBackdropOrderClick);
function onBackdropOrderClick(event) {
    if (event.target === event.currentTarget) {
        backdropOrder.classList.remove("active-order");
        document.body.style.overflow = "visible";
        document.body.removeEventListener("keydown", onEscPress);
    }
}
function randomOrderNumber() {
    const result = `${Math.ceil(Math.random() * 1000000)},
    ${new Date().toLocaleString()}`;
    const newResult = result.split(",").join("-");
    return newResult;
}

// form.addEventListener("change", onFormChange);
// function onFormChange(event) {
//     console.log("change");
//     if (
//         event.currentTarget.elements.name.value !== "" &&
//         event.currentTarget.elements.surname.value !== "" &&
//         event.currentTarget.elements.tel.value !== "" &&
//         event.currentTarget.elements.email.value !== "" &&
//         event.currentTarget.elements.department.value !== "" &&
//         event.currentTarget.elements.address.value === ""
//     ) {
//         console.log("1111111");
//         console.log(event.currentTarget.elements.address.value);

//         mainOrderBtn.classList.remove("disabled");
//     }
// }

let active = false;

form.addEventListener("input", onInputChange);
function onInputChange(event) {
    if (event.target.value.length >= 1) {
        event.target.style.borderColor = "green";
        event.target.style.backgroundColor = "rgba(0, 128, 0, 0.06)";
        // event.target.nextElementSibling.classList.remove("show-error")
    } else {
        event.target.style.borderColor = "red";
        event.target.style.backgroundColor = "rgba(255, 0, 0, 0.06)";
        // event.target.nextElementSibling.classList.add("show-error")
    }
    if (
        event.currentTarget.elements.name.value !== "" &&
        event.currentTarget.elements.surname.value !== "" &&
        event.currentTarget.elements.tel.value !== "" &&
        event.currentTarget.elements.email.value !== ""
    ) {
        active = true;
    }
    if (
        event.currentTarget.elements.name.value !== "" &&
        event.currentTarget.elements.surname.value !== "" &&
        event.currentTarget.elements.tel.value !== "" &&
        event.currentTarget.elements.email.value !== "" &&
        event.currentTarget.elements.department.value !== "" &&
        event.currentTarget.elements.address.value === ""
    ) {
        console.log("1111111");
        console.log(event.currentTarget.elements.address.value);

        mainOrderBtn.classList.remove("disabled");
    } else if (
        event.currentTarget.elements.name.value !== "" &&
        event.currentTarget.elements.surname.value !== "" &&
        event.currentTarget.elements.tel.value !== "" &&
        event.currentTarget.elements.email.value !== "" &&
        event.currentTarget.elements.address.value !== "" &&
        event.currentTarget.elements.department.value === ""
    ) {
        console.log("2222222");
        mainOrderBtn.classList.remove("disabled");
    } else {
        mainOrderBtn.classList.add("disabled");
    }
}

const TOKEN_ORDER = "7428299170:AAE0djA_kcwAMzzQFa1dK6rFi6mIsIw7Tgg";
const CHAT_ID_ORDER = "-1002179658365";
const URL_ORDER = `https://api.telegram.org/bot${TOKEN_ORDER}/sendMessage`;

form.addEventListener("submit", onOrderFormSubmit);
function onOrderFormSubmit(event) {
    event.preventDefault();

    const goods = [...cartArr];

    const orderMessage = goods.reduce((acc, item, idx) => {
        return (acc += `${idx + 1}. ${item.name} - ${item.quantity}шт. Сума: ${
            item.quantity * item.price
        }\n`);
    }, "");
    const radioCheckedValue = form.querySelector(
        "input[type='radio']:checked"
    ).value;
    const deliveryMessage =
        radioCheckedValue === "dept"
            ? "Доставка у відділення"
            : "Курʼєрська доставка";
    const deliveryText =
        radioCheckedValue === "dept"
            ? `Населений пункт: ${form.elements.city.value}\n№ Відділення: ${form.elements.department.value}\n`
            : `Точна адреса: ${form.elements.address.value}\n`;
    const orderNumber = randomOrderNumber();
    console.log(form.elements);
    let message = `Замовлення №${orderNumber}\n`;
    message += `${orderMessage}`;
    message += `Імʼя: ${form.elements.name.value}\n`;
    message += `Прізвище: ${form.elements.surename.value}\n`;
    message += `Телефон: ${form.elements.tel.value}\n`;
    message += `Пошта: ${form.elements.email.value}\n`;
    message += `Доставвка: ${deliveryMessage}\n`;
    message += `${deliveryText}\n`;

    const data = JSON.stringify({
        chat_id: CHAT_ID_ORDER,
        parse_model: "html",
        text: message,
    });

    fetch(URL_ORDER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
        },
        body: data,
    }).catch((error) => {
        console.log(error.message);
    });

    modal.classList.add("show-min-modal");
    form.classList.add("hide");
    orderList.innerHTML = "";
    orderListWrapper.classList.add("hide");
    orderNotification.textContent = `Ваше замовлення №${orderNumber} оформлено`;

    orderNotifWrapper.classList.add("show-order-notif");
    document.querySelector(".ok-btn").addEventListener("click", () => {
        backdropOrder.classList.remove("active-order");
        modal.classList.remove("show-min-modal");
        form.classList.remove("hide");
        document.body.style.overflow = "visible";
        orderListWrapper.classList.remove("hide");
        orderNotifWrapper.classList.remove("show-order-notif");
    });
    onClearBtnClick();
    cartArr.length = 0;
}

function createOrderMarkup(arr) {
    return arr.map((item) => {
        return `<li class="order-list-item" id=${item.id}>
    <img width="90" height="90" src="./images/Fjord-cond.jpg" alt="кондиціонер Bergen FJORD" class="order-item-img">
    <div class="order-info-wrapper">
        <p class="order-item-title">Інверторний кондиціонер ${item.name}</p>
        <div class="order-item-btns-wrapper">
            <div class="order-item-counter-wrapper">
                <button class="order-counter-decrement">-</button>
                <span class="order-item-counter">${item.quantity}</span>
                <button class="order-counter-increment">+</button>
            </div>
        <p class="order-item-total-price">${
            item.price * item.quantity
        }<span>₴</span></p>
        </div>
    </div>
    <button class="order-remove-button">&#x2717</button>
    
</li>`;
    });
}

function onRemoveBtnClick(event) {
    if (event.target.classList.contains("order-remove-button")) {
        const id = Number(event.currentTarget.id);
        event.currentTarget.remove();
        const indexToRemove = cartArr.findIndex((item) => {
            return item.id === id;
        });
        cartArr.splice(indexToRemove, 1);
        cartList.innerHTML = "";
        const totalPrice = cartArr.reduce((acc, item) => {
            acc += item.quantity * Number(item.price);
            return acc;
        }, 0);
        orderTotalPrice.textContent = `${totalPrice},00₴`;
    }
    if (!cartArr.length) {
        backdropOrder.classList.remove("active-order");
        document.body.removeEventListener("keydown", onEscPress);
        cartBtnWrapper.classList.remove("active");
        totalCartPrice.classList.remove("show");
        emptyCartTitle.classList.add("show");
    }
    if (cartArr.length) {
        cartInnerWrapper.style.display = "flex";
    } else {
        cartInnerWrapper.style.display = "none";
    }
    cartInnerWrapper.textContent = cartArr.reduce((acc, item) => {
        acc += item.quantity;
        return acc;
    }, 0);
}
function onDecrementBtnClick(event) {
    if (event.target.classList.contains("order-counter-decrement")) {
        const id = Number(event.currentTarget.id);
        const objectToDecrement = cartArr.find((item) => {
            return item.id === id;
        });
        objectToDecrement.quantity -= 1;
        if (objectToDecrement.quantity === 0) {
            event.currentTarget.remove();
            const indexToRemove = cartArr.findIndex((item) => {
                return item.id === id;
            });
            cartArr.splice(indexToRemove, 1);
            cartList.innerHTML = "";
            const totalPrice = cartArr.reduce((acc, item) => {
                acc += item.quantity * Number(item.price);
                return acc;
            }, 0);

            orderTotalPrice.textContent = `${totalPrice},00₴`;
            if (cartArr.length) {
                cartInnerWrapper.style.display = "flex";
            } else {
                cartInnerWrapper.style.display = "none";
            }
            cartInnerWrapper.textContent = cartArr.reduce((acc, item) => {
                acc += item.quantity;
                return acc;
            }, 0);
            if (!cartArr.length) {
                backdropOrder.classList.remove("active-order");
                document.body.removeEventListener("keydown", onEscPress);
                cartBtnWrapper.classList.remove("active");
                totalCartPrice.classList.remove("show");
                emptyCartTitle.classList.add("show");
            }
            return;
        }
        const orderMarkup = createNodeOrderMarkup(objectToDecrement);
        orderList.replaceChild(orderMarkup, event.currentTarget);
        const totalPrice = cartArr.reduce((acc, item) => {
            acc += item.quantity * Number(item.price);
            return acc;
        }, 0);
        orderTotalPrice.textContent = `${totalPrice},00₴`;
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onRemoveBtnClick);
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onIncrementBtnClick);
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onDecrementBtnClick);
        if (cartArr.length) {
            cartInnerWrapper.style.display = "flex";
        } else {
            cartInnerWrapper.style.display = "none";
        }
        cartInnerWrapper.textContent = cartArr.reduce((acc, item) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }
}
function onIncrementBtnClick(event) {
    if (event.target.classList.contains("order-counter-increment")) {
        const id = Number(event.currentTarget.id);
        const objectToIncrement = cartArr.find((item) => {
            return item.id === id;
        });
        objectToIncrement.quantity += 1;

        const orderMarkup = createNodeOrderMarkup(objectToIncrement);
        orderList.replaceChild(orderMarkup, event.currentTarget);
        const totalPrice = cartArr.reduce((acc, item) => {
            acc += item.quantity * Number(item.price);
            return acc;
        }, 0);
        orderTotalPrice.textContent = `${totalPrice},00₴`;
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onRemoveBtnClick);
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onIncrementBtnClick);
        orderList
            .querySelector(`[id="${id}"]`)
            .addEventListener("click", onDecrementBtnClick);
        if (cartArr.length) {
            cartInnerWrapper.style.display = "flex";
        } else {
            cartInnerWrapper.style.display = "none";
        }
        cartInnerWrapper.textContent = cartArr.reduce((acc, item) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }
}
function createNodeOrderMarkup(item) {
    const orderItem = document.createElement("li");
    orderItem.classList.add("order-list-item");
    orderItem.id = `${item.id}`;
    const orderImage = document.createElement("img");
    orderImage.width = "90";
    orderImage.height = "90";
    orderImage.src = "./images/Fjord-cond.jpg";
    orderImage.alt = "кондиціонер Bergen FJORD";
    const orderInfoWrapper = document.createElement("div");
    orderInfoWrapper.classList.add("order-info-wrapper");
    const orderItemBtnsWrapper = document.createElement("div");
    orderItemBtnsWrapper.classList.add("order-item-btns-wrapper");
    const orderTitle = document.createElement("p");
    orderTitle.classList.add("order-item-title");
    orderTitle.textContent = `інверторний кондиціонер ${item.name}`;
    const counterWrapper = document.createElement("div");
    counterWrapper.classList.add("order-item-counter-wrapper");
    const dekrementBtn = document.createElement("button");
    dekrementBtn.classList.add("order-counter-decrement");
    dekrementBtn.textContent = "-";
    const inkrementBtn = document.createElement("button");
    inkrementBtn.classList.add("order-counter-increment");
    inkrementBtn.textContent = "+";
    const counter = document.createElement("span");
    counter.classList.add("order-item-counter");
    counter.textContent = `${item.quantity}`;
    counterWrapper.append(dekrementBtn, counter, inkrementBtn);
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("order-item-total-price");
    itemPrice.textContent = `${item.price * item.quantity}₴`;
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("order-remove-button");
    removeBtn.innerHTML = "&#x2717";
    orderItemBtnsWrapper.append(counterWrapper, itemPrice);
    orderInfoWrapper.append(orderTitle, orderItemBtnsWrapper);
    orderItem.append(orderImage, orderInfoWrapper, removeBtn);
    return orderItem;
}

// NOVA_POSHTA_API
const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY = "279f6e42f099a104003dce764d05d9d9";

const locationInput = document.querySelector(".location");
const locationsListMain = document.querySelector(".locations");
const addressesList = document.querySelector(".addresses");
const addressesInput = document.querySelector(".delive-input");

modal.addEventListener("click", onModalOrderClick);
function onModalOrderClick(event) {
    if (event.target !== addressesList && event.target !== addressesInput) {
        addressesList.classList.remove("show-addresses");
    }
    if (event.target !== locationsListMain && event.target !== locationInput) {
        locationsListMain.classList.remove("show-locations");
    }
}

addressesInput.addEventListener("focus", onFocussAdressesShow);
function onFocussAdressesShow() {
    addressesList.classList.add("show-addresses");
    addressesList.innerHTML = `<p>Завантаження...</p>`;
    const location = locationInput.value.split(",")[0];
    getDepartment(BASE_URL, API_KEY, location);
}

addressesInput.addEventListener("input", onInputAddressesChange);
function onInputAddressesChange(event) {
    const location = locationInput.value.split(",")[0];
    getDepartment(BASE_URL, API_KEY, location, event.target.value);
}

locationsListMain.addEventListener("click", onLocationItemClick);
function onLocationItemClick(event) {
    console.log("sdfdgsgfhytjtrdrt");
    locationInput.value = event.target.textContent;
    locationsListMain.classList.remove("show-locations");
    const location = locationInput.value.split(",")[0];
    addressesInput.value = "";
    getDepartment(BASE_URL, API_KEY, location);
}

addressesList.addEventListener("click", onAddressesItemClick);
function onAddressesItemClick(event) {
    if (event.target.tagName === "SPAN") {
        addressesInput.value = event.target.closest("li").textContent;
    } else {
        addressesInput.value = event.target.textContent;
    }
    addressesList.classList.remove("show-addresses");
    if (active) {
        mainOrderBtn.classList.remove("disabled");
    }
}

locationInput.addEventListener("input", onLocationInputChange);
function onLocationInputChange(event) {
    getLocation(BASE_URL, API_KEY, event.target.value);
    if (event.target.value) {
        locationsListMain.classList.add("show-locations");
    }
    if (!event.target.value) {
        console.log("99999999");
        locationsListMain.classList.remove("show-locations");
    }
}

function getLocation(url, apiKey, location) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiKey: apiKey,
            modelName: "AddressGeneral",
            calledMethod: "getSettlements",
            methodProperties: {
                FindByString: location,
            },
        }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
        .then((data) => {
            if (data.data.length === 0) {
                locationsListMain.innerHTML = `<li>Населенний пункт відсутній</li>`;
                return;
            }
            let locationList = data.data.reduce((acc, item) => {
                if (
                    item.Description.toLowerCase().includes(
                        location.toLowerCase()
                    )
                ) {
                    let string = `${item.Description}, ${item.AreaDescription} область`;
                    acc.push(string);
                }
                return acc;
            }, []);
            const markup = locationList.map((item) => {
                return `<li class = "location-item">${item}</li>`;
            });
            locationsListMain.innerHTML = markup.join("");
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function getDepartment(url, apiKey, location, search = "") {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiKey: apiKey,
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
                CityName: location,
            },
        }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
        .then((data) => {
            addressesList.innerHTML = "";
            if (data.data.length === 0) {
                addressesInput.value = "Відділення відсутнє";
                addressesList.classList.remove("show-addresses");
                addressesInput.setAttribute("disabled", "disabled");
                return;
            }
            addressesInput.disabled = false;
            const fiteredData = data.data.filter((item) => {
                return item.Description.includes("Відділення");
            });
            const result = fiteredData.filter((item) => {
                return item.Description.toLowerCase().includes(
                    `${search.toLowerCase()}`
                );
            });
            if (!search) {
                const addresses = result.map((item) => {
                    return `<li class = "addresses-item">${item.Description}</li>`;
                });
                addressesList.innerHTML = addresses.join("");
                return;
            }
            const regExp = new RegExp(`(${search})`, "gi");
            const res = [];
            result.forEach((item) => {
                res.push(
                    item.Description.split(regExp).map((substring) => {
                        if (
                            substring.toLowerCase() ===
                            search.toLocaleLowerCase()
                        ) {
                            return `<span class = "orange">${substring}</span>`;
                        }
                        return substring;
                    })
                );
            });
            const resString = res.map((item) => {
                return `<li>${item}</li>`;
            });
            addressesList.innerHTML = resString.join(",").replaceAll(",", "");
        })
        .catch((error) => {
            console.log(error.message);
        });
}
