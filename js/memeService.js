var gMemes = [
  {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' }],
  },
];

function setImg(id) {
  gMemes.push({
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [{ txt: 'put your txt here', size: 20, align: 'left', color: 'red' }],
  });
}
function getMeme(id) {
  console.log(typeof id);
  var meme = gMemes.find((meme) => meme.selectedImgId === id);
  console.log(meme);
  return meme;
}
function setLineTxt() {}

// function drawText(text, x, y) {
//   // gCtx.font = '48px serif';
//   // gCtx.fillText(text, x, y);

//   gCtx.lineWidth = 1;
//   gCtx.strokeStyle = 'brown';
//   gCtx.fillStyle = 'black';
//   gCtx.font = '20px Arial';
//   gCtx.fillText(text, x, y);
//   gCtx.strokeText(text, x, y);
// }
