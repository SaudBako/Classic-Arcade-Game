/*
    Controls game logic.
*/

//Used for determining entitys' size and step length
const blockWidth = 101;
const blockHeight = 83;

const numEndBlocks = 5;
const numStartBlocks = 5;

let levelDesign = [
    [numEndBlocks, 'water'],
    [3, 'grass'],
    [3, 'stone'],
    [1, 'grass'],
    [2, 'stone'], 
    [1, 'grass'],
    [1, 'stone'],
    [numStartBlocks, 'grass']
];

let rowImages = [];

for (rows of levelDesign) {
    for (let row = 0; row < rows[0]; row++) {
        rowImages.push(rows[1]);
    }
}

let numRows = rowImages.length;
const numCols = 5;

//Represents the boundraies of the game area
const areaWidth = blockWidth * numCols;
const areaHeight = blockHeight * numRows;

//Instantiates entities
const allEnemies = [];
const allRocks = [
    new Rock(2, 14),
    new Rock(1, 11),
    new Rock(1, 6),
    new Rock(1, 7),
    new Rock(3, 6),
    new Rock(3, 7)
];
let allGems;

const player = new Player();
const goal = new Goal(2, numEndBlocks);

function makeEnemies() {
    allEnemies.length = 0;
    for (let row = numEndBlocks; row < rowImages.length; row++) {
        if (rowImages[row] == 'stone') {
            allEnemies.push(new Enemy(-1, row, Math.random() * 300 + 50));
        }
    }
}

function makeGems() {
    allGems = [
        new Gem(4, 14),
        new Gem(0, 14),
        new Gem(0, 11),
        new Gem(4, 11),
        new Gem(1, 5),
        new Gem(3, 5)
    ];
}

function makeBoundingRocks() {
    for (let col = 0; col < numCols; col++) {
        allRocks.push(new Rock(col, numRows - 3));
    }
}

makeEnemies();
makeBoundingRocks();
makeGems();