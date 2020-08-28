//display the database
var req = new XMLHttpRequest();
req.open("GET", "/get-workouts", true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {
        createTable(JSON.parse(req.responseText));
    }
});
req.send();

function createTable(arr) {
    var workoutTable = document.getElementById("workout-table");
    if (workoutTable.firstChild != null) {
        workoutTable.removeChild(workoutTable.firstChild);
    }
    //Create Table for exercises
    var table = document.createElement("table");

    // Create header row
    var header = document.createElement("tr");
    var headCell1 = document.createElement("th");
    var headCell2 = document.createElement("th");
    var headCell3 = document.createElement("th");
    var headCell4 = document.createElement("th");
    var headCell5 = document.createElement("th");
    var headCell6 = document.createElement("th");
    var headCell7 = document.createElement("th");

    headCell1.innerText = "Name";
    header.appendChild(headCell1);
    headCell2.innerText = "Reps";
    header.appendChild(headCell2);
    headCell3.innerText = "Weight";
    header.appendChild(headCell3);
    headCell4.innerText = "Date";
    header.appendChild(headCell4);
    headCell5.innerText = "Unit";
    header.appendChild(headCell5);
    header.appendChild(headCell6);
    header.appendChild(headCell7);

    //add the headers to the row
    table.appendChild(header);

    // For each exercise in the returned array, add a row and put in the exercise data
    arr.forEach(function (row) {
        var dataRow = document.createElement("tr");

        //create the rows to hold the data
        var nameRow = document.createElement("td");
        var repsRow = document.createElement("td");
        var weightRow = document.createElement("td");
        var dateRow = document.createElement("td");
        var unitRow = document.createElement("td");
        var editRow = document.createElement("td");
        var deleteRow = document.createElement("td");

        //append the rows to the table and give each row a name
        nameRow.innerText = row["name"];
        dataRow.appendChild(nameRow);
        repsRow.innerText = row["reps"];
        dataRow.appendChild(repsRow);
        weightRow.innerText = row["weight"];
        dataRow.appendChild(weightRow);
        dataRow.appendChild(dateRow);
        if (row["date"] != null) {
            dateRow.innerText = row["date"].substring(0, 10);
        }
        //determine which cell is selected for units
        if (row["lbs"] == 1) {
            unitRow.innerText = "lbs";
        } else if (row["lbs"] == 0) {
            unitRow.innerText = "kgs";
        }
        dataRow.appendChild(unitRow);

        // Create edit button
        var form = document.createElement('form');
        var inputId = document.createElement('input');
        inputId.setAttribute('type', "hidden");
        inputId.setAttribute('value', row["id"]);
        var button = document.createElement('input');
        button.setAttribute('type', "button");
        button.setAttribute('value', "Edit");
        button.setAttribute('class', "edit");
        form.appendChild(inputId);
        form.appendChild(button);
        editRow.appendChild(form);
        dataRow.appendChild(editRow);

        // Create delete button
        var form = document.createElement('form');
        var inputId = document.createElement('input');
        inputId.setAttribute('type', "hidden");
        inputId.setAttribute('value', row["id"]);
        var button = document.createElement('input');
        button.setAttribute('type', "button");
        button.setAttribute('value', "Delete");
        button.setAttribute('class', "delete");
        form.appendChild(inputId);
        form.appendChild(button);
        deleteRow.appendChild(form);
        dataRow.appendChild(deleteRow);

        table.appendChild(dataRow);
    });
    workoutTable.appendChild(table);

    // Add click event to the edit button
    var editBtn = document.getElementsByClassName("edit");
    for (var i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', editExercise, false);
    }

    // Add click event to the delete button
    var deleteBtn = document.getElementsByClassName("delete");
    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteExercise, false);
    }
}

