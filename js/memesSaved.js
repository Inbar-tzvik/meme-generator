'use strict';
// function init() {
//     renderGallery();
//   }
const STORAGE_KEY = 'Mmems';

function renderMemeGallery() {
  console.log('you are here');
  document.querySelector('.meme-gallery').style.display = 'block';

  document.querySelector('.gallery').style.display = 'none';
  document.querySelector('.editor').style.display = 'none';
  document.querySelector('.search').style.display = 'none';

  var strHtmls = '';
  const memes = loadFromStorage(STORAGE_KEY);
  if (!memes || !memes.length) strHtmls += 'There is no saved Mmems yet';
  else {
    strHtmls += memes.map((img) => `<img class="item"  src="${img}">`).join('');
  }

  document.querySelector('.saved-memes').innerHTML = strHtmls;
}
