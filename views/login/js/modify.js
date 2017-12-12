/**
 * Created by liuh on 2017/12/12.
 */
$('.next').on('click',function(){
    layui.use('layer',function(){
        var layer = layui.layer
        var mobile = $('.phoneLi').val()
        if(!mobile){
            layer.alert("手机号不能为空");
        }else if(!(/^1[3|5][0-9]\d{4,8}$/.test(mobile))){
            layer.alert("请输入正确的手机号");
        }else{
            $('.jdtS2').css('background','#5ca3e6')
            $('.jdtS3').css('background','#5ca3e6')
            $('.phoneTab').hide()
            $('.phoneTab1').show()
            $('.jdtS6').show()
        }
    })
})
$('.submit').on('click',function(){
    $('.jdtS4').css('background','#5ca3e6')
    $('.jdtS5').css('background','#5ca3e6')
    $('.phoneTab1').hide()
    $('.phoneTab2').show()
    $('.jdtS7').show()
})

