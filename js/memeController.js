var gCanvas;
var gCtx;
var elGallrey = document.querySelector('.gallery');
var elCanvas = document.querySelector('.editor');
var currMeme = null;
var img = new Image();
var gCurrline = 0;

function oninit() {
  console.log('INIT');
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  resizeCanvas();
  elGallrey.style.display = 'none';
  elCanvas.classList.remove('hide');
}
// function renderMeme1() {
//   console.log('RENDER MEME 1');
//   gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
//   gCtx.fillStyle = 'rgba(30, 144, 255, 0.4)';
//   gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
//   drawText1();
// }

function renderMeme(id) {
  if (!currMeme) {
    console.log('RENDER MEME');
    oninit();
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

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth - 20;
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
}

function drawImage() {
  console.log('DRAW IMG');
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText1();
    setLineTxt();
  };
  img.src = `../img/${currMeme.selectedImgId}.jpg`;
}

function drawText(meme) {
  console.log('DRAW TEXT');
  memeLines = meme.lines;
  memeLines.forEach((line) => {
    for (let key in line) {
      //   console.log(`${key}: ${mobile[key]}`);

      gCtx.lineWidth = 1;
      gCtx.strokeStyle = 'brown';
      gCtx.fillStyle = 'white';
      // if (key == 'size')
      gCtx.font = "40px 'Montserrat'";
      if (key === 'txt') {
        console.log(line[[key]]);
        gCtx.textBaseline = 'middle';
        gCtx.fillText(line[key], 35, 50);
      }
    }
  });
}

function drawText1() {
  console.log('DRAW TEXT');

  memeLines = currMeme[0].lines;
  console.log(memeLines);
  memeLines.forEach((line, indx) => {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px 'Montserrat'`;

    var line = line.txt;
    gCtx.textBaseline = line.align;
    gCtx.fillText(line, 20 + indx * 100, 35 + indx * 100);
    // }
  });
}

function onSwitchLine() {}
