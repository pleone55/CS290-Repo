const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout: "main"})

const app = express();

app.set('port', 4797);
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.type('text/plain');

    let queryParams = [];
    for(const q in req.query) {
        queryParams.push({ "name": q, "value": req.query[q] });
    }

    let data = {};
    data.dataList = queryParams;
    res.render("get", data);
});

app.post('/',function(req,res){
    res.type('text/plain');

    let queryParams = [];
    for(const q in req.query) {
        queryParams.push({ "name": q, "value": req.query[q] });
    }

    let dataParams = [];
    for(const d in req.body){
        dataParams.push({ "name": d, "value": req.body[d] });
    }

    let data = {};
    data.dataList = queryParams;
    data.bodyList = dataParams;
    res.render("post", data);
});

app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate')
});