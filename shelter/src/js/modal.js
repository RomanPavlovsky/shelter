import { dataPets } from "./dataPets";
const popup = document.querySelector(".modal");
const modalDarkTheme = document.querySelector(".modal__dark-theme");
const closeButton = document.querySelector(".modal__button");
const sliderContent = document.querySelector(".slider__content");
const gridCards = document.querySelector(".pets__grid");
const imagePet = document.querySelector(".pet-info__image");
const namePet = document.querySelector(".pet-info__name");
const typePet = document.querySelector(".pet-info__type");
const descriptionPet = document.querySelector(".pet-info__description");
const agePet = document.querySelector(".pet-info__age");
const inoculationsPet = document.querySelector(".pet-info__inoculations");
const diseasesPet = document.querySelector(".pet-info__diseases");
const parasitesPet = document.querySelector(".pet-info__parasites");

const modal = () => {
  const renderPetsInfo = (id) => {
    imagePet.src = dataPets[id].img;
    namePet.textContent = `${dataPets[id].name}`;
    typePet.textContent = `${dataPets[id].type} - ${dataPets[id].breed}`;
    descriptionPet.textContent = `${dataPets[id].description}`;
    agePet.innerHTML = `<b>Age:</b> ${dataPets[id].age} `;
    inoculationsPet.innerHTML = `<b>Inoculations:</b> ${dataPets[id].inoculations}`;
    diseasesPet.innerHTML = `<b>Diseases:</b> ${dataPets[id].diseases}`;
    parasitesPet.innerHTML = `<b>Parasites:</b> ${dataPets[id].parasites}`;
  };

  const openModal = (event) => {
    if (event.target.closest(".card")) {
      popup.style.display = "block";
      document.querySelector("body").style.overflow = "hidden";
      let card = event.target.closest(".card");
      let id = card.getAttribute("data-index");
      renderPetsInfo(id);
    }
  };
  const closeModal = () => {
    if (
      event.target === modalDarkTheme ||
      event.target.closest(".modal__button")
    ) {
      popup.style.display = "none";
      document.querySelector("body").style.overflow = "visible";
    }
  };

  if (sliderContent !== null) {
    sliderContent.addEventListener("click", openModal);
  }
  if (gridCards !== null) {
    gridCards.addEventListener("click", openModal);
  }

  closeButton.addEventListener("click", closeModal);
  modalDarkTheme.addEventListener("click", closeModal);
};

modal();
export default modal;
