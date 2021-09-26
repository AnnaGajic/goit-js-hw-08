import galleryItems from '../references/images.js';
import refs from '../references/refs.js';
const { list, closeBtn, modal, modalImage, modalCloseOverlay } = refs;

const galleryMarkup = createGalleryMarkup(galleryItems);

// рендеринг разметки
function createGalleryMarkup(images) {
  return images.
    map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
     `;
    }).
    join('');
}


// добавляем динамически созданную разментку на существующий элемент
list.insertAdjacentHTML('beforeend', galleryMarkup);

// вешаем слушателя события на list
list.addEventListener('click', onGalleryListClick);

// Фильтр target клика
// если это не елемент image выходим

function onGalleryListClick(event) {
  event.preventDefault();
  event.stopPropagation();

  const isGalleryImageEl = event.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }
  
  // Вешаем слушателя события на модолку
  modal.classList.add('is-open');
  
  modalImage.src = event.target.dataset.source;
  modalImage.alt = event.target.alt;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalClose();
    }
  });
}
// закрытие модального окна при клике на кнопку
modalCloseOverlay.addEventListener('click', modalClose);
closeBtn.addEventListener('click', modalClose);

function modalClose(event) {
  modal.classList.remove('is-open')
  modalImage.src = "";
  modalImage.alt = "";
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalClose()
    }
  });
}

  





