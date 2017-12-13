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
//手机号正则验证
$('.phoneLi').on('blur',function(){
    layui.use('layer',function(){
        var mobile = $('.phoneLi').val()
        if(!mobile){
            layer.alert("手机号不能为空");
        }else if(!(/^1[0-9]{10}$/.test(mobile))){
            layer.alert("请输入正确的手机号");
        }
    })
})
//用户名正则验证
$('.useInp').on('blur',function(){
    layui.use('layer',function(){
        var mobile = $('.useInp').val()
        if(!mobile){
            layer.alert("用户名不能为空");
        }else if(!(/^[a-zA-Z0-9_-]{4,16}$/.test(mobile))){
            layer.alert("请输入规范的用户名");
        }
    })
})
//密码正则验证
$('.passwordInp').on('blur',function(){
    layui.use('layer',function(){
        var mobile = $('.passwordInp').val()
        if(!mobile){
            layer.alert("密码不能为空");
        }else if(!(/^\w{6,16}$/.test(mobile))){
            layer.alert("最少6字符，最多16字符");
        }
    })
})
//确认密码匹配
$('.confirm').on('blur',function(){
    if($('.passwordInp').val()!=$('.confirm').val()){
        layui.use('layer',function(){
            layer.alert("请输入相同的密码");
        })
    }
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
$('#btn').on('click',function(){
    time(this)
})
$('.tamWz').on('click',function (){
    //获取手机验证码
    let telNum =   $('.phoneLi').val();
    $.ajax({
        url:'/message',
        type:'post',
        success:function(data){
            console.log(data.message)
            let url = `http://sapi.253.com/msg/HttpBatchSendSM?account=vip-lsy1&pswd=Tch5832075&mobile=${telNum}&msg=您的注册验证码是:${data.message}&needstatus=true`;
            $.ajax({
                url:url,
                type:'post',
                dataType: 'jsonp',
                data:{
                    //account=vip-lsy1&pswd=Tch5832075&mobile=18627798893&msg=您的注册验证码是:aaa&needstatus=true
                    //account:'vip-lsy1',
                    //pswd:'Tch5832075',
                    //phone:'15727042308',
                    //msg:'您的注册验证码是:1111'
                    //needstatus:true
                },
                success:function (data){
                    console.log(data)
                }
            })
        }
    })


})
