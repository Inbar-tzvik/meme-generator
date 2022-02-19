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
var gSavedMemes = [];
const memesSentences = [
  'I never eat falafel',
  'DOMS DOMS EVERYWHERE',
  'Stop Using i in for loops',
  'Armed in knowledge',
  'Js error "Unexpected String"',
  'One does not simply write js',
  'I`m a simple man i see vanilla JS, i click like!',
  'JS, HTML,CSS?? Even my momma can do that',
  'May the force be with you',
  'I know JS',
  'JS Where everything is made up and the rules dont matter',
  'Not sure if im good at programming or good at googling',
  'But if we could',
  'JS what is this?',
  'Write hello world , add to cv 7 years experienced',
];

var stickres = ['😍', '🥴', '😀', '😁', '🥺', '😬', '🤷🏼‍♀️', '🤭'];
function setImg(id) {
  gMeme[0].selectedImgId = id;
}
function getMeme(id) {
  //   console.log(typeof id);
  var meme = gMeme.find((meme) => meme.selectedImgId === id);
  //   console.log(meme);
  return meme;
}
function updateTxt(input, color) {
  console.log(gMeme[0].selectedLineIdx);
  gMeme[0].lines[gMeme[0].selectedLineIdx].txt = input;
  gMeme[0].lines[gMeme[0].selectedLineIdx].color = color;
  renderMeme();
}
function addLine() {
  gMeme[0].lines.push({ txt: 'Write your text here', size: 30, align: 'left', color: 'white', x: 35, y: 250 });
}

function moveText(line, dx, dy) {
  line.x += dx;
  line.y += dy;
}

function Updatelocation() {
  gMeme[0].lines.forEach((line) => {
    line.y += 20;
  });
}

function genRandomMime() {
  var randImg = getRandomIntInclusive(1, 18);
  var curr1 = {
    selectedImgId: randImg,
    selectedLineIdx: 0,
    lines: [],
  };
  var numLines = getRandomIntInclusive(1, 2);
  for (var i = 0; i < numLines; i++) {
    var text = memesSentences[getRandomIntInclusive(0, 14)];
    curr1.lines.push({ txt: text, size: 20, align: 'right', color: getRandomColor(), x: 4, y: 35 + i * 100 });
  }
  return curr1;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addMemeToArr(img) {
  gSavedMemes = loadFromStorage(STORAGE_KEY);
  if (!gSavedMemes || !gSavedMemes.length) gSavedMemes = [];
  gSavedMemes.push(img);
  console.log(gSavedMemes);
  _saveMemesToStorage();
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes);
}
