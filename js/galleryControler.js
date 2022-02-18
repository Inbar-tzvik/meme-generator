'use strict';

function init() {
  renderGallery();
}
function renderGallery() {
  const imgs = getImagesForDisplay();

  // var imgs = getImgs();
  var strHtmls = '';
  strHtmls += imgs
    .map((img) => `<img class="item" onclick="renderMeme(${img.id})"data-id="${img.id}" src="${img.url}">`)
    .join('');

  document.querySelector('.gallery').innerHTML = strHtmls;
}
