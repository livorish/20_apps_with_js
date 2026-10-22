const count = 10;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0


function imageLoaded() {
    console.log('image loaded or failed');
    imagesLoaded++;

    // Если загрузились (или упали с ошибкой) ВСЕ картинки
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; // Прячем лоадер
        console.log('Всё загружено, ready =', ready);
    }
}

function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Всего картинок:', totalImages);

    // ВАЖНО: не очищай контейнер, если хочешь бесконечный скролл. 
    // Если очистишь (innerHTML = ''), старые картинки удалятся.
    // imageContainer.innerHTML = ''; 

    photosArray.forEach(photoUrl => {
        const div = document.createElement('div');
        div.classList.add('image-box');

        const img = document.createElement('img');
        img.setAttribute('src', photoUrl);
        img.setAttribute('alt', 'Ошибка');

        // Ловим успешную загрузку
        img.addEventListener('load', imageLoaded);
        // Ловим ошибку (если файла нет), чтобы лоадер не завис!
        img.addEventListener('error', imageLoaded);

        div.appendChild(img);
        imageContainer.appendChild(div);
    });
}

function getPhotos() {
    console.log("СКРОЛЛ СРАБОТАЛ! Грузим новые картинки...");
    // Просто вписываешь сюда названия твоих картинок через запятую
    const photosArray = [
        'metro.jpg',
        'ryan.jpg',
        'piergiovanni.jpg',
        'tim.jpg'
    ];


    setTimeout(() => {
        displayPhotos(photosArray);
    }, 2000);

    console.log("Успех! Показываем локальные картинки:", photosArray);
    displayPhotos(photosArray);

}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();

