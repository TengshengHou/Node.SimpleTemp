var express = require('express');
var Route=require('./route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var app=express();
app.use(express.static('wwwroot'))// static File Middleware
app.use(express.static('view'))
app.use(cookieParser());//Cookie Middleware
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));


Route(app);//Route register
var server =app.listen(8081,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})