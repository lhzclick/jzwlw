/**
 * Created by liuh on 2017/12/12.
 */
    var on = true
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
        var mobile = $('.useInp').val()
        if(!mobile){
            //layer.alert("用户名不能为空");
           $(this).next().html("用户名不能为空");
        }else{
            if(!(/^[a-zA-Z_][a-zA-Z0-9_]{5,16}$/.test(mobile))){
                $(this).next().html("请输入以字母开头，6-16个字符");
            }else{
                $(this).next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
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
    var mobile = $('.phoneLi').val()
    if(!mobile){
        $(this).next().next().html("手机号不能为空");
    }else{
        if(!(/^1[0-9]{10}$/.test(mobile))){
            $(this).next().next().html("请输入正确的手机号");
        }else{
            $(this).next().next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
        }
    }
    //})
})
//获取验证码
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
                console.log(data)
            }
        })
    }
})


//点击同意按钮
//$('.tyxy').on('click',function (){
//   console.log($('.loginName').val())
//    $.ajax({
//        url:'/add',
//        type:'post',
//        data:{
//            loginName:$('.loginName').val(),
//            nickName:$('.nickName').val(),
//            password:$('.password').val(),
//            tel:$('.tel').val()
//        },
//        success:function (data){
//            alert(data)
//        }
//    })
//})