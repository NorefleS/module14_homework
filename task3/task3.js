const btn = document.querySelector(".button");
const error = document.querySelector(".error");
const divError = "Число вне диапазона от 1 до 10";
const resultNode = document.querySelector('.result');

btn.addEventListener('click', () => {
  const value = document.querySelector(".input").value;

  if (value < 1 || value > 10) {
    error.innerHTML = divError;
  } else {
    useRequest(`https://jsonplaceholder.typicode.com/photos?_limit=${value}`, loadPhotos)
  }
})

function useRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
};

function loadPhotos(apiData) {
  let cards = '';

  apiData.forEach(item => {
    const cardBlock = `
        <div class="card">
          <img
            src="${item.thumbnailUrl}"
            class="card-image"
          />
          <p>${item.title}</p>
        </div>`;

    cards = cards + cardBlock;
  });

  resultNode.innerHTML = cards;
}