// If the add exercise form is submitted, send date to server through post
document.getElementById("add-exercise").addEventListener("click", function (e) {
    var req = new XMLHttpRequest();
    var payload = {
        name: null,
        reps: null,
        weight: null,
        date: null,
        unit: null
    };
    //set the values of the user input
    payload.name = document.getElementById('insert-name').value || null;
    document.getElementById('insert-name').value = null;
    payload.reps = document.getElementById('insert-reps').value || null;
    document.getElementById('insert-reps').value = null;
    payload.weight = document.getElementById('insert-weight').value || null;
    document.getElementById('insert-weight').value = null;
    payload.date = document.getElementById('insert-date').value || null;
    document.getElementById('insert-date').value = null;
    if (document.getElementById('insert-unit').checked == true) {
        payload.unit = 1;
    } else {
        payload.unit = 0;
    }

    if (payload.name == null) {
        alert("Exercise name must be entered!");
        e.preventDefault();
        return;
    }
    req.open("POST", "/add-exercise", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            createTable(JSON.parse(req.responseText));
        } else {
            console.log("Error " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    e.preventDefault();
});

//make the selected row editable when clicked
function editExercise(event) {
    var updateBtn = document.getElementsByClassName("update");
    if (updateBtn.length > 0) {
        alert("Another exercise is already being modified!");
        return;
    }
    var current = this.parentElement.parentElement.parentElement;

    // Replace name field with form input
    var nameInput = document.createElement("input");
    nameInput.setAttribute("value", current.children[0].innerText);
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "update-name");
    current.children[0].innerText = "";
    current.children[0].appendChild(nameInput);

    // Replace reps field with form input
    var repInput = document.createElement("input");
    repInput.setAttribute("value", current.children[1].innerText);
    repInput.setAttribute("type", "number");
    repInput.setAttribute("id", "update-reps");
    repInput.setAttribute("class", "num-input");
    current.children[1].innerText = "";
    current.children[1].appendChild(repInput);

    // Replace weight field with form input
    var weightInput = document.createElement("input");
    weightInput.setAttribute("value", current.children[2].innerText);
    weightInput.setAttribute("type", "number");
    weightInput.setAttribute("id", "update-weight");
    weightInput.setAttribute("class", "num-input");
    current.children[2].innerText = "";
    current.children[2].appendChild(weightInput);

    // Replace date field with form input
    var dateInput = document.createElement("input");
    dateInput.setAttribute("value", current.children[3].innerText);
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "update-date");
    current.children[3].innerText = "";
    current.children[3].appendChild(dateInput);

    // Replace unit field with drop down
    var unitInput = document.createElement("select");
    unitInput.setAttribute("id", "update-unit");
    var option1 = document.createElement("option");
    option1.setAttribute("value", "1")
    option1.innerText = "lbs";
    unitInput.appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value", "0")
    option2.innerText = "kgs";
    unitInput.appendChild(option2);

    if (current.children[4].innerText == "lbs") {
        option1.selected = true;
    } else {
        option2.selected = true;
    }
    current.children[4].innerText = "";
    current.children[4].appendChild(unitInput);

    // Replace edit button with update button
    var id = this.previousSibling.value;
    current.children[5].innerHTML = '';
    var form = document.createElement('form');
    var updateBtn = document.createElement('form');
    var inputId = document.createElement('input');
    inputId.setAttribute('type', "hidden");
    inputId.setAttribute('value', id);
    var button = document.createElement('input');
    button.setAttribute('type', "button");
    button.setAttribute('value', "Update");
    button.setAttribute('class', "update");
    form.appendChild(inputId);
    form.appendChild(button);
    current.children[5].appendChild(form);

    //add click event to new update button
    button.addEventListener("click", updateExercise, false);
    event.preventDefault();
}

//update the database
function updateExercise(event) {
    var id = this.previousSibling.value;
    var req = new XMLHttpRequest();
    var payload = {
        id: null,
        name: null,
        reps: null,
        weight: null,
        date: null,
        unit: null
    };
    payload.name = document.getElementById('update-name').value;
    payload.reps = document.getElementById('update-reps').value || null;
    payload.weight = document.getElementById('update-weight').value || null;
    payload.date = document.getElementById('update-date').value || null;
    payload.unit = document.getElementById('update-unit').value;
    payload.id = id;
    req.open("POST", "/update-exercise", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            createTable(JSON.parse(req.responseText));
        } else {
            console.log("Error " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// When a delete button is clicked, send that button's data to server to be deleted
function deleteExercise(e) {
    var req = new XMLHttpRequest();
    var id = this.previousSibling.value;
    var payload = {
        "id": id
    };
    req.open("POST", "/delete-exercise", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            createTable(JSON.parse(req.responseText));
        } else {
            console.log("Error " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    e.preventDefault();
}