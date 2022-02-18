var gMeme = [
  {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
      { txt: 'Write your text here', size: 30, align: 'right', color: 'white', x: 35, y: 35 },
      { txt: 'Write your text here', size: 30, align: 'left', color: 'white', x: 35, y: 350 },
    ],
  },
];
var input = document.querySelector('.input-text').value;
var color = document.querySelector('.color').value;

function setImg(id) {
  gMeme.selectedImgId = id;
}
function getMeme(id) {
  //   console.log(typeof id);
  //   var meme = gMeme.find((meme) => meme.selectedImgId === id);
  //   console.log(meme);
  return gMeme;
}
function setLineTxt(gCurrline) {
  console.log('SET LINE TXT');
  //   document.querySelector('.input-text').addEventListener('keyup', function () {
  var input = document.querySelector('.input-text').value;
  var color = document.querySelector('.color').value;
  console.log('ON KEY UP');
  //   gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  console.log(gMeme[0].selectedLineIdx);
  gMeme[0].lines[gMeme[0].selectedLineIdx].txt = input;
  gMeme[0].lines[gMeme[0].selectedLineIdx].color = color;

  renderMeme();
  //   });
}
// function setLineTxt(txt) {
//   gMeme[0].lines[gMeme[0].selectedLineIdx].txt = txt;
// }

function saveLoc(indx, x, y) {
  gMeme[0].lines[[indx]].x = x;
  gMeme[0].lines[[indx]].y = y;
}

function addLine() {
  gMeme[0].lines.push({ txt: 'Write your text here', size: 30, align: 'left', color: 'white', x: 35, y: 250 });
}

function moveText(line, dx, dy) {
  line.x += dx;
  line.y += dy;
}

function Updatelocation(newYDec) {
  gMeme[0].lines.forEach((line) => {
    line.y -= 10;
  });
}
