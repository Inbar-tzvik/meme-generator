var gMeme = [
  {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
      { txt: 'I sometimes eat Falafel', size: 20, align: 'right', color: 'blue' },
      { txt: 'hello ', size: 20, align: 'left', color: 'red' },
    ],
  },
];

function setImg(id) {
  gMeme.selectedImgId = id;
}
function getMeme(id) {
  //   console.log(typeof id);
  //   var meme = gMeme.find((meme) => meme.selectedImgId === id);
  //   console.log(meme);
  return gMeme;
}
function setLineTxt() {
  console.log('SET LINE TXT');
  document.querySelector('.input-text').addEventListener('keyup', function () {
    console.log('ON KEY UP');
    var color = document.querySelector('.color').value;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme[0].lines[gMeme[0].selectedLineIdx].txt = this.value;
    gMeme[0].lines[gMeme[0].selectedLineIdx].color = color;

    renderMeme();
  });
}
