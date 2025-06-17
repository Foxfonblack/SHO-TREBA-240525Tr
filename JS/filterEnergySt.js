// JS/filters.js
import { energyStation } from './data.js';
import { cartArr } from './cart.js';
import { createCartMarkup } from './cart.js';
import { onRemoveBtnClick, onIncrementBtnClick, onDecrementBtnClick } from './cart.js';

const STORAGE_KEY   = 'productFilters';
const RETURN_FLAG   = 'filtersReturning';
const goodsList     = document.querySelector('.goods-list');
const cartList      = document.querySelector('.cart-list');
const notification  = document.querySelector('.notification');
const notificationText = document.querySelector('.notification-text');
const cartInnerWrapper = document.querySelector('.cart-inner-counter');


// Фильтры
const state = {
  available:   'all',
  square:      null,
  power:       null,
  manufacture: 'all'
};

// Загрузить фильтры из sessionStorage только при возврате со страницы товара
(function initFiltersFromSession() {
  if (sessionStorage.getItem(RETURN_FLAG) === 'true') {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { Object.assign(state, JSON.parse(saved)); } catch {}
    }
    sessionStorage.removeItem(RETURN_FLAG);
  } else {
    // При обычной загрузке очищаем старые фильтры
    sessionStorage.removeItem(STORAGE_KEY);
  }
})();

// Сохранить текущее состояние фильтров
function saveFiltersToSession() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Отметить, что мы уходим на страницу товара
function markReturning() {
  sessionStorage.setItem(RETURN_FLAG, 'true');
}

// Группы радиокнопок
const availableInputs   = document.querySelectorAll('input[name="available"]');
const squareInputs      = document.querySelectorAll('input[name="square"]');
const powerInputs       = document.querySelectorAll('input[name="power"]');
const manufactureInputs = document.querySelectorAll('input[name="manufacture"]');
const clearButtons      = document.querySelectorAll('.clear-filter');

// Восстановить UI контролы из state
function restoreFormControls() {
  availableInputs.forEach(i => i.checked = (state.available === i.value));
  squareInputs.forEach(i  => i.checked = (state.square === +i.value));
  powerInputs.forEach(i   => i.checked = (state.power === +i.value));
  manufactureInputs.forEach(i => i.checked = (state.manufacture === i.value));
}

// Применить все фильтры и отрендерить список
function applyFilters() {
  let items = energyStation.slice();

  if (state.available === 'available') {
    items = items.filter(i => i.available);
  }
  if (state.square !== null) {
    items = items.filter(i =>
      +i.generalCharacteristics['Рекомендована площа приміщення, кв.м'] <= state.square
    );
  }
  if (state.power !== null) {
    items = items.filter(i =>
      +i.specifications['Потужність, БТО/год'] <= state.power
    );
  }
  if (state.manufacture !== 'all') {
    items = items.filter(i => i.brand === state.manufacture);
  }

  renderList(items);
}

// Рендер карточек товаров
function renderList(items) {
  goodsList.innerHTML = '';
  if (!items.length) {
    goodsList.innerHTML = '<li>Нічого не знайдено</li>';
    return;
  }

  items.forEach(item => {
    const power  = item.generalCharacteristics['Потужність, Вт'];
    const control  = item.generalCharacteristics['Управління'];
    const short = item.name.length > 26 ? item.name.slice(0,26) + '...' : item.name;

    const li = document.createElement('li');
    li.id = item.id;
    li.className = 'good-list-item';
    li.innerHTML = `
      <img class="goods-img" width="300" height="300"
           src="${item.img[0]}" alt="${item.name}" />
      <div class="item-info-wrapper">
        <h2 class="title-model" data-tooltip="${item.name}">
          Інверторна зарядна станція
          <span class="title-model-name">${short}</span>
        </h2>
        <p class="min-tec-spec">Потужність, Вт ${power}</p>
        <p class="min-tec-spec">Управління ${control}</p>
        <p class="price">${item.price}₴</p>
      </div>
      <div class="buttons-wrapper">
        <button class="item-button to-cart">ДО КОШИКА</button>
        <a href="/productEnergySt.html?id=${item.id}" class="item-button detail">ДЕТАЛЬНІШЕ</a>
      </div>
    `;
    goodsList.appendChild(li);
  });

  // Повторно навесим обработчики после рендера
  document.querySelectorAll('.to-cart').forEach(btn =>
    btn.addEventListener('click', onAddToCartClick)
  );
  document.querySelectorAll('.detail').forEach(link =>
    link.addEventListener('click', e => {
      markReturning();
      // Переход произойдет как обычно
    })
  );
}

// Обработчики фильтров
availableInputs.forEach(i =>
  i.addEventListener('change', () => {
    state.available = i.value;
    applyFilters();
    saveFiltersToSession();
  })
);
squareInputs.forEach(i =>
  i.addEventListener('change', () => {
    state.square = i.value ? +i.value : null;
    applyFilters();
    saveFiltersToSession();
  })
);
powerInputs.forEach(i =>
  i.addEventListener('change', () => {
    state.power = i.value ? +i.value : null;
    applyFilters();
    saveFiltersToSession();
  })
);
manufactureInputs.forEach(i =>
  i.addEventListener('change', () => {
    state.manufacture = i.value;
    applyFilters();
    saveFiltersToSession();
  })
);

// Обработчики очистки
clearButtons.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();
    const form = btn.closest('form');
    form.reset();
    const name = form.querySelector('input[type=radio]')?.name;
    if (name === 'available' || name === 'manufacture') {
      state[name] = 'all';
    } else {
      state[name] = null;
    }
    applyFilters();
    saveFiltersToSession();
  })
);

// CART LOGIC
function onAddToCartClick(event) {
  const id = +event.currentTarget.closest('li').id;
  const item = energyStation.find(i => i.id === id);
  if (cartArr.some(i => i.id === id)) {
    notificationText.textContent = "Цей товар вже у Вашому кошику";
    notification.classList.add("fixed");
    setTimeout(() => notification.classList.remove("fixed"), 3000);
    return;
  }
  item.quantity = 1;
  cartArr.push(item);
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
  const markup = createCartMarkup(item);
  cartList.insertAdjacentHTML("beforeend", markup);
  cartList.lastElementChild.addEventListener("click", onRemoveBtnClick);
  cartList.lastElementChild.addEventListener("click", onDecrementBtnClick);
  cartList.lastElementChild.addEventListener("click", onIncrementBtnClick);
  cartInnerWrapper.style.display = cartArr.length ? "flex" : "none";
  cartInnerWrapper.textContent = cartArr.length;
}

// Инициализация при загрузке
restoreFormControls();
renderList(energyStation);
applyFilters();