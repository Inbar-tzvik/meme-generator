var gCanvas;
var gCtx;
var elGallrey = document.querySelector('.gallery');
var elCanvas = document.querySelector('.editor');
var currMeme = null;
var img = new Image();
var gCurrline = 0;
var selectedText;

function oninit() {
  console.log('INIT');
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  //   resizeCanvas();
  elGallrey.style.display = 'none';
  elCanvas.classList.remove('hide');
  addListeners();
}
function addListeners() {
  addMouseListeners();
}
function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mouseup', onUp);
}
function renderMeme(id) {
  if (!currMeme) {
    oninit();
    console.log('RENDER MEME');
    setImg(id);
    currMeme = getMeme(id);
    drawImage();
  } else {
    console.log('RENDER MEME 1');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCtx.fillStyle = 'rgba(30, 144, 255, 0.4)';
    // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
    drawText1();
  }
}

// function resizeCanvas() {
//   var elContainer = document.querySelector('.canvas-container');
//   // Note: changing the canvas dimension this way clears the canvas
//   gCanvas.width = elContainer.offsetWidth - 20;
//   // Unless needed, better keep height fixed.
//   //   gCanvas.height = elContainer.offsetHeight
// }

function drawImage() {
  console.log('DRAW IMG');
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText1();
    setLineTxt(gCurrline);
  };
  img.src = `./img/${currMeme.selectedImgId}.jpg`;
}

// function drawText(meme) {
//   console.log('DRAW TEXT');
//   memeLines = meme.lines;
//   memeLines.forEach((line) => {
//     for (let key in line) {
//       //   console.log(`${key}: ${mobile[key]}`);

//       gCtx.lineWidth = 1;
//       gCtx.strokeStyle = 'brown';
//       gCtx.fillStyle = 'white';
//       // if (key == 'size')
//       gCtx.font = "40px 'Impact'";
//       if (key === 'txt') {
//         console.log(line[[key]]);
//         gCtx.textBaseline = 'middle';
//         gCtx.fillText(line[key], 35, 50);
//       }
//     }
//   });
// }

function drawText1(line) {
  console.log('DRAW TEXT');

  memeLines = currMeme[0].lines;
  console.log(memeLines);
  memeLines.forEach((line, indx) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px 'Impact'`;

    gCtx.textBaseline = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    // saveLoc(indx, 35, 35 + indx * 350);

    gCtx.strokeText(line.txt, line.x, line.y);
    gCtx.drawFocusIfNeeded(currMeme[0].lines[indx]);
    // }
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
}
function onDown(ev) {
  const pos = getEvPos(ev);
  console.log('onDown()');
  //   console.log(ev);
  memeLines.forEach((line, indx) => {
    console.log(line.x);
    console.log(line.y);
    if (isCircleClicked(pos, line)) {
      selectedText = indx;
      console.log(currMeme[0].lines[selectedText].focus());
      currMeme[0].lines[selectedText].focus();
      console.log('index', indx);
      // } else {
      //   console.log(selectedText, 'text');
      //   selectedText = -1;
    }
  });

  //   if (!isSenTtenceClicked(pos)) return;
  //   setCircleDrag(true);
  //   gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  //   console.log('onMove()');
  //   const pos = getEvPos(ev);

  //   const circle = getCircle();
  var memeLines = currMeme[0].lines;
  console.log('hiii', selectedText);
  if (selectedText > -1) {
    console.log('here');
    const pos = getEvPos(ev);

    const dx = pos.x - memeLines[selectedText].x;
    const dy = pos.y - memeLines[selectedText].y;
    moveCircle(memeLines[selectedText], dx, dy);
    // gStartPos = pos;
    renderMeme();
  }
}

function onUp() {
  console.log('onUp()');
  selectedText = -1;
  document.body.style.cursor = 'grab';
}
function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  // if (gTouchEvs.includes(ev.type)) {
  //   ev.preventDefault();
  //   ev = ev.changedTouches[0];
  //   pos = {
  //     x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
  //     y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
  //   };
  // }
  return pos;
}

function isCircleClicked(clickedPos, line) {
  console.log('x', clickedPos.x);
  var x = line.x;
  var y = line.y;
  var width = gCtx.measureText(line.txt).width;
  //   const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2);
  //   var distance = gCtx.measureText(line.txt).width - clickedPos.x;
  //   console.log(distance);
  return clickedPos.x >= x && clickedPos.x <= x + width && clickedPos.y >= y - line.size && clickedPos.y <= y;
}

function moveCircle(line, dx, dy) {
  line.x += dx;
  line.y += dy;
}
