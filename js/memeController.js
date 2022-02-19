'use strict';
var gCanvas;
var gCtx;
var elGallrey = document.querySelector('.gallery');
var elCanvas = document.querySelector('.editor');
var randBtn = document.querySelector('.random-meme');
var currMeme = null;
var gCurrline = 0;
var selectedText;
var gCanvasWidth;
var changed = false;
var rotate = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
function oninit() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  //   resizeCanvas();
  randBtn.style.display = 'none';
  elGallrey.style.display = 'none';

  elCanvas.classList.remove('hide');
  gCanvasWidth = gCanvas.width;
  addListeners();
}
function addListeners() {
  addMouseListeners();
  addTouchListeners();
}
function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mouseup', onUp);
}
function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchstart', onDown);
  gCanvas.addEventListener('touchend', onUp);
}
function renderMeme(id) {
  if (!currMeme) {
    oninit();
    setImg(id);
    currMeme = getMeme(id);
  }
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.fillStyle = 'rgba(30, 144, 255, 0.4)';
  if (!changed) checkCanvasSIzeChanged();
  drawImage();
  drawText();
}

function drawImage() {
  // console.log('DRAW IMG');
  var img = new Image();

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
    // setLineTxt(gCurrline);
  };
  console.log(currMeme.selectedImgId);
  img.src = `./img/${currMeme.selectedImgId}.jpg`;
}

function drawText() {
  var memeLines = currMeme.lines;
  memeLines.forEach((line, indx) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px 'Impact'`;
    if (indx === currMeme.selectedLineIdx) gCtx.strokeStyle = 'black';
    gCtx.textBaseline = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
  });
}

function onSwitchLine() {
  console.log(currMeme.selectedLineIdx);
  if (currMeme.selectedLineIdx === currMeme.lines.length - 1) {
    currMeme.selectedLineIdx = 0;
  } else {
    if (currMeme.selectedLineIdx < currMeme.lines.length) {
      currMeme.selectedLineIdx += 1;
    }
  }
  renderMeme();
}
function onIncreaseSize() {
  currMeme.lines[currMeme.selectedLineIdx].size += 1;
  renderMeme();
}

function onDecreaseSize() {
  currMeme.lines[currMeme.selectedLineIdx].size -= 1;
  renderMeme();
}
function onDown(ev) {
  memeLines = currMeme.lines;

  const pos = getEvPos(ev);
  memeLines.forEach((line, indx) => {
    console.log(isTextClicked(pos, line));
    if (isTextClicked(pos, line)) {
      selectedText = indx;
      console.log('index', indx);
    }
  });
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  var memeLines = currMeme.lines;

  if (selectedText > -1) {
    const pos = getEvPos(ev);
    const dx = pos.x - memeLines[selectedText].x;
    const dy = pos.y - memeLines[selectedText].y;
    moveText(memeLines[selectedText], dx, dy);
    renderMeme();
  }
}

function onUp() {
  selectedText = -1;
  document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function isTextClicked(clickedPos, line) {
  console.log('x', clickedPos.x);
  console.log('y', clickedPos.y);

  var x = line.x;
  var y = line.y;
  var width = gCtx.measureText(line.txt).width;
  //
  return clickedPos.x >= x && clickedPos.x <= x + width && clickedPos.y >= y - line.size && clickedPos.y <= y;
}

function onAddLine() {
  addLine();
  renderMeme();
}
function checkCanvasSIzeChanged() {
  if (window.innerWidth <= 750) {
    Updatelocation();
    changed = true;
  } else {
    changed = false;
  }
}

function setLineTxt() {
  console.log('SET LINE TXT');
  var input = document.querySelector('.input-text').value;
  var color = document.querySelector('.color').value;
  updateTxt(input, color);
}

function buildRand() {
  currMeme = genRandomMime();
  oninit();
  renderMeme();
}

function saveMeme(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  addMemeToArr(imgContent);
  // elLink.href = imgContent;
}

function onAddeEmoji() {
  var x = document.querySelector('.emoji');
  var Select_value = x.options[x.selectedIndex].text;
  console.log(Select_value);
  addEmoji(Select_value);
  renderMeme();
}

function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL('image/jpeg');

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    console.log(encodedUploadedImgUrl);
    // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`;

    // document.querySelector('.share-container').innerHTML = `
    //   <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
    //      Share
    //   </a>`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
  }

  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
