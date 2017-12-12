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
$('.tyxy').on('click',function(){
    layui.use('layer',function(){
        var mobile = $('.phoneLi').val()
        if(!mobile){
            layer.alert("手机号不能为空");
        }else if(!(/^1[3|5][0-9]\d{4,8}$/.test(mobile))){
            layer.alert("请输入正确的手机号");
        }
    })
})
$('.tamWz').on('click',function (){
    $.ajax({
        url:'http://sapi.253.com/msg/HttpBatchSendSM',
        type:'post',
        dataType: 'json',
        data:{
            //account=vip-lsy1&pswd=Tch5832075&mobile=18627798893&msg=您的注册验证码是:aaa&needstatus=true
            account:'vip-lsy1',
            pswd:'Tch5832075',
            phone:'15727042308',
            msg:'您的注册验证码是:8767'
            //needstatus:true
        },
        success:function (data){
            console.log(data)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError)
        }
    })
})
