const mobileMenu = document.querySelector(".mobile-menu-burger")

const mobileMenuButton = document.querySelector(".mobile-menu-button")
console.log(mobileMenuButton);

mobileMenuButton.addEventListener("click", onMobileMenuButtonClick)
function onMobileMenuButtonClick(){
    console.log("click");
    mobileMenu.classList.toggle("hidden")
}
