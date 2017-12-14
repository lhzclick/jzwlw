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
let session =require('express-session');
let  http = require('http');
let  qs = require('querystring');


//后台请求http
let router = express.Router();
let request = require('request');

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

//配置session
app.use(session({
    secret: 'this is the secret for cookie',
    resave: false,
    saveUninitialized: true
}));
//connection.end();
//查询 登陆验证 写入session
app.post('/info', function (req, res) {
    let bodyInfo = req.body;
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
            //res.send(result);
            let sucOn = -1;
            result.forEach(function(e,i){
                if(bodyInfo.loginName==e.loginName&&bodyInfo.password==e.password){
                    sucOn=i;
                }else if(bodyInfo.loginName==e.tel&&bodyInfo.password==e.password){
                    sucOn=i;
                }
            });
            if(sucOn!=-1){
                req.session.loginName = result[sucOn].loginName;
                req.session.password = result[sucOn].password;
                req.session.nickName = result[sucOn].nickName;
                req.session.tel = result[sucOn].tel;
                res.send(true);
            }else{
                res.send(false);
            }

        }
    });
});
//查询 读取session
app.post('/userEx', function (req, res) {
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
            let sucOn = -1;
            result.forEach(function(e,i){
                if(req.session.loginName==e.loginName&&req.session.password==e.password){
                    sucOn=i;
                }else if(req.session.loginName==e.tel&&req.session.password==e.password){
                    sucOn=i;
                }
            });
            if(sucOn!=-1){
                res.send(req.session);
            }else{
                res.send(false);
            }
        }
    });
});




//注册 添加用户
app.post('/add',function (req,res){
    let bodyInfo = req.body;
    let [loginName,password,tel,nickName] = [bodyInfo.loginName,bodyInfo.password,bodyInfo.tel,bodyInfo.nickName];
    let userGetSql = 'SELECT * FROM userInfo';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('查询错误')
        }else {
            let isLogin = false;
            result.forEach(function (e,i){
                if(e.loginName==loginName|| e.tel==tel){
                    isLogin = true;
                }
            });
            if(!isLogin){
                connection.query("insert into userInfo(loginName,password,tel,nickName) values('"+loginName+"','"+ password +"','"+tel+"','"+ nickName +"')",function(err,rows){
                    if(err){
                        res.send("新增失败"+err);
                    }else {
                        console.log('新增成功');
                        res.send("新增成功");
                    }
                });
            }else{
                res.send("用户名或密码已存在");
            }
        }
    });
});


//请求http短信接口
app.post('/message', function(req, res){
    let Num="";
    for(let i = 0;i < 6;i ++ ){
        Num+=Math.floor(Math.random()*10);
    };
    let bodyInfo = req.body;
    var method = req.method.toUpperCase();
    var proxy_url = `http://sapi.253.com/msg/HttpBatchSendSM?account=vip-lsy1&pswd=Tch5832075&mobile=${bodyInfo.telNum}&msg=Your validation code : ${Num}&needstatus=true`;
    var options = {
        headers: {
            "Connection": "close",
            value: 'application/x-www-form-urlencoded'
        },
        url: proxy_url,
        method: method,
        json: true,
        body: req.body
    };
    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------',data);
            res.send({
                status:data,
                shortM:Num
            })
        }
    }
    request(options, callback);
})
//修改密码
app.post('/update',function (req,res){
    let querys = req.body;
    let [tel,password] =  [querys.tel,querys.password];
    var update = `update userInfo set password ="${password}"  where tel ="${tel}"`;
    //var sql = "update user set age = '"+ age +"',sex = '"+ sex +"',password = '"+ password +"' where user = " + user;
    connection.query(update,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.send("修改成功");
        }
    });
})

//查询手机号是否存在
app.post('/findTel',function (req,res){
    let bodyInfo = req.body;
    let tel= bodyInfo.tel;
    let userGetSql = 'SELECT tel FROM userInfo';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('查询错误')
        }else {
            let isLogin = false;
            result.forEach(function (e,i){
                if(e.tel==tel){
                    isLogin = true;
                }
            });
            if(!isLogin){
                res.send("false");
            }else{
                res.send("true");
            }
        }
    });
});





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
