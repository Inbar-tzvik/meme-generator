var gCanvas;
var gCtx;
var elGallrey = document.querySelector('.gallery');
var elCanvas = document.querySelector('.editor');
var currMeme = null;
var gCurrline = 0;
var selectedText;
var gCanvasWidth;
var changed = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
function oninit() {
  console.log('INIT');

  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  //   resizeCanvas();
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

  // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
  drawText1();
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
    drawText1();
    setLineTxt(gCurrline);
  };
  img.src = `./img/${currMeme.selectedImgId}.jpg`;
}

function drawText1() {
  memeLines = currMeme[0].lines;
  memeLines.forEach((line, indx) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px 'Impact'`;
    if (indx === currMeme[0].selectedLineIdx) gCtx.strokeStyle = 'black';
    gCtx.textBaseline = line.align;
    gCtx.fillText(line.txt, line.x, line.y);

    gCtx.strokeText(line.txt, line.x, line.y);
  });
}

function onSwitchLine() {
  console.log(currMeme[0].selectedLineIdx);
  if (currMeme[0].selectedLineIdx === currMeme[0].lines.length - 1) {
    currMeme[0].selectedLineIdx = 0;
  } else {
    if (currMeme[0].selectedLineIdx < currMeme[0].lines.length) {
      currMeme[0].selectedLineIdx += 1;
    }
  }
  renderMeme();
}
function onDown(ev) {
  memeLines = currMeme[0].lines;

  const pos = getEvPos(ev);
  memeLines.forEach((line, indx) => {
    console.log(line.x);
    console.log(line.y);
    console.log(line);
    console.log(isTextClicked(pos, line));
    if (isTextClicked(pos, line)) {
      selectedText = indx;
      console.log('index', indx);
    }
  });
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  var memeLines = currMeme[0].lines;
  console.log('location', ev.offsetX);
  console.log('location', ev.offsetY);

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
  console.log(window.innerWidth);
  console.log(gCanvasWidth);
  console.log(gCanvas.width);
  if (window.innerWidth <= 750) {
    var newYDec = 100;
    Updatelocation(newYDec);
    changed = true;
  } else {
    changed = false;
  }
}
