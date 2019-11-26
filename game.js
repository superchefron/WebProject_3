/*
 * /
 * @param {any} clicked: the clicked web element
 * moves tile to empty space
 * calls weGood() for move legality
 * calls checkWin() to check winning board state
 */
function move(clicked) {
    if (weGood(clicked)) {
        var empty = findEmpty();
        picMove(empty, clicked);
        empty.innerHTML = clicked.innerHTML;
        clicked.innerHTML = 16;
        if (checkWin()) {
            document.getElementById('id01').style.display = 'block';
        }
    }
}

function picMove(empty, clicked) {
    var empID = empty.getAttribute("id");
    var temp = clicked.getAttribute("id");
    clicked.setAttribute("id",empID);
    empty.setAttribute("id",temp);
}

function moveNoWin(clicked) {
    if (weGood(clicked)) {
        var empty = findEmpty();
        empty.innerHTML = clicked.innerHTML;
        clicked.innerHTML = 16;
    }
}
function findEmpty() {
    var tiles = document.getElementsByClassName('puzzle-piece');
    var empty;
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 16) {
            empty = tiles[i];
        }
    }
    return empty;
}
function checkWin() {
    var tiles = document.getElementsByClassName('puzzle-piece');
    var diff;
    for (var i = 0; i < tiles.length - 1; i++) {
        diff = tiles[i + 1].innerHTML - tiles[i].innerHTML;
        if (diff != 1) {
            return false;
        }
    }
    return true;
}
function shuffle() {
    var tiles;
    var choice;
    for (var i = 0; i < 30; i++) {
        var positionOfBlank = findPosition(findEmpty());
        var legalMoves = blocksThatCanMove(positionOfBlank);
        var rand = Math.floor(Math.random() * (legalMoves.length) + 0);
        tiles = document.getElementsByClassName('puzzle-piece');
        choice = tiles[legalMoves[rand]];
        moveNoWin(choice);
    }
}
function weGood(clicked) {
    var positionOfBlank = findPosition(findEmpty());
    var positionOfClicked = findPosition(clicked);
    var legalMoves = blocksThatCanMove(positionOfBlank);
    if (legalMoves.includes(positionOfClicked)) {
        return true;
    }
    else return false;
}
function blocksThatCanMove(position) {
    switch (position) {
        case 0:
            console.log('case found!');
            return new Array(position + 1, position + 4);
            break;
        case 1:
        case 2:
            console.log('case found!');
            return new Array(position - 1, position + 1, position + 4);
            break;
        case 3:
            console.log('case found!');
            return new Array(position - 1, position + 4);
            break;
        case 4:
        case 8:
            console.log('case found!');
            return new Array(position - 4, position + 1, position + 4);
            break;
        case 7:
        case 11:
            console.log('case found!');
            return new Array(position - 4, position - 1, position + 4);
            break;
        case 5:
        case 6:
        case 9:
        case 10:
            console.log('case found!');
            return new Array(position - 4, position - 1, position + 1, position + 4);
            break;
        case 12:
            console.log('case found!');
            return new Array(position - 4, position + 1);
            break;
        case 13:
        case 14:
            console.log('case found!');
            return new Array(position - 4, position - 1, position + 1);
            break;
        case 15:
            console.log('case found!');
            return new Array(position - 4, position - 1);
            break;
        default:
            console.log('case not found!');
    }
}
function findPosition(elem) {
    var tiles = document.getElementsByClassName('puzzle-piece');
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == elem.innerHTML) {
            return i;
        }
    }
}