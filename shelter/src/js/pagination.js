import { dataPets } from "./dataPets";
const gridCards = document.querySelector(".pets__grid");
const numberPage = document.querySelector(".pagination__page_active");
const prevPage = document.querySelector(".pagination__prev");
const nextPage = document.querySelector(".pagination__next");
const prevFull = document.querySelector(".pagination__prev-full");
const nextFull = document.querySelector(".pagination__next-full");

let currentPage = 1;
const randomArr = [];
let resultArr = [];
const maxMediaTablet = window.matchMedia("(max-width: 1280px)");
const minMediaTablet = window.matchMedia("(min-width: 768px)");
const mediaMobile = window.matchMedia("(max-width: 767px)");

const pagination = () => {
  const generationId = (arr) => {
    let id = Math.floor(Math.random() * dataPets.length);
    do {
      id = Math.floor(Math.random() * dataPets.length);
    } while (
      id === arr[0] ||
      id === arr[1] ||
      id === arr[2] ||
      id === arr[3] ||
      id === arr[4] ||
      id === arr[5] ||
      id === arr[6] ||
      id === arr[7]
    );
    return id;
  };
  for (let i = 0; i < dataPets.length; i++) {
    randomArr.push(generationId(randomArr));
  }

  const arr1 = randomArr.slice(0, 3).sort((a, b) => {
    return b - a;
  });
  const arr2 = randomArr.slice(3, 6);
  const arr3 = randomArr.slice(6, 8);

  let resultArr1 = [...arr1, ...arr2, ...arr3];
  [arr1[2], arr1[0]] = [arr1[0], arr1[2]];
  [arr2[0], arr2[1]] = [arr2[1], arr2[0]];
  let resultArr2 = [...arr1, ...arr2, ...arr3];
  [arr1[1], arr1[2]] = [arr1[2], arr1[1]];
  [arr2[1], arr2[2]] = [arr2[2], arr2[1]];
  let resultArr3 = [...arr1, ...arr2, ...arr3];
  [arr1[0], arr1[2]] = [arr1[2], arr1[0]];
  [arr2[0], arr2[2]] = [arr2[2], arr2[0]];
  let resultArr4 = [...arr1, ...arr2, ...arr3];
  [arr3[0], arr3[1]] = [arr3[1], arr3[0]];
  [arr2[2], arr2[1]] = [arr2[1], arr2[2]];
  let resultArr5 = [...arr1, ...arr2, ...arr3];
  [arr1[1], arr1[0]] = [arr1[0], arr1[1]];
  [arr1[2], arr1[0]] = [arr1[0], arr1[2]];
  let resultArr6 = [...arr1, ...arr2, ...arr3];

  resultArr = [
    ...resultArr1,
    ...resultArr2,
    ...resultArr3,
    ...resultArr4,
    ...resultArr5,
    ...resultArr6,
  ];

  const addCard = (id) => {
    return `<div class="grid__card card" data-index="${id}">
  		<img class="card__image" src="${dataPets[id].img}" />
  		<h4 class="card__name">${dataPets[id].name}</h4>
  		<button class="card__button button">Learn more</button>
  		</div>`;
  };
  const renderCards = (id) => {
    return id
      .map((elem) => {
        return addCard(elem);
      })
      .join("");
  };
  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const renderMobile = (page) => {
    gridCards.innerHTML = renderCards(sliceIntoChunks(resultArr, 3)[page - 1]);
  };
  const renderTablet = (page) => {
    gridCards.innerHTML = renderCards(sliceIntoChunks(resultArr, 6)[page - 1]);
  };
  const renderDesktop = (page) => {
    gridCards.innerHTML = renderCards(sliceIntoChunks(resultArr, 8)[page - 1]);
  };

  const inactivePrev = () => {
    prevFull.classList.add("pagination__prev-full_inactive");
    prevPage.classList.add("pagination__prev_inactive");
  };
  const activePrev = () => {
    prevFull.classList.remove("pagination__prev-full_inactive");
    prevPage.classList.remove("pagination__prev_inactive");
  };
  const inactiveNext = () => {
    nextFull.classList.add("pagination__next-full_inactive");
    nextPage.classList.add("pagination__next_inactive");
  };
  const activeNext = () => {
    nextFull.classList.remove("pagination__next-full_inactive");
    nextPage.classList.remove("pagination__next_inactive");
  };

  if (mediaMobile.matches) {
    inactivePrev();
    renderMobile(currentPage);
  } else if (minMediaTablet.matches && maxMediaTablet.matches) {
    inactivePrev();
    renderTablet(currentPage);
  } else {
    inactivePrev();
    renderDesktop(currentPage);
  }
  function tablet(e) {
    nextFull.addEventListener("click", changeLastNext);
    nextPage.addEventListener("click", changeNext);
    activeNext();
    if (e.matches) {
      inactivePrev();
      currentPage = 1;
      numberPage.textContent = currentPage;

      renderTablet(currentPage);
    } else {
      inactivePrev();
      currentPage = 1;
      numberPage.textContent = currentPage;

      renderDesktop(currentPage);
    }
  }
  function mobile(e) {
    nextFull.addEventListener("click", changeLastNext);
    nextPage.addEventListener("click", changeNext);
    activeNext();
    if (e.matches) {
      inactivePrev();
      currentPage = 1;
      numberPage.textContent = currentPage;

      renderMobile(currentPage);
    } else {
      inactivePrev();
      currentPage = 1;
      numberPage.textContent = currentPage;

      renderTablet(currentPage);
    }
  }
  const changePrev = () => {
    nextFull.addEventListener("click", changeLastNext);
    nextPage.addEventListener("click", changeNext);
    if (mediaMobile.matches) {
      if (currentPage !== 1) {
        activeNext();
        currentPage -= 1;
        numberPage.textContent = currentPage;
        renderMobile(currentPage);
        if (currentPage === 1) {
          inactivePrev();
          prevFull.removeEventListener("click", changeLastPrev);
          prevPage.removeEventListener("click", changePrev);
        }
      }
    } else if (minMediaTablet.matches && maxMediaTablet.matches) {
      if (currentPage !== 1) {
        activeNext();
        currentPage -= 1;
        numberPage.textContent = currentPage;
        renderTablet(currentPage);
        if (currentPage === 1) {
          inactivePrev();
          prevFull.removeEventListener("click", changeLastPrev);
          prevPage.removeEventListener("click", changePrev);
        }
      }
    } else {
      if (currentPage !== 1) {
        activeNext();
        currentPage -= 1;
        numberPage.textContent = currentPage;
        renderDesktop(currentPage);
        if (currentPage === 1) {
          inactivePrev();
          prevFull.removeEventListener("click", changeLastPrev);
          prevPage.removeEventListener("click", changePrev);
        }
      }
    }
  };
  const changeNext = () => {
    prevFull.addEventListener("click", changeLastPrev);
    prevPage.addEventListener("click", changePrev);
    if (mediaMobile.matches) {
      if (currentPage !== 16) {
        activePrev();
        currentPage += 1;
        numberPage.textContent = currentPage;
        renderMobile(currentPage);
        if (currentPage === 16) {
          inactiveNext();
          nextFull.removeEventListener("click", changeLastNext);
          nextPage.removeEventListener("click", changeNext);
        }
      }
    } else if (minMediaTablet.matches && maxMediaTablet.matches) {
      if (currentPage !== 8) {
        activePrev();
        currentPage += 1;
        numberPage.textContent = currentPage;
        renderTablet(currentPage);
        if (currentPage === 8) {
          inactiveNext();
          nextFull.removeEventListener("click", changeLastNext);
          nextPage.removeEventListener("click", changeNext);
        }
      }
    } else {
      if (currentPage !== 6) {
        activePrev();
        currentPage += 1;
        numberPage.textContent = currentPage;
        renderDesktop(currentPage);
        if (currentPage === 6) {
          inactiveNext();
          nextFull.removeEventListener("click", changeLastNext);
          nextPage.removeEventListener("click", changeNext);
        }
      }
    }
  };
  const changeLastPrev = () => {
    if (currentPage !== 1) {
      prevFull.removeEventListener("click", changeLastPrev);
      prevPage.removeEventListener("click", changePrev);
      nextFull.addEventListener("click", changeLastNext);
      nextPage.addEventListener("click", changeNext);
      inactivePrev();
      activeNext();
      if (mediaMobile.matches) {
        currentPage = 1;
        numberPage.textContent = currentPage;
        renderMobile(currentPage);
      } else if (minMediaTablet.matches && maxMediaTablet.matches) {
        currentPage = 1;
        numberPage.textContent = currentPage;
        renderTablet(currentPage);
      } else {
        currentPage = 1;
        numberPage.textContent = currentPage;
        renderDesktop(currentPage);
      }
    }
  };
  const changeLastNext = () => {
    nextFull.removeEventListener("click", changeLastNext);
    nextPage.removeEventListener("click", changeNext);
    prevFull.addEventListener("click", changeLastPrev);
    prevPage.addEventListener("click", changePrev);
    inactiveNext();
    activePrev();
    if (mediaMobile.matches) {
      currentPage = 16;
      numberPage.textContent = currentPage;
      renderMobile(currentPage);
    } else if (minMediaTablet.matches && maxMediaTablet.matches) {
      currentPage = 8;
      numberPage.textContent = currentPage;
      renderTablet(currentPage);
    } else {
      currentPage = 6;
      numberPage.textContent = currentPage;
      renderDesktop(currentPage);
    }
  };

  maxMediaTablet.addEventListener("change", tablet);
  mediaMobile.addEventListener("change", mobile);
  prevPage.addEventListener("click", changePrev);
  nextPage.addEventListener("click", changeNext);
  prevFull.addEventListener("click", changeLastPrev);
  nextFull.addEventListener("click", changeLastNext);
};

if (numberPage !== null) {
  pagination();
}
export default pagination;
