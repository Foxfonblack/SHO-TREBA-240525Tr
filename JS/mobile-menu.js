const mobileMenu = document.querySelector(".mobile-menu-burger");

const mobileMenuButton = document.querySelector(".mobile-menu-button");

mobileMenuButton.addEventListener("click", onMobileMenuButtonClick);
function onMobileMenuButtonClick() {
  mobileMenu.classList.toggle("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
