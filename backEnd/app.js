//Mongo Params
var mongoose = require('mongoose');

//Express
var express = require("express");
var cors = require('cors');
var app = express();
app.set('port', process.env.PORT || 8000);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(require('cors')());
app.listen(app.get('port'));

//Model
var UserLogin = require('./models/userLogin');

app.post('/authenticateUser', function (req, res) {

    var responseObj = {};
    var id = req.body.id;
    var pwd = req.body.pwd;

    function getIdPassword() {
        return new Promise((resolve, reject) => {
            UserLogin.findOne({
                id: id
            })
                .then(res10 => {
                    var password = res10.pwd;
                    if (password == pwd) {
                        resolve();
                    }
                    else {
                        reject("Passwords Dont Match");
                    }
                })
                .catch(err => {
                    reject("Unable to authenticate you, Please Try again later");
                })
        })
    }

    function sendResponse() {
        return new Promise((resolve, reject) => {
            responseObj.status = "success";
            res.json(responseObj);
            resolve();
        })
    }

    getIdPassword()
        .then(sendResponse)
        .catch(err => {
            console.log("Error in API->" + err);
            responseObj.status = "error";
            responseObj.message = err;
            res.json(responseObj);
        })

})

app.post('/addUser', function (req, res) {

    var responseObj = {};
    var id = req.body.id;
    var pwd = req.body.pwd;

    function addUserFunc() {
        return new Promise((resolve, reject) => {
            var userLoginObj = UserLogin({
                id: id,
                pwd: pwd
            })
            userLoginObj.save()
                .then(res10 => {
                    resolve();
                })
                .catch(err => {
                    reject("Unable to add you, Please Try again later");
                })
        })
    }

    function sendResponse() {
        return new Promise((resolve, reject) => {
            responseObj.status = "success";
            res.json(responseObj);
            resolve();
        })
    }

    addUserFunc()
        .then(sendResponse)
        .catch(err => {
            console.log("Error in API->" + err);
            responseObj.status = "error";
            responseObj.message = message;
            res.json(responseObj);
        })

})