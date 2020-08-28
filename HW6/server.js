const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({
    defaultLayout: "main"
});
const mysql = require('mysql');
const cors = require('cors');

var pool = mysql.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_leonep',
    password: 'Arrow-pl55',
    database: 'cs290_leonep'
});

var port = 7749;

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cors());

//reset table
app.get('/reset-table', function (req, res, next) {
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function (err) {
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        pool.query(createString, function (err) {
            context.results = "Table reset";
            res.render('home', context);
        })
    });
});

// Home page
app.get('/', function (req, res) {
    var context = {};
    res.render('home', context);
});

// Returns database data
app.get('/get-workouts', function (req, res, next) {
    workoutData(req, res, next);
});

// Gets data from client to add new completed exercise
app.post('/add-exercise', function (req, res, next) {
    pool.query("INSERT INTO workouts (`name`, `date`,`reps`,`weight`,`lbs`) VALUES (?,?,?,?,?)", 
    [req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit], 
    function (err, result) {
        if (err) {
            next(err);
            return;
        }
        workoutData(req, res, next);
    });
});


app.post('/delete-exercise', function (req, res, next) {
    pool.query("DELETE FROM workouts WHERE id = ?", [req.body.id], function (err, result) {
        if (err) {
            next(err);
            return;
        }
        workoutData(req, res, next);
    });
});

//Queries database for all data in it and sends to client
function workoutData(req, res, next) {
    pool.query('SELECT * FROM workouts ORDER BY name', function (err, rows) {
        if (err) {
            next(err);
            return;
        }
        res.type('application/json');
        res.send(rows);
    });

}

// Update an entry in the database with the new data from client
app.post('/update-exercise', function (req, res, next) {
    pool.query("UPDATE workouts SET name=?, date=?, reps=?, weight=?, lbs=? WHERE id = ?", 
    [req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit, req.body.id], 
    function (err, result) {
        if (err) {
            next(err);
            return;
        }
        workoutData(req, res, next);
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, function () {
    console.log("Listening on port " + port)
})

module.exports.pool = pool;