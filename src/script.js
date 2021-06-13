import images from "./gallery-items.js"

const workGallery = document.querySelector(".gallery.js-gallery")
const modalBody = document.querySelector(".lightbox.js-lightbox")
const modalGray = document.querySelector(".lightbox__overlay")
const modalImage = document.querySelector(".lightbox__image")
const modalBtn = document.querySelector('[data-action="close-lightbox"]')

const myGallery = createGallery(images);
workGallery.innerHTML = myGallery;

const allLinks = document.querySelectorAll(".gallery__link")
const arrayOfLinks = []
allLinks.forEach(link => {
    arrayOfLinks.push(link.href)
})



workGallery.addEventListener('click', onImageClick);
modalBtn.addEventListener('click', closeModalAndClearSrc)

function onImageClick(e) {
    if (e.target.nodeName !== "IMG") {
        return;
    }
    e.preventDefault();
    openModal(e.target);
}

function openModal(image) {
    modalBody.classList.add("is-open");
    modalImage.src = image.dataset.source;
    modalImage.alt = image.alt;
    window.addEventListener("keydown", hearButtons)
    modalBody.addEventListener("click", onClickGray)
}

function closeModalAndClearSrc() {
    modalBody.classList.remove("is-open");
    modalImage.src = "";
    modalImage.alt = "";
    window.removeEventListener("keydown", hearButtons)
    modalBody.removeEventListener("click", onClickGray)
}

function hearButtons(e) {
    if (e.code === "Escape") {
        closeModalAndClearSrc();
    }
    else if (e.code === "ArrowRight") {
        e.preventDefault();
        getRightSrc()
    }
    else if (e.code == "ArrowLeft") {
       e.preventDefault();
       getLeftSrc()
    }
}

function onClickGray(e) {
    if (e.target === modalGray) {
        closeModalAndClearSrc();
    }
}

function createGallery(gallery) {
    return gallery
        .map(gal => {
            return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${gal.original}"
  >
    <img
      class="gallery__image"
      src="${gal.preview}"
      data-source="${gal.original}"
      alt="${gal.description}"
    />
  </a>
</li>`
        })
        .join("");
}

function getRightSrc() {
    for (let i = 0; i < arrayOfLinks.length; i++){
        if (i === arrayOfLinks.length - 1) {
            modalImage.src = arrayOfLinks[0];
            return
            }
        if (arrayOfLinks[i] === modalImage.src) {
            console.log(modalImage.src)
            console.log(arrayOfLinks[i])
            modalImage.src = arrayOfLinks[arrayOfLinks.indexOf(arrayOfLinks[i]) + 1]
            return
        }
    }
}

function getLeftSrc() {
    for (let i = arrayOfLinks.length - 1; i => 0; i--){
        if (i === 0) {
            modalImage.src = arrayOfLinks[arrayOfLinks.length - 1];
            return
            }
        if (arrayOfLinks[i] === modalImage.src) {
            console.log(modalImage.src)
            console.log(arrayOfLinks[i])
            modalImage.src = arrayOfLinks[arrayOfLinks.indexOf(arrayOfLinks[i]) - 1]
            return
        }
    }
}