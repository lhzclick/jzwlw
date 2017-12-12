var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
let mysql =require('mysql');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //配置公共静态文件

app.use('/', routes);
app.use('/users', users);
app.use('/views', express.static('views'));   //配置项目静态文件
//mysql创建连接
var connection = mysql.createConnection({
    host:'114.135.61.186',
    user:'root',
    password:'root',
    port:'33061',
    database:'jzwlw'
})
//执行连接
connection.connect(function(err){
    if(err){
        console.log('[query]-:'+err);
    }else{
        console.log('conneting')
    }
})


//connection.end();
//查询
app.post('/info', function (req, res) {
    //执行查询
    let userGetSql = 'SELECT * FROM userInfo';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('查询错误')
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            res.header("Content-Type", "application/json;charset=utf-8");
            res.send(result);
        }
    });
});


//注册 添加用户
app.post('/add',function (req,res){
    let querys = req.query;
    let [loginName,password,tel,nickName] = [querys.loginName,querys.password,querys.tel,querys.nickName];
    console.log(querys)
    connection.query("insert into info(loginName,password,tel,nickName) values('"+loginName+"','"+ password +"','"+tel+"','"+ nickName +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.send("新增成功");
        }
    });
});

//






// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
