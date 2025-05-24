const slider = document.querySelector(".category-list-slider")
const sliderList = document.querySelector(".category-list")
const sliderItem = document.querySelector(".category-item")
const sliderPrefBtn = document.querySelector(".slider-prev-button")
const sliderNextBtn = document.querySelector(".slider-next-button")


// slider
let sliderCounter = 0
const slideWidth = sliderItem.getBoundingClientRect().width
const slideGap = parseInt(getComputedStyle(sliderList).columnGap)
const totalSlideStep = slideWidth + slideGap
const totalSliderListLength = sliderList.children.length*slideWidth+((sliderList.children.length-1)*slideGap)

const sliderWIdth = slider.getBoundingClientRect().width
// console.log(sliderWIdth);

sliderPrefBtn.addEventListener("click", onSliderPrefBtnClick)
function onSliderPrefBtnClick(){
    sliderCounter -= totalSlideStep
    if(sliderCounter <=0 ){
        sliderPrefBtn.classList.add("slide-disable")
    }
    if(sliderCounter <totalSliderListLength-sliderWIdth) {
        sliderNextBtn.classList.remove("slide-disable")}
    sliderList.style.transform = `translateX(-${sliderCounter}px)`

}

sliderNextBtn.addEventListener("click", onSliderNextBtnClick)
function onSliderNextBtnClick(){
    
    sliderCounter+=totalSlideStep
    if(sliderCounter > 0){
        sliderPrefBtn.classList.remove("slide-disable")
    }
    console.log(sliderCounter);
    if(sliderCounter >=totalSliderListLength-sliderWIdth){
        
        sliderNextBtn.classList.add("slide-disable")
    }
    
    if(totalSliderListLength - sliderCounter === sliderList.getBoundingClientRect().width){
        sliderNextBtn.classList.add("slide-disable")
    }

sliderList.style.transform = `translateX(-${sliderCounter}px)`
console.log(sliderCounter);
}

