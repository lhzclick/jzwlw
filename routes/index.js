var express = require('express');
var router = express.Router();
let  rd = require('rd');
let session =require('express-session');


//配置session
router.use(session({
  secret: 'this is the secret for cookie',
  resave: false,
  saveUninitialized: true
}));
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: req.session.nickName});
});

//同 步 遍 历 文 件
rd.eachSync('./views', function (f, s) {
  if(f.indexOf('.ejs')!=-1){
    let rF = f.split(`\\views\\`)[1].replace(/\\/g, "/");      //正反斜杠转换s
    let rF2 =   rF.split('.')[0];
    router.get('/'+rF, function(req, res) {
      res.render(rF, { title: rF });
    });
    router.get('/'+rF2, function(req, res) {
      res.render(rF, { title: rF });
    });
  }
});
module.exports = router;
