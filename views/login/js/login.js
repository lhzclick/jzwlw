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
});
$(document).keydown(function(event){
    if(event.keyCode==13){
        $.ajax({
            url:'/info',
            type:'post',
            data:{
                loginName:$('.loginName').val(),
                loginName:$('.loginName').val(),
                password:$('.password').val()
            },
            success:function(data){
                if(data==0){
                    //res.send("");
                    layui.use('layer',function(){
                        layer.alert("账户未审核")
                    })
                }else if(data==1){
                    //res.send("已审核");
                    window.location.href = '/';
                }else if(data==2){
                    layui.use('layer',function(){
                        layer.alert("账户审核未通过")
                    })
                    //res.send("未通过");
                }else{
                    layui.use('layer',function(){
                        layer.alert("用户不存在或密码错误")
                    })
                }
            }
        })
    }
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
/*顶部轮播图*/
TouchSlide({
    slideCell:"#slideBox",
    titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    mainCell:".bd ul",
    effect:"leftLoop",
    autoPage:true,//自动分页
    autoPlay:true //自动播放
});
//111