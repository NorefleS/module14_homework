const btn = document.querySelector(".button");
const error = document.querySelector(".error");
const resultNode = document.querySelector(".result");

function loadPhoto(photoUrl, val1, val2) {
    const photo =
    `<img
        src="${photoUrl}"
        style="width: ${val1}; height: ${val2}"
    >`;
    resultNode.innerHTML = photo;
}

btn.addEventListener('click', () => {
  const value1 = document.querySelector(".input1").value;
  const value2 = document.querySelector(".input2").value;

  if ((value1 < 100 || value1 > 300 || isNaN(value1)) || (value2 < 100 || value2 > 300 || isNaN(value2))) {
    error.textContent = "Одно из чисел вне диапазона от 100 до 300";
  } else {
            fetch(`https://dummyimage.com/${value1}x${value2}/`)
            .then((response) => response.url)
            .then((result) => {
                loadPhoto(result, value1, value2);
                console.log("Loaded");
            })
            .catch(() => {
                console.log("Error");
            });
  }
})