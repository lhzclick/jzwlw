/**
 * Created by liuh on 2017/12/11.
 */

$('.eye').mouseover(function(){
    $(this).css('background-image','url(/views/login/img/eye-b.png)')
    $(this).prev().attr('type','text')
})
$('.eye').mouseout(function(){
    $(this).css('background-image','url(/views/login/img/eye-h.png)')
    $(this).prev().attr('type','password')
})