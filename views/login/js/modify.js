/**
 * Created by liuh on 2017/12/12.
 */

let shortM;
//手机号正则验证
$('.phoneLi').on('blur input',function(){
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
                    if(data=="true"){
                        _this.next().next().html(`<img class="okReg" src="/views/login/img/Ok.png">`);
                    }else{
                        _this.next().next().html("用户未注册");
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

//点击下一步
$('.next').on('click',function(){
    if($('.prompt img').length===2){
        $('.jdtS2').css('background','#5ca3e6')
        $('.jdtS3').css('background','#5ca3e6')
        $('.phoneTab').hide()
        $('.phoneTab1').show()
        $('.jdtS6').show()
    }
});

//初始密码正则验证
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


//点击修改密码
$('.submit').on('click',function(){
    //所有正则匹配
    if($('.prompt img').length===4){
        $.ajax({
            url:'/update',
            type:'post',
            data:{
                tel:$('.phoneLi').val(),
                password:$('.confirm').val()
            },
            success:function (data){
                $('.jdtS4').css('background','#5ca3e6');
                $('.jdtS5').css('background','#5ca3e6');
                $('.phoneTab1').hide();
                $('.phoneTab2').show();
                $('.jdtS7').show();
            }
        })
    }

})