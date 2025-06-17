document.addEventListener("DOMContentLoaded", () => {
const slider = document.querySelector(".good-item-list-slider")
const sliderList = document.querySelector(".good-item-list")
const sliderItem = document.querySelector(".good-item-slider")
console.log(sliderList)
const sliderPrefBtn = document.querySelector(".item-slider-prev-button")
const sliderNextBtn = document.querySelector(".item-slider-next-button")


// slider
let sliderCounter = 0
const slideWidth = sliderItem.getBoundingClientRect().width
console.log(slideWidth)
const slideGap = parseInt(getComputedStyle(sliderList).columnGap)
console.log(getComputedStyle(sliderList).columnGap)
const totalSlideStep = slideWidth + slideGap
console.log(totalSlideStep)
const totalSliderListLength = sliderList.children.length*slideWidth+((sliderList.children.length-1)*slideGap)

const sliderWIdth = slider.getBoundingClientRect().width

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
});

