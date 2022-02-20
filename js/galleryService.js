'use strict';

var gImgs = [
  { id: 1, url: './img/1.jpg', keywords: ['politics', 'man'] },
  { id: 2, url: './img/2.jpg', keywords: ['funny', 'dog', 'cute'] },
  { id: 3, url: './img/3.jpg', keywords: ['dog', 'cute', 'baby'] },
  { id: 4, url: './img/4.jpg', keywords: ['cute', 'cat'] },
  { id: 5, url: './img/5.jpg', keywords: ['baby', 'cute', 'funny'] },
  { id: 6, url: './img/6.jpg', keywords: ['funny', 'man', 'hands'] },
  { id: 7, url: './img/7.jpg', keywords: ['baby', 'cute'] },
  { id: 8, url: './img/8.jpg', keywords: ['man', 'funny', 'hat'] },
  { id: 9, url: './img/9.jpg', keywords: ['funny', 'baby'] },
  { id: 10, url: './img/10.jpg', keywords: ['politics', 'man'] },
  { id: 11, url: './img/11.jpg', keywords: ['man', 'sports'] },
  { id: 12, url: './img/12.jpg', keywords: ['man', 'you'] },
  { id: 13, url: './img/13.jpg', keywords: ['man', 'you', 'hands'] },
  { id: 14, url: './img/14.jpg', keywords: ['man', 'you'] },
  { id: 15, url: './img/15.jpg', keywords: ['man', 'you'] },
];

var gFilterBy = 'ALL';
// function getImgs() {
//   return gImgs;
// }
function setFilter(filterBy) {
  if (filterBy === 'ALL') gFilterBy = 'ALL';
  gFilterBy = filterBy;
  renderGallery();
}
function getImagesForDisplay() {
  if (gFilterBy === 'ALL') return gImgs;

  return gImgs.filter((img) => img.keywords.includes(gFilterBy));
}
