function makeTable() {
    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    //loop to create the table rows
    for(var i = 0; i < 4; i++){
        var tableRow = document.createElement("tr");

        //loop to create the header rows
        for(var j = 0; j < 4; j++){
            if(i == 0){
                var tableHead = document.createElement("th");
                var headText = document.createTextNode("Header " + (j + 1)); //Header 1, Header 2...
                tableHead.append(headText);     //Add the header text to the table head
                tableRow.appendChild(tableHead);    //Append the rows to the table head
            } else {
                //create the cells
                var cell = document.createElement("td");
                var cellText = document.createTextNode((i) + ', ' + (j+1));     //location of the cells 1,1 2,1...
                cell.appendChild(cellText);     //append the text to the cell
                tableRow.appendChild(cell);     //append the cells to the rows of the body
            }
        }
        //append the rows to the table body 
        tbody.appendChild(tableRow);
    }
    //append the table body to the table
    table.appendChild(tbody);
    //append the table to the body of the html
    body.appendChild(table);
    //set a border since none show
    table.setAttribute("border", "1px");
}

function makeButtons() {
    var upButton = document.createElement("button");
    //set the id 
    upButton.id = "up";
    //set the text
    var upButtonText = document.createTextNode("Up");
    upButton.appendChild(upButtonText);
    //append to the body of the page
    document.body.appendChild(upButton);

    var downButton = document.createElement("button");
    //set the id 
    downButton.id = "down";
    //set the text
    var downButtonText = document.createTextNode("Down");
    downButton.appendChild(downButtonText);
    //append to the body of the page
    document.body.appendChild(downButton);

    var leftButton = document.createElement("button");
    //set the id 
    leftButton.id = "left";
    //set the text
    var leftButtonText = document.createTextNode("Left");
    leftButton.appendChild(leftButtonText);
    //append to the body of the page
    document.body.appendChild(leftButton);

    var rightButton = document.createElement("button");
    //set the id 
    rightButton.id = "right";
    //set the text
    var rightButtonText = document.createTextNode("Right");
    rightButton.appendChild(rightButtonText);
    //append to the body of the page
    document.body.appendChild(rightButton);

    //mark the cell with this button
    var markCellButton = document.createElement("button");
    markCellButton.id = "mark";
    var markText = document.createTextNode("Mark Cell");
    markCellButton.appendChild(markText);
    document.body.appendChild(markCellButton);
}

//functionality for the up button
function moveUp() {
    //using the "this" keyword we can grab the current_cell cell
    var current_cell = document.getElementById("this");
    //if the current_cell selected cell is the top then return that postion
    if(current_cell.parentNode.rowIndex <= 1){
        return;
    }
    var pointer = current_cell.cellIndex;
    current_cell.style.borderWidth = "1.5px";
    //remove the id so it can be assigned to another cell
    current_cell.removeAttribute("id");
    current_cell = current_cell.parentNode;
    current_cell = current_cell.previousElementSibling;
    current_cell = current_cell.firstElementChild;

    for(var i = 0; i < pointer; i++){
        current_cell = current_cell.nextElementSibling;
    }
    current_cell.style.borderWidth = "2px";
    current_cell.id = "this";
}

function moveDown() {
    var current_cell = document.getElementById("this");
    //if cell is at the bottom do nothing
    if(current_cell.parentNode.rowIndex >= 3){
        return;
    }
    var pointer = current_cell.cellIndex;
    current_cell.style.borderWidth = "1.5px";
    current_cell.removeAttribute("id");
    current_cell = current_cell.parentNode;
    current_cell = current_cell.nextElementSibling;
    current_cell = current_cell.firstElementChild;

    for(var i = 0; i < pointer; i++){
        current_cell = current_cell.nextElementSibling;
    }
    current_cell.style.borderWidth = "2px";
    current_cell.id = "this";
}

function moveRight(){
    var current_cell = document.getElementById("this");
    //if cell is all the way to the right
    if(current_cell.cellIndex == 3) { 
        return;
    }
    current_cell.style.borderWidth = "1.5px";
    current_cell.removeAttribute("id"); 
    current_cell = current_cell.nextElementSibling; 
    current_cell.style.borderWidth = "2px"; 
    current_cell.id = "this"; 
}

function moveLeft(){
    var current_cell = document.getElementById("this");
    //if cell is all the way to the left
    if(current_cell.cellIndex == 0) { 
        return;
    }
    current_cell.style.borderWidth = "1.5px";
    current_cell.removeAttribute("id"); 
    current_cell = current_cell.previousElementSibling;         //Set current_cell cell to the cell on its left
    current_cell.style.borderWidth = "2px"; 
    current_cell.id = "this"; 
}

//color marking of selected cell
function markCell(){
    var current_cell = document.getElementById("this");      //The currently selected cell
    current_cell.style.backgroundColor = "yellow";
}

makeTable();
makeButtons();

//the first table cell selected is the top left header
var current_cell = document.getElementsByTagName("td")[0];
current_cell.id = "this";
current_cell.style.borderWidth = "4px"; 

//add event listeners for when clicked the cells move in that direction
document.getElementById("up").addEventListener("click", moveUp);
document.getElementById("down").addEventListener("click", moveDown);
document.getElementById("left").addEventListener("click", moveLeft);
document.getElementById("right").addEventListener("click", moveRight);
document.getElementById("mark").addEventListener("click", markCell);