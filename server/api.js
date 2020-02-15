const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongo_string = "mongodb://localhost:27017/usermanagement";
const http = require('http');
const request = require('request');
const axios = require('axios');
const querystring = require('querystring');
const requestify = require('requestify'); 
const rest = require('restler');
// const querystring = require('querystring');
// // var parseString = require('xml2js').parseString;
// // // const fs = require('fs');
// var parseString = require('xml2js').parseString;

const Client = require('node-rest-client').Client;
const client = new Client();

router.get('/show', function (req,res){
    //res.end("hi, show");
    mongoClient.connect(mongo_string, function(req,db){
        db.collection("courses")
        .find()
        .toArray()
        .then(courses=>{
            const output = {result: "ok", message: courses}
            res.json(output);
        })
        db.close();
    });
});
router.post('/add', function (req,res){
    //console.log("1");
    //res.end("Hi, add api: " +req.body.name);
    mongoClient.connect(mongo_string, function(err,db){
        const data = {
                        userId: req.body.userid,
                        userName: req.body.nameTh,
                        userNameEn: req.body.userNameEn,
                        deptId: req.body.deptId,
                        teamId: req.body.teamId,
                        branchId: req.body.branchId,
                        supUserId: req.body.supUserId,
                        phone: req.body.phone,
                        mobile: req.body.mobile,
                        email:  req.body.email,
                        socialNetwork: req.body.socialNetwork,
                        activeFlag: req.body.activeFlag,
                        startWorkDate: req.body.startWorkDate,
                        lastWorkDate: req.body.lastWorkDate,
                        remark: req.body.remark
                    };

        db.collection('courses')
        .insertOne(data, (err,result)=>{
            if(err) throw err;
            const response = {result: 'ok', message: result.result.n + " Inserted"};
            res.json(response);
        });
        db.close();
    });

});
router.delete('/delete/:username', function (req,res){
    //res.end("hi, delete: " + req.params.name);
    const query = {username: req.params.username};
    mongoClient.connect(mongo_string, function (err,db){
        db.collection("courses")
        .deleteMany(query, function(err,result){
            if(err) throw err;
            const response = {result: 'ok', message : result.result.n + " Deleted"};
            res.json(response);
        });
        db.close();
    });
});

router.get('/show/id/:id', function(req,res){
    console.log("find by: "+ req.params.id);
    
    var obj_id = new ObjectID(req.params.id);
    //console.log(query);
    mongoClient.connect(mongo_string, function (err,db){
        db.collection("courses")
        .findOne({_id:obj_id}, function(err,result){
            if(err) throw err;
            console.log(result);
            const response = {result: 'ok', message: result};
            res.json(response);
            // console.log(result);
        });
        db.close();
    });
});

router.get('/test', function (req,res){
    // var test = 9999;
    var params = {'userId':'9999'};
    var url = "test";
    var args = {
        json:true
    }
    client.get(url,args,function (data, result) {
            //console.log(data);
            result = data["ns:getUserResponse"]["ns:return"];
            const response = {result: 'ok', message: result};
            res.json(response);
            console.log(result);
            // raw response            
    });

});

router.get('/addUser', function (req,res){
    
    var params = {'userId':'','groupId':'','userName': '', 'userNameEn': '', 'deptId': '', 'teamId': ''
    , 'branchId': '', 'supUserId': '', 'phone': '', 'mobile': '', 'email': '', 'socialNetwork': '', 'activeFlag': 'Y', 'startWorkDate': '', 'lastWorkDate': '', 'remark': ''};
    var url = "test";
    var args = {
        json:true
    }
    client.get(url,args,function (data, result) { 
        result = data["ns:addUserResponse"]["ns:return"];
        const response = {result: 'ok', message: result};
        res.json(response);
       console.log(response); 
    });



});



router.post('/update', function (req,res){

    request.post({
        "headers": { "content-type": "application/json" },
        "url": "test",
        "body": JSON.stringify({
            "userId": "",
            "groupId": ""
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    });


    // mongoClient.connect(mongo_string, function(err,db){
    //     const data = {
    //                     userId: "1",
    //                     userName: "1",
    //                     userNameEn: "1",
    //                     deptId: "1",
    //                     teamId: "1",
    //                     branchId: "1",
    //                     supUserId: "1",
    //                     phone: "1",
    //                     mobile: "1",
    //                     email:  "1",
    //                     socialNetwork: "1",
    //                     activeFlag: "1",
    //                     startWorkDate: "1",
    //                     lastWorkDate: "1",
    //                     remark: "1"
    //                 };

    //     db.collection('courses')
    //     .insertOne(data, (err,result)=>{
    //         if(err) throw err;
    //         const response = {result: 'ok', message: result.result.n + " Inserted"};
    //         res.json(response);
    //     });
    //     db.close();
    // });
    // console.log("1");
});
module.exports = router;