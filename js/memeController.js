var gCanvas;
var gCtx;
var elGallrey = document.querySelector('.gallery');
var elCanvas = document.querySelector('.editor');

function oninit() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  resizeCanvas();
  elGallrey.style.display = 'none';
  elCanvas.classList.remove('hide');
}

function renderMeme(id) {
  oninit();
  setImg(id);
  var meme = getMeme(id);
  drawImage(meme);
  //   console.log(meme);
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth - 20;
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
}

function DynamicText() {
  document.querySelector('.input-text').addEventListener('keyup', function () {
    console.log('history');
    console.log(this.value);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // DrawOverlay(img);
    // DrawText();
    // text_title = this.value;
    // ctx.fillText(text_title, 50, 50);
  });
}

function drawImage(meme) {
  var img = new Image();
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText(meme);
    console.log(memeLines);
  };
  img.src = `../img/${meme.selectedImgId}.jpg`;
}

function drawText(meme) {
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
