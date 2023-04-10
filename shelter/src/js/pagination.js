import { dataPets } from "./dataPets";
const sliderContent = document.querySelector(".slider__content");
const pagination = () => {
  const randomArr = [];
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
  console.log(randomArr);
  console.log(arr1);
  console.log(arr2);
  console.log(arr3);

  let resultArr = [];

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
  let resultArr5 = resultArr2;
  let resultArr6 = resultArr1;
  resultArr = [
    ...resultArr1,
    ...resultArr2,
    ...resultArr3,
    ...resultArr4,
    ...resultArr5,
    ...resultArr6,
  ];
  console.log(resultArr);
  const addCard = (id) => {
    return `<div class="slider__card card ">
  		<img class="card__image" src="${dataPets[id].img}" />
  		<h4 class="card__name">${dataPets[id].name}</h4>
  		<button data-index=${id} class="card__button button">Learn more</button>
  		</div>`;
  };
  const renderCards = (id) => {
    return id
      .map((elem) => {
        return addCard(elem);
      })
      .join("");
  };
  const maxMediaTablet = window.matchMedia("(max-width: 1280px)");
  const minMediaTablet = window.matchMedia("(min-width: 768px)");
  const mediaMobile = window.matchMedia("(max-width: 767px)");

  if (mediaMobile.matches) {
  } else if (minMediaTablet.matches && maxMediaTablet.matches) {
  } else {
  }
  function tablet(e) {
    if (e.matches) {
      console.log("tablet");
    } else {
      console.log("desktop");
    }
  }
  function mobile(e) {
    if (e.matches) {
      console.log("mobile");
    } else {
      console.log("tablet");
    }
  }
  maxMediaTablet.addEventListener("change", tablet);
  mediaMobile.addEventListener("change", mobile);
};
pagination();
export default pagination;
