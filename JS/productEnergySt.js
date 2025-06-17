import { energyStation } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");

  if (!idParam) {
    console.warn("Не указан id товара в URL");
    return;
  }

  const productId = parseInt(idParam, 10);

  const product =  energyStation.find((item) => item.id === productId);
  if (!product) {
    console.warn(`Товар с id=${productId} не найден`);
    return;
  }

  const breadcrumbsContainer = document.querySelector('[data-breadcrumb]');

if (breadcrumbsContainer) {
  // Определяем категорию на основе referrer
  const ref = document.referrer;
  let categoryName = '';
  let categoryLink = '';

  if (ref.includes('/conv')) {
    categoryName = 'Конвектори';
    categoryLink = '/conv.html';
  } else if (ref.includes('/cond')) {
    categoryName = 'Кондиціонери';
    categoryLink = '/cond.html';
  } else if (ref.includes('/electrostation')) {
    categoryName = 'Зарядні станції';
    categoryLink = '/electrostation.html';
  }

  // Создаём HTML хлебных крошек
  breadcrumbsContainer.innerHTML = `
    <a href="/">Головна</a> ${categoryName && '/'}
    <a href="${categoryLink}">${categoryName}</a> /
    <span>${product.name}</span>
  `;
}


  const titleEl       = document.querySelector("[data-name]").textContent = `${product.description} Модель ${product.model} `;
  const artEl         = document.querySelector("[data-art]").textContent = product.art;
  const availableEl   = document.querySelector("[data-available]").textContent = product.available ? 'В наявності' : " Очікується";
  const priceEl       = document.querySelector("[data-price]");
  priceEl.textContent = product.price
  const currency = '₴';
  const currencySpan = `<span class="span-grn">${currency}</span>`;
  priceEl.insertAdjacentHTML("beforeend", currencySpan)
  // const imgEl         = document.querySelector("[data-img-src]").src = product.img;
  const imgEl         = document.querySelector("[data-img-src]");
  const imgSlider = 
` <div class="good-item-list-slider">
                    <ul class="good-item-list">
                    ${product.img.map(item => {
                      return `     <li class="good-item-slider">
                        <div class="category-item-inner-wrapper">
                            <img width="580" height="580" src=${item} alt="кондиціонер Bergen" class="category-item-img">
                            <h2 class="category-item-title">Кондиціонери</h2>
                        </div>
                       </li>`

                    }).join(' ')};
                    </ul>
                    </div>`;
                    imgEl.innerHTML = imgSlider;
                    
//   const breadcrumbEl  = document.querySelector("[data-breadcrumb-name]");

  const genCharBody   = document.querySelector("tbody"); 
  const specsBody     = document.querySelector("[data-specs-body]");
  const functionsBody = document.querySelector("[data-functions-body]");

//   if (breadcrumbEl) breadcrumbEl.textContent = product.name;


  if (genCharBody) {
    genCharBody.innerHTML = ""; 
    Object.entries(product.generalCharacteristics).forEach(([key, value]) => {
      if(key === 'Рекомендована площа приміщення, кв.м') console.log(value)
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.classList.add("table-head");
      th.classList.add("table-head-general");
      th.textContent = key;
      const td = document.createElement("td");
      td.classList.add("table-data");
      td.classList.add("table-data-general");
      if (key === 'Рекомендована площа приміщення, кв.м') {
      td.textContent = `до ${value}`;
    } else {
      td.textContent = value;
    }
      tr.append(th, td);
      genCharBody.append(tr);
    });
  }

  if (specsBody) {
    specsBody.innerHTML = "";
    Object.entries(product.specifications).forEach(([key, value]) => {
      const tr = document.createElement("tr");
      tr.classList.add("table-row");
      const th = document.createElement("th");
      th.classList.add("table-head");
      th.textContent = key;
      const td = document.createElement("td");
      td.classList.add("table-data");
      td.textContent = value;
      tr.append(th, td);
      specsBody.append(tr);
    });
  }

  if (functionsBody) {
    functionsBody.innerHTML = "";
    Object.entries(product.functions).forEach(([key, value]) => {
      const tr = document.createElement("tr");
      tr.classList.add("table-row");
      const th = document.createElement("th");
      th.classList.add("table-head");
      th.textContent = key;
      const td = document.createElement("td");
      td.classList.add("table-data");
      td.textContent = value;
      tr.append(th, td);
      functionsBody.append(tr);
    });
  }
});