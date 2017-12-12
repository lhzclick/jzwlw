/**
 * Created by 39253 on 2017/12/11.
 */
//页面加载判断用户名密码存在
$.ajax({
    url:'/userEx',
    type:'post',
    success:function(data){
        if(!data){
            window.location.href = '/login/pages/login';
        }
    }
})