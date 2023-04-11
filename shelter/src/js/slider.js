import { dataPets } from "./dataPets";
const sliderContent = document.querySelector(".slider__content");
const slidePrev = document.querySelector(".slider__button_prev");
const slideNext = document.querySelector(".slider__button_next");

const slider = () => {
  let arrId;
  const getIdCards = () => {
    let id1 = Math.floor(Math.random() * dataPets.length);
    let id2 = Math.floor(Math.random() * dataPets.length);
    do {
      id2 = Math.floor(Math.random() * dataPets.length);
    } while (id1 === id2);
    let id3 = Math.floor(Math.random() * dataPets.length);
    do {
      id3 = Math.floor(Math.random() * dataPets.length);
    } while (id1 === id3 || id2 === id3);
    arrId = [id1, id2, id3];
  };
  getIdCards();
  const addCard = (id) => {
    return `<div class="slider__card card" data-index="${id}">
    <img class="card__image" src="${dataPets[id].img}" />
    <h4 class="card__name">${dataPets[id].name}</h4>
    <button class="card__button button">Learn more</button>
    </div>`;
  };
  const getMobileId = () => {
    let id1 = Math.floor(Math.random() * dataPets.length);
    do {
      id1 = Math.floor(Math.random() * dataPets.length);
    } while (id1 === mobileState[0] || id1 === first);
    return [id1];
  };
  const getTabletId = () => {
    let id1 = Math.floor(Math.random() * dataPets.length);
    do {
      id1 = Math.floor(Math.random() * dataPets.length);
    } while (id1 === tabletState[0] || id1 === tabletState[1]);
    let id2 = Math.floor(Math.random() * dataPets.length);
    do {
      id2 = Math.floor(Math.random() * dataPets.length);
    } while (id2 === tabletState[0] || id2 === tabletState[1] || id2 === id1);
    return [id1, id2];
  };

  const getDesktopId = () => {
    let id1 = Math.floor(Math.random() * dataPets.length);
    do {
      id1 = Math.floor(Math.random() * dataPets.length);
    } while (
      id1 === desktopState[0] ||
      id1 === desktopState[1] ||
      id1 === desktopState[2]
    );
    let id2 = Math.floor(Math.random() * dataPets.length);
    do {
      id2 = Math.floor(Math.random() * dataPets.length);
    } while (
      id2 === desktopState[0] ||
      id2 === desktopState[1] ||
      id2 === desktopState[2] ||
      id2 === id1
    );
    let id3 = Math.floor(Math.random() * dataPets.length);
    do {
      id3 = Math.floor(Math.random() * dataPets.length);
    } while (
      id3 === desktopState[0] ||
      id3 === desktopState[1] ||
      id3 === desktopState[2] ||
      id3 === id1 ||
      id3 === id2
    );
    return [id1, id2, id3];
  };

  const renderCards = (state) => {
    return state
      .map((elem) => {
        return addCard(elem);
      })
      .join("");
  };
  let first;
  let currentId;
  let isNext = false;
  let isPrev = false;
  let mobileState = arrId.slice(0, 1);
  let tabletState = arrId.slice(0, 2);
  let desktopState = arrId;
  const useNext = () => {
    slideNext.removeEventListener("click", useNext);
    if (mediaMobile.matches) {
      if (isNext === false && isPrev === false) {
        isNext = true;
        currentId = getMobileId();
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
        sliderContent.style.left = "-310px";
      } else if (isNext === true) {
        isNext = true;
        first = mobileState;
        mobileState = currentId;
        currentId = getMobileId();
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
      } else if (isNext === false && isPrev === true) {
        isNext = true;
        isPrev = false;

        animationDesktopNext();
        sliderContent.style.left = "-310px";
        [currentId, mobileState] = [mobileState, currentId];
      }
    } else if (minMediaTablet.matches && maxMediaTablet.matches) {
      if (isNext === false && isPrev === false) {
        isNext = true;

        currentId = getTabletId();
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
        sliderContent.style.left = "-620px";
      } else if (isNext === true) {
        isNext = true;

        tabletState = currentId;
        currentId = getTabletId();
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
      } else if (isNext === false && isPrev === true) {
        isNext = true;
        isPrev = false;

        animationDesktopNext();
        sliderContent.style.left = "-620px";
        [currentId, tabletState] = [tabletState, currentId];
      }
    } else {
      if (isNext === false && isPrev === false) {
        isNext = true;

        currentId = getDesktopId();
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
        sliderContent.style.left = "-1080px";
      } else if (isNext === true) {
        isNext = true;

        desktopState = currentId;
        currentId = getDesktopId();
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.removeChild(sliderContent.firstChild);
        sliderContent.insertAdjacentHTML("beforeend", renderCards(currentId));
        animationDesktopNext();
      } else if (isNext === false && isPrev === true) {
        isNext = true;
        isPrev = false;

        animationDesktopNext();
        sliderContent.style.left = "-1080px";
        [currentId, desktopState] = [desktopState, currentId];
      }
    }
    setTimeout(() => {
      slideNext.addEventListener("click", useNext);
    }, 700);
  };
  const usePrev = () => {
    slidePrev.removeEventListener("click", usePrev);
    if (mediaMobile.matches) {
      if (isNext === false && isPrev === false) {
        isPrev = true;
        currentId = getMobileId();
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        sliderContent.style.left = "0px";
        animationDesktopPrev();
      } else if (isPrev === true && isNext === false) {
        isPrev = true;
        first = mobileState;
        mobileState = currentId;
        currentId = getMobileId();
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        animationDesktopPrev();
      } else if (isPrev === false && isNext === true) {
        isPrev = true;
        isNext = false;
        animationDesktopPrev();
        sliderContent.style.left = "0px";
        [currentId, mobileState] = [mobileState, currentId];
      }
    } else if (minMediaTablet.matches && maxMediaTablet.matches) {
      if (isNext === false && isPrev === false) {
        isPrev = true;
        currentId = getTabletId();
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        sliderContent.style.left = "0px";
        animationDesktopPrev();
      } else if (isPrev === true && isNext === false) {
        isPrev = true;
        tabletState = currentId;
        currentId = getTabletId();
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        animationDesktopPrev();
      } else if (isPrev === false && isNext === true) {
        isPrev = true;
        isNext = false;
        animationDesktopPrev();
        sliderContent.style.left = "0px";
        [currentId, tabletState] = [tabletState, currentId];
      }
    } else {
      if (isNext === false && isPrev === false) {
        isPrev = true;
        currentId = getDesktopId();
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        sliderContent.style.left = "0px";
        animationDesktopPrev();
      } else if (isPrev === true && isNext === false) {
        isPrev = true;
        desktopState = currentId;
        currentId = getDesktopId();
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.removeChild(sliderContent.lastChild);
        sliderContent.insertAdjacentHTML("afterbegin", renderCards(currentId));
        animationDesktopPrev();
      } else if (isPrev === false && isNext === true) {
        isPrev = true;
        isNext = false;
        animationDesktopPrev();
        sliderContent.style.left = "0px";
        [currentId, desktopState] = [desktopState, currentId];
      }
    }
    setTimeout(() => {
      slidePrev.addEventListener("click", usePrev);
    }, 700);
  };

  const maxMediaTablet = window.matchMedia("(max-width: 1200px)");
  const minMediaTablet = window.matchMedia("(min-width: 768px)");
  const mediaMobile = window.matchMedia("(max-width: 767px)");

  if (mediaMobile.matches) {
    sliderContent.innerHTML = addCard(arrId[0]);
  } else if (minMediaTablet.matches && maxMediaTablet.matches) {
    sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
  } else {
    sliderContent.innerHTML =
      addCard(arrId[0]) + addCard(arrId[1]) + addCard(arrId[2]);
  }
  function tablet(e) {
    if (e.matches) {
      getIdCards();
      isNext = false;
      isPrev = false;
      tabletState = arrId.slice(0, 2);
      sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
      sliderContent.style.left = null;
    } else {
      getIdCards();
      isNext = false;
      isPrev = false;
      desktopState = arrId;
      sliderContent.innerHTML =
        addCard(arrId[0]) + addCard(arrId[1]) + addCard(arrId[2]);
      sliderContent.style.left = null;
    }
  }
  function mobile(e) {
    if (e.matches) {
      getIdCards();
      isNext = false;
      isPrev = false;
      mobileState = arrId.slice(0, 1);
      sliderContent.innerHTML = addCard(arrId[0]);
      sliderContent.style.left = null;
    } else {
      getIdCards();
      isNext = false;
      isPrev = false;
      tabletState = arrId.slice(0, 2);
      sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
      sliderContent.style.left = null;
    }
  }
  maxMediaTablet.addEventListener("change", tablet);
  mediaMobile.addEventListener("change", mobile);

  const animationDesktopPrev = () => {
    sliderContent.classList.add("slider__content_prev");
    sliderContent.addEventListener("animationend", () => {
      sliderContent.classList.remove("slider__content_prev");
    });
  };
  const animationDesktopNext = () => {
    sliderContent.classList.add("slider__content_next");
    sliderContent.addEventListener("animationend", () => {
      sliderContent.classList.remove("slider__content_next");
    });
  };

  slidePrev.addEventListener("click", usePrev);
  slideNext.addEventListener("click", useNext);
};

if (sliderContent !== null) {
  slider();
}
export default slider;
