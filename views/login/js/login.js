/**
 * Created by liuh on 2017/12/11.
 */

$('.eye').mousedown(function(){
    $(this).css('background-image','url(/views/login/img/eye-b.png)')
    $(this).prev().attr('type','text')
})
$('.eye').mouseup(function(){
    $(this).css('background-image','url(/views/login/img/eye-h.png)')
    $(this).prev().attr('type','password')
})
$('.loginWz').on('click',function (){
    $.ajax({
        url:'/info',
        type:'post',
        data:{
            loginName:$('.loginName').val(),
            loginName:$('.loginName').val(),
            password:$('.password').val()
        },
        success:function(data){
          if(data){
              window.location.href = '/';
          }else{
              alert('用户不存在或密码错误')
          }
        }
    })
})