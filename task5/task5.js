const btn = document.querySelector(".button");
const error = document.querySelector(".error");
const resultNode = document.querySelector(".result");

function loadPhotos(apiData) {
    let cards = "";

    apiData.forEach(item => {
        const cardBlock =
        `<div class="card">
            <img
                src="${item.thumbnailUrl}"
                class="card-image">
            <p>${item.title}</p>
        </div>`
        cards += cardBlock;
    })
    resultNode.innerHTML = cards;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photos", resultNode.innerHTML);
}

function loadPhotosFromLocalStorage() {
    resultNode.innerHTML = localStorage.getItem("last_photos");
    return resultNode.innerHTML.length > 0
}

btn.addEventListener('click', () => {
    const pageNum = document.querySelector(".pageNum").value;
    const limit = document.querySelector(".limit").value;

    if ((pageNum < 1 || pageNum > 10 || isNaN(pageNum)) && ((limit < 1 || limit > 10 || isNaN(limit)))) {
        error.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
    }
    else if (pageNum < 1 || pageNum > 10 || isNaN(pageNum)) {
        error.textContent = "Номер страницы вне диапазона от 1 до 10";
    }
    else if (limit < 1 || limit > 10 || isNaN(limit)) {
        error.textContent = "Лимит вне диапазона от 1 до 10";
    }
    else {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadPhotos(json);
            savePhotosToLocalStorage();
            console.log("Loaded");
        })
        .catch(() => {
            console.log("Error");
        });
    }
    
})

loadPhotosFromLocalStorage();