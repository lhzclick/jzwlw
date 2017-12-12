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
