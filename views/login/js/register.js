/**
 * Created by liuh on 2017/12/12.
 */
var on = true;
let shortM;
$('.checked').on('click',function(){

    if(on){
        $('.hide').hide()
        on = false
    } else {
        $('.hide').show()
        on = true
    }
});

//用户名正则验证
$('.useInp').on('blur',function(){
    let _this = $(this)
    var mobile = $('.useInp').val()
    if(!mobile){
        //layer.alert("用户名不能为空");
       $(this).next().html("用户名不能为空");
    }else{
        if(!(/^[a-zA-Z_][a-zA-Z0-9_]{5,16}$/.test(mobile))){
            $(this).next().html("请输入以字母开头，6-16个字符");
        }else{
            $.ajax({
                url:'/findLoin',
                type:'post',
                data:{
                    loginName:$('.useInp').val()
                },
                success:function(data){
                    if(data=="false"){
                        _this.next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
                    }else{
                        _this.next().html("该用户名已存在");
                    }
                }
            })
        }
    }
})
//昵称正则验证
$('.nickName').on('blur',function(){
    var nickNameR = $('.nickName').val()
    if(!nickNameR){
        $(this).next().html("昵称不能为空");
    }else{
        $(this).next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
    }
})


//密码正则验证
$('.passwordInp').on('blur',function(){
        var mobile = $('.passwordInp').val()
        if(!mobile){
            $(this).next().html("密码不能为空");

        }else{
            if(!(/^\w{6,16}$/.test(mobile))){
                $(this).next().html("最少6字符，最多16字符");
            }else{
                $(this).next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
            }
        }
})
//确认密码匹配
$('.confirm').on('blur',function(){
    if($('.passwordInp').val()!=$('.confirm').val()){
        $(this).next().html("两次密码不一致");
    }else{
        $(this).next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
    }
});
//手机号正则验证
$('.phoneLi').on('blur',function(){
    let _this = $(this)
    var mobile = $('.phoneLi').val()
    if(!mobile){
        $(this).next().next().html("手机号不能为空");
    }else{
        if(!(/^1[0-9]{10}$/.test(mobile))){
            $(this).next().next().html("请输入正确的手机号");
        }else{
            $.ajax({
                url:'/findTel',
                type:'post',
                data:{
                    tel:$('.phoneLi').val()
                },
                success:function(data){
                    if(data=="false"){
                        _this.next().next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
                    }else{
                        _this.next().next().html("该手机号已注册");
                    }
                }
            })
        }
    }
});

//倒计时函数
var wait=60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value="获取验证码";
        wait = 60;
    } else {

        o.setAttribute("disabled", true);
        o.value="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
//点击获取验证码
$('.tamWz').on('click',function(){
    //手机号正则验证通过
    if($('.phoneLi').next().next().children().length==1){
        //console.log(true)
        time(this);
        //获取手机验证码
        let telNum =  $('.phoneLi').val();
        $.ajax({
            url:'/message',
            type:'post',
            data:{
                telNum:telNum
            },
            success:function(data){
                shortM = data.shortM;

            }
        })
    }
});


//手机验证码验证
$('.yzmIpt').on('blur',function(){
    //判断用户验证码验证通过
    if($('.yzmIpt').val()==shortM){
        $(this).next().next().html(`<img class="okReg" src="/views/login/img/Ok.png">`)
    }else{
        $(this).next().next().html("请输入正确的验证码");
    }
});


//点击同意按钮
$('.tyxy').on('click',function (){
    let [loginName,phoneLi] = [$('.loginName').val(),$('.phoneLi').val()];
    if($('.prompt img').length === 6 && $('.allReg')[0].checked == true){
        //所有验证通过
        $.ajax({
            url:'/add',
            type:'post',
            data:{
                loginName:$('.loginName').val(),
                nickName:$('.nickName').val(),
                password:$('.password').val(),
                tel:$('.tel').val()
            },
            success:function (data){
                layui.use('layer',function(){
                    layer.alert(data);
                    setInterval(function(){
                        window.location.href="/login/pages/login";
                    },1000)
                })
            }
        })
    }else{
        layui.use('layer',function(){
            layer.alert("请勾选同意按钮或填写完整信息")
        })
    }
})