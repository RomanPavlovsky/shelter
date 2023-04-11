const burger = document.querySelector(".burger");
const modal = document.querySelector(".burger-modal");
const modalWindow = document.querySelector(".burger-modal__window");
const modalDarkTheme = document.querySelector(".burger-modal__dark-theme");
const modalNavbar = document.querySelector(".navbar");
let isActive = false;
const spinBurger = (event) => {
  burger.removeEventListener("click", spinBurger);
  if (isActive === false) {
    modal.addEventListener("click", spinBurger);
    burger.classList.add("burger_active");
    modal.style.display = "flex";
    modalWindow.classList.add("burger-modal__window_open");
    modalDarkTheme.classList.add("burger-modal__dark-theme_active");
    modalNavbar.classList.add("navbar_visible");
    document.querySelector("body").style.overflow = "hidden";
    isActive = true;
  } else if (
    event.target.closest(".burger") ||
    event.target.closest(".burger-modal__dark-theme") ||
    event.target.closest(".navbar__item")
  ) {
    modal.removeEventListener("click", spinBurger);
    burger.classList.remove("burger_active");
    burger.classList.add("burger_inactive");
    modalNavbar.classList.remove("navbar_visible");
    modalNavbar.classList.add("navbar_hidden");
    modalWindow.classList.remove("burger-modal__window_open");
    modalWindow.classList.add("burger-modal__window_close");
    modalDarkTheme.classList.remove("burger-modal__dark-theme_active");
    modalDarkTheme.classList.add("burger-modal__dark-theme_inactive");
    document.querySelector("body").style.overflow = "visible";
    isActive = false;
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
  setTimeout(() => {
    burger.addEventListener("click", spinBurger);
    burger.classList.remove("burger_inactive");
    modalWindow.classList.remove("burger-modal__window_close");
    modalDarkTheme.classList.remove("burger-modal__dark-theme_inactive");
    modalNavbar.classList.remove("navbar_hidden");
  }, 300);
};
burger.addEventListener("click", spinBurger);

export default burger;
