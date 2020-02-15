const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
    app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('./server/api.js'));


app.use('*',function(req,res){
    res.end("hi!!");
    //res.sendfile(path.join(__dirname,'index.html'));
});

const server = app.listen(8081, function(){
    const port = server.address().port;
    console.log("server is running at port: %s", port);
});