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
  console.log('INIT');

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

// function resizeCanvas() {
//   var elContainer = document.querySelector('.canvas-container');
//   // Note: changing the canvas dimension this way clears the canvas
//   gCanvas.width = elContainer.offsetWidth - 20;
//   // Unless needed, better keep height fixed.
//   //   gCanvas.height = elContainer.offsetHeight
// }

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
  memeLines = currMeme.lines;
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
  // console.log('location', ev.offsetX);
  // console.log('location', ev.offsetY);

  // console.log('hiii', selectedText);
  if (selectedText > -1) {
    const pos = getEvPos(ev);
    const dx = pos.x - memeLines[selectedText].x;
    const dy = pos.y - memeLines[selectedText].y;
    moveText(memeLines[selectedText], dx, dy);
    // gStartPos = pos;
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

// function drawRect(x, y) {
//   gCtx.beginPath();
//   gCtx.rect(x, y, 150, 150);
//   gCtx.fillStyle = 'orange';
//   gCtx.fillRect(x, y, 150, 150);
//   gCtx.strokeStyle = 'black';
//   gCtx.stroke();
// }

function onAddLine() {
  addLine();
  renderMeme();
}
function checkCanvasSIzeChanged() {
  // console.log(window.innerWidth);
  // console.log(gCanvasWidth);
  // console.log(gCanvas.width);
  if (window.innerWidth <= 750) {
    Updatelocation();
    changed = true;
  } else {
    changed = false;
  }
}

function setLineTxt() {
  console.log('SET LINE TXT');
  //   document.querySelector('.input-text').addEventListener('keyup', function () {
  var input = document.querySelector('.input-text').value;
  var color = document.querySelector('.color').value;
  updateTxt(input, color);
}

function buildRand() {
  currMeme = genRandomMime();
  oninit();
  renderMeme();
}

// function rotate_ctx() {
//   rotate = true;
// var line = currMeme.lines[currMeme.selectedLineIdx];
// gCtx.fillText(line.txt, line.x, line.y);
// gCtx.rotate((Math.PI / 180) * 15);
// gCtx.translate(-line.x, -line.y);
// gCtx.fillText(line.txt, 0, 0);
