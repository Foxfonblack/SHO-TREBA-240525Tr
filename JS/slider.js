const slides = document.querySelectorAll(".slider-item");
let slider = [];
for (let i = 0; i < slides.length; i += 1) {
  slider[i] = slides[i].firstElementChild.src;
  slides[i].remove();
}

let step = 0;
let offset = 0;

function draw() {
  let li = document.createElement("li");
  li.classList.add("slider-item");
  let img = document.createElement("img");
  img.src = slider[step];
  img.classList.add("slider-img");
  img.style.opacity = 1;
  li.appendChild(img);
  document.querySelector(".slider-list").appendChild(li);
  if (step + 1 === slider.length) {
    step = 0;
  } else {
    step += 1;
  }
  offset = 1;
}
function left() {
  let slides2 = document.querySelectorAll(".slider-item");
  let offset2 = 0;
  for (let i = 0; i < slides2.length; i += 1) {
    slides2[i].style.opacity = 0;
    offset2 += 1;
  }
  setTimeout(() => {
    slides2[0].remove;
    draw();
  }, 2000);
}
setInterval(left, 7000);
draw();
// draw();
