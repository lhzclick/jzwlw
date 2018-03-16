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
//浏览器窗口改变
window.onresize = function(){
    var scHeight = $(window).height()
    $('.platformWrap').css('height',scHeight)
    var scHeight1= $(window).height()-60
    $('.platformBtm').css('height',scHeight1)
}
//获取一屏的高度
var scHeight = $(window).height()
$('.platformWrap').css('height',scHeight)
var scHeight1= $(window).height()-60
$('.platformBtm').css('height',scHeight1)
//顶部hover
$('.back').mouseover(function(){
    $('.zhixiang').attr('src','/views/img/zhixia-w.png')
})
$('.back').mouseout(function(){
    $('.zhixiang').attr('src','/views/img/zhixia-h.png')
})
/*$('.back').on('click',function(ev){
    $('.quit').show()
    ev.stopPropagation();
})
$(document).on('click',function () {
    $('.quit').hide(200)
})*/
//点击出现二维码
$('.codeList1').hide()
$('.codeList2').on('click',function(ev){
    $('.codeList1').fadeIn()
    ev.stopPropagation();
})
$(document).on('click',function () {
    $('.codeList1').fadeOut()
})

// 点击返回顶部
//        var screenw = document.documentElement.clientWidth || document.body.clientWidth;
//        var screenh = document.documentElement.clientHeight || document.body.clientHeight;
//        $('.backR').css('left',screenw - $('.backR').offsetWidth +"px")
//        $('.backR').css('top',screenw - $('.backR').offsetHeight +"px")
//        window.onscroll = function(){
//            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
//            $('.backR').css('top',screenw - $('.backR').offsetHeight+scrolltop+"px")
//        }
    $('.backR').on('click',function(){
         $('body,html').animate({scrollTop:0},500);
    })
/*返回顶部hover*/
$('.backR').mouseover(function(){
    $(this).prev().show();
});
$('.backR').mouseout(function(){
    $(this).prev().hide();
});
/*出厂设置模块切换*/
$('.modular').eq(0).addClass('modular-bg')
$('.modular').eq(0).on('click',function(){
    $(this).addClass('modular-bg')
    $(this).next().removeClass('modular-bg')
    $('.modularContain').eq(0).show()
    $('.modularContain').eq(1).hide()
})
$('.modular').eq(1).on('click',function(){
    $(this).addClass('modular-bg')
    $(this).prev().removeClass('modular-bg')
    $('.modularContain').eq(1).show()
    $('.modularContain').eq(0).hide()
})
/*点击项目名称*/
var color1 =['rgba(9,145,235,.92)','rgba(9,197,235,.92)','rgba(245,219,118,.92)','rgba(160,103,235,.92)','rgba(160,103,235,.92)','rgba(9,145,235,.92)','rgba(9,197,235,.92)','rgba(245,219,118,.92)']
var color2 =['rgba(9,145,235,.67)','rgba(9,197,235,.67)','rgba(245,219,118,.67)','rgba(160,103,235,.67)','rgba(160,103,235,.67)','rgba(9,145,235,.67)','rgba(9,197,235,.67)','rgba(245,219,118,.67)']
var len3 = color1.length;
$('.factory').on('click',function(){
    $('.mapContion').show().siblings().hide();
    $('.backTop').show();
    $('body,html').animate({scrollTop:scHeight},500);
});

$(document).on('scroll',function(){
    if($(document).scrollTop()==0){
        $('.backTop').hide();
    }else{
        $('.backTop').show();
    }
})

//点击分布管理
//初始化地图
/*var map,lineTool,polygonTool,handler;
map = new T.Map('mapDiv', {
    attributionControl: false,
    inertia: false
});*/
$('.distribution').on('click',function(){
    $('body,html').animate({scrollTop:scHeight},500);
    $('.scatterWrap').show().siblings().hide();
    $('.backTop').show();
    /*/!*天地图调用*!/
    var zoom = 5;
    var data_info = [[106.840785, 28.212108,"桐梓县模组1"],
        [106.841911, 28.214462,"桐梓县模组2"],
        [106.841094, 28.213157,"桐梓县模组3"],
        [106.840927, 28.213243,"桐梓县模组4"],
        [114.370927, 30.608954,"武汉模组1"],
        [114.480927, 30.088954,"武汉模组2"],
        [116.810927, 40.688954,"北京模组1"],
        [117.000927, 40.568954,"北京模组2"],
    ];

    map.centerAndZoom(new T.LngLat(106.840785, 28.212108), zoom);
    var config = {
        showLabel: true

    };
    var arrayObj = new Array();
    for (var i = 0; i < data_info.length; i++) {
        var marker = new T.Marker(new T.LngLat(data_info[i][0],data_info[i][1]));  // 创建标注
        var content = data_info[i][2];
        arrayObj.push(marker);
        addClickHandler(content,marker);
    }
    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){
                openInfo(content,e)}
        );
    }
    function openInfo(content,e){
        var point = e.lnglat;
        marker = new T.Marker(point);// 创建标注
        var markerInfoWin = new T.InfoWindow(content,{offset:new T.Point(0,-30)}); // 创建信息窗口对象
        map.openInfoWindow(markerInfoWin,point); //开启信息窗口
    }

    var markers = new T.MarkerClusterer(map, {markers: arrayObj});
    markers.setGridSize(20);
    markers.setMaxZoom(16);
    //创建标注工具对象
    lineTool = new T.PolylineTool(map, config);
    polygonTool = new T.PolygonTool(map, config);
    //配置画笔
    handler = new T.PaintBrushTool(map, {
        keepdrawing: true,
        style: {
            weight: 3,
            color:'red',
            opacity:.8
        }
    });
    /!*天地图调用结束*!/
    $('.Line').on('click',function (){
            lineTool.open();
    });
    $('.Planimetry').on('click',function (){
            polygonTool.open();
    });
    $('.Brush').on('click',function (){
           handler.open();
    });
    $('.Trash').on('click',function (){
        handler.clear();
    });*/
    //模拟数据
    var data_info = [
        [106.840785, 28.212108,"桐梓县模组1"],
        [106.841911, 28.214462,"桐梓县模组2"],
        [106.841094, 28.215157,"桐梓县模组3"],
        [106.840927, 28.213243,"桐梓县模组4"],
        [114.370927, 30.608954,"武汉模组1"],
        [114.480927, 30.088954,"武汉模组2"],
        [116.810927, 40.688954,"北京模组1"],
        [117.000927, 40.668954,"北京模组2"],

    ];
    var map,zoom=5,lineTool,polygonTool;
    var markerClusterer,markerclick,marker;
    //初始化地图对象
    map = new TMap("mapDiv");
    //设置显示地图的中心点和级别
    map.centerAndZoom(new TLngLat(116.40969, 39.89945), zoom);
    //允许鼠标滚轮缩放地图
    map.enableHandleMouseScroll();
    var MAX = 5;


    var markers = [];
    var icon = new TIcon("/views/img/tagging.png",new TSize(20,25),{anchor:new TPixel(20,20)});
//				new TMarker(new TLngLat(v.longitude, v.latitude), {icon: icon});
    for(var i = 0; i < data_info.length; i++) {
        var lnglat = new TLngLat(data_info[i][0],data_info[i][1]);
        markers.push(new TMarker(lnglat, {icon: icon}));
        markers[i].indexI = i;
    }
    var config = {
        markers: markers,
    };
    markerClusterer = new TMarkerClusterer(map, config);


    //添加信息框
    for(var i=0;i<markers.length;i++){
        markers[i].setTitle(`模组信息:${data_info[markers[i].indexI][2]}`);
        markerclick = TEvent.addListener(markers[i],"click",function(p){
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    title: '模组信息',
                    content: data_info[_this.indexI][2],
                });
            });

        });
    }
    var config1 = {
        strokeColor:"blue", //折线颜色
        strokeWeight:"3px", //折线的宽度，以像素为单位
        strokeOpacity:0.5,  //折线的透明度，取值范围0 - 1
        strokeStyle:"solid" //折线的样式，solid或dashed
    };
    //创建测距工具对象
    lineTool = new TPolylineTool(map,config1);
    //注册测距工具绘制完成后的事件
    TEvent.addListener(lineTool,"draw",onDrawLine);
    //关闭测距工具
    function onDrawLine(bounds,line,obj){
        lineTool.close();
    }
    // 测距
    $('.Line ').on('click',function(){
        lineTool.open()
    })
    var config = {
        strokeColor:"blue", //折线颜色
        fillColor:"#FFFFFF",    //填充颜色。当参数为空时，折线覆盖物将没有填充效果
        strokeWeight:"3px", //折线的宽度，以像素为单位
        strokeOpacity:0.5,  //折线的透明度，取值范围0 - 1
        fillOpacity:0.5         //填充的透明度，取值范围0 - 1
    };
    //创建测面工具对象
    polygonTool = new TPolygonTool(map,config);
    //注册测面工具绘制完成后的事件
    TEvent.addListener(polygonTool,"draw",onDrawPolygon);
    //关闭测面工具
    function onDrawPolygon(bounds,line)
    {
        polygonTool.close();
    }
    //测面
    $('.Planimetry ').on('click',function(){
        polygonTool.open()
    })
})

$('.platformTab li').on('click',function () {
    for(var i = 0 ; i < len3; i++){
        $('.platformTab li').eq(i).css({
            'background':color2[i]
        })
    }
    $(this).css({
        'background':color1[$(this).index()]
    })
})
/*基本定位关联信息弹框*/
$('.address').on('click',function(){
    let Location =
    `<div class="location">
        <ul class="locationTab">
            <li>
                <span>物联SN号</span>
                <span>10811017C64DA4A1</span>
            </li>
            <li>
                <span>平台物联号</span>
                <span>1253468Bhjg154610bhjgugyugyug;......</span>
            </li>
            <li>
                <span>初始位置</span>
                <span>贵州省遵义市桐梓县</span>
            </li>
            <li>
                <span>备注</span>
                <span>备注相关信息</span>
            </li>
        </ul>
        <div class="closeBtm">
            <span class="close">关闭</span>
        </div>
    </div>
    `
    layui.use('layer', function(){
        var layer = layui.layer;
        var index = layer.open({
            type: 1
            ,title: ['基本定位关联信息', 'font-size:18px;background:#2c313d;color:#fff;text-align:center;']
            ,area:['1000px',"450px"]
            ,content: Location
        });
        $('.close').on('click',function(){
            layer.close(index)
        })
    })
})
/*分部管理更多详情*/
$('.view').on('click',function(){
    var text =$(this).parent().prev().prev().prev().prev().prev().prev().text()
    /*组合式模组主体*/
    let combinedData = `
    <div class="combinedWrap">
        <ul class="combinedTab">
                <li class="state">
                    <p class='clear'>
                        <span class='stateHead'>出厂配置</span>
                        <span class='stateColor'>工业水表</span>
                        <span>物联SN：10811017C64DA4AB</span>
                        <span>传感信号：双EV</span>
                        <span>物联电池：正常</span>
                        <span>强磁：有 </span>
                        <span>拆卸：有</span>
                    </p>
                    <p class='clear'>
                        <span class='stateHead'> 初始化</span>
                        <span>设备ID：1215684715794571848</span>
                        <span>初始脉冲：154614815</span>
                        <span>倍率(m³)/脉冲常数：0.001/1000</span>
                        <span>平台物联号：abc4******2547</span>
                    </p>
                    <p class='clear'>
                        <span class='stateHead'> 最新运行信息 </span>
                        <span>读数：123456789m³ </span>
                        <span>上送时间：2018-3-3 00:00:00</span>
                        <span>物联电池：正常</span>
                        <span>强磁：正常</span>
                        <span>拆卸：正常</span>
                    </p>
                </li>
             <li class="firstTime">首次上送时间：<span>2017-06-01 19:10:47</span></li>
             <li class="searchTime">
                 <span class="kssj">开始时间</span>
                 <input class="startTime" id="startTime" type="text" name="" id="" value="" placeholder="请选择开始时间"/>
                 <span class="jzsj">截止时间</span>
                 <input class="endTime" type="text" name="" id="endTime" value="" placeholder="请选择截止时间"/>
                 <span class="query">查询</span>
             </li>
        </ul>
        <div class="combinedData">
            <table class="tabList1" border="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>最新读数</th>
                        <th>实发条数</th>
                        <th>应发条数</th>
                        <th>成功率</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123456678m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr class="dataXs" style="display:none">
                    <td colspan="7" style="height:96px;" >暂无数据</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="closeBtm">
             <span class="close">关闭</span>
        </div>
        </div>
`
    /*一体式主体*/
    let combinedData1=`
    <div class="combinedWrap">
        <ul class="combinedTab">
            <li class="state">
                <p class='clear'>
                    <span class='stateHead'>出厂配置</span>
                    <span class='stateColor'>远传物联网端</span>
                    <span>物联SN：10811017C64DA4AB</span>
                    <span>传感信号：双EV</span>
                    <span>物联电池：正常</span>
                    <span>强磁：有 </span>
                    <span>拆卸：有</span>
                </p>
                <p class='clear'>
                    <span class='stateHead'> 初始化</span>
                    <span>设备ID：1215684715794571848</span>
                    <span>初始脉冲：154614815</span>
                    <span>倍率(m³)/脉冲常数：0.001/1000</span>
                    <span>平台物联号：abc4******2547</span>
                </p>
                <p class='clear'>
                    <span class='stateHead'> 最新运行信息 </span>
                    <span>读数：123456789m³ </span>
                    <span>上送时间：2018-3-3 00:00:00</span>
                    <span>物联电池：正常</span>
                    <span>强磁：正常</span>
                    <span>拆卸：正常</span>
                </p>
            </li>
            <li class="firstTime">首次上送时间：<span>2017-06-01 19:10:47</span></li>
            <li class="searchTime">
                <span class="kssj">开始时间</span>
                <input class="startTime" type="text" name="" id="" value="" placeholder="请选择开始时间"/>
                <span class="jzsj">截止时间</span>
                <input class="endTime" type="text" name="" id="" value="" placeholder="请选择截止时间"/>
                <span class="query">查询</span>
            </li>
        </ul>
        <div class="combinedData">
            <table class="tabList1" border="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>最新读数</th>
                        <th>实发条数</th>
                        <th>应发条数</th>
                        <th>成功率</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>123123465m³</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr class="dataXs" style="display:none">
                    <td colspan="7" style="height:96px;" >暂无数据</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="closeBtm">
            <span class="close">关闭</span>
        </div>
        </div>
`
    layui.use('layer', function(){
        var layer = layui.layer;
        if(text =="------"){
            var index = layer.open({
                type: 1
                ,title: ['通用组合式模组数据信息', 'font-size:18px;background:#2c313d;color:#fff;text-align:center;']
                ,area:['1100px',"670px"]
                ,content:  combinedData
                ,success: function(layero, index){
                    laydate.render({
                        elem: '.startTime',
                        type: 'datetime',
                        max: 0
                    });
                    laydate.render({
                        elem: '.endTime'
                        ,type: 'datetime'
                        ,max: 0
                    });
                }
            });
            /*点击操作*/
            $('.enter').on('click',function(){
                var sendData =`
                <div class="sendData">
                    <table class="sendTab" border="0" cellspacing="0" >
                        <tr>
                            <th>上送时间</th>
                            <th>间隔时间</th>
                            <th>传感数据</th>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                    </table>
                </div>
                <div class="closeBtm">
                    <span class="close">关闭</span>
                </div>
                `
                $('.enter').css('background-image','url(/views/img/enter-h.png)')
                $(this).css('background-image','url(/views/img/enter-b.png)')
                var index = layer.open({
                    type: 1
                    ,title: ['上送数据信息', 'font-size:18px;background:#2c313d;color:#fff;text-align:center;']
                    ,area:['1000px',"560px"]
                    ,content: sendData
                });
                $('.close').on('click',function(){
                    layer.close(index)
                })
            })
            $('.close').on('click',function(){
                layer.close(index)
            })
        }else{
            var index = layer.open({
                type: 1
                ,title: ['家用一体式模组数据信息', 'font-size:18px;background:#2c313d;color:#fff;text-align:center;']
                ,area:['1100px',"670px"]
                ,content: combinedData1
                ,success: function(layero, index){
                    laydate.render({
                        elem: '.startTime'
                        ,type: 'datetime'
                        ,max: 0
                    });
                    laydate.render({
                        elem: '.endTime'
                        ,type: 'datetime'
                        ,max: 0
                    });
                }
            });
            $('.enter').on('click',function(){
                var sendData =`
                <div class="sendData">
                    <table class="sendTab" border="0" cellspacing="0" >
                        <tr>
                            <th>上送时间</th>
                            <th>间隔时间</th>
                            <th>传感数据</th>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                        <tr>
                            <td>2017-06-01 19:10:47</td>
                            <td>-----</td>
                            <td>001a00000022c7330100970d960d950d930d940d930d0101051611002f</td>
                        </tr>
                </table>
                </div>
                <div class="closeBtm">
                    <span class="close">关闭</span>
                </div>
                `
                $('.enter').css('background-image','url(/views/img/enter-h.png)')
                $(this).css('background-image','url(/views/img/enter-b.png)')
                var index = layer.open({
                    type: 1
                    ,title: ['上送数据信息', 'font-size:18px;background:#2c313d;color:#fff;text-align:center;']
                    ,area:['1000px',"560px"]
                    ,content: sendData
                });
                $('.close').on('click',function(){
                    layer.close(index)
                })
            })
            $('.close').on('click',function(){
                layer.close(index)
            })
        }

    });
})
/********************************************************分页调取**************************/
layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;
    //调用分页
    //测试数据
    var data = [
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
        {'wlSN':'01561117c6ca0ebf6846','UseType':'基站工业用','working':'从机模式','radio':'470MHz','send':'------','power':'17dbm','network':'不带网络反馈','factory':'2017-12-6','software':'1.0','hardware':'1.0'},
    ];
    let tabData =`
        <tr>
            <td style="width:180px;">${data[0].wlSN}</td>
            <td style="width:117px;">${data[0].UseType}</td>
            <td style="width:107px;">${data[0].working}</td>
            <td style="width:107px;">${data[0].radio}</td>
            <td style="width:107px;">${data[0].send}</td>
            <td style="width:107px;">${data[0].power}</td>
            <td style="width:141px;">${data[0].network}</td>
            <td style="width:118px;">${data[0].factory}</td>
            <td style="width:108px;">${data[0].software}</td>
            <td style="width:108px;">${data[0].hardware}</td>
            <td style="width:100px;"></td>
        </tr>
				  	`
     let tabData1 =`
            <tr>
                <td style="width:180px;">${data[0].wlSN}</td>
                <td style="width:117px;">${data[0].UseType}</td>
                <td style="width:107px;">${data[0].working}</td>
                <td style="width:107px;">${data[0].radio}</td>
                <td style="width:107px;">${data[0].send}</td>
                <td style="width:107px;">${data[0].power}</td>
                <td style="width:141px;">${data[0].network}</td>
                <td style="width:118px;">${data[0].factory}</td>
                <td style="width:108px;">${data[0].software}</td>
                <td style="width:108px;">${data[0].hardware}</td>
                <td class='detail' style="width:100px;"></td>
            </tr>
				  	`
                /*通用组合式分页*/
				  laypage.render({
                      elem: 'pages'
                      ,count: data.length
                      ,theme:'#5ca3e6'
                      ,jump: function(obj){
                          //模拟渲染
                          document.getElementById('biuuu_city_list').innerHTML = function(){
                              var arr = []
                                  ,thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                              layui.each(thisData, function(index, item){
                                  arr.push(tabData);
                              });
                              return arr.join('');
                          }();
                      }
                  });
                /*家用一体式分页*/
                laypage.render({
                    elem: 'pages1'
                    ,count: data.length
                    ,theme:'#5ca3e6'
                    ,jump: function(obj){
                        //模拟渲染
                        document.getElementById('biuuu_city_list1').innerHTML = function(){
                            var arr = []
                                ,thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                            layui.each(thisData, function(index, item){
                                arr.push(tabData1);
                            });
                            return arr.join('');
                        }();
                        /*出厂设置点击详情弹框*/
                        $('.detail').on('click',function(){
                            let factoryData =`
                            <div _class="factoryData">
                                <div class="jyytsWrap">
                                     <table class="factoryTab" border="0" cellspacing="0" >
                                         <tr>
                                                <td>物联SN:10811017C64DA4AB</td>
                                                <td>传感信号：双EV</td>
                                                <td>物联电池：正常 </td>
                                         </tr>
                                         <tr>
                                                <td>强磁：有</td>
                                                <td>拆卸：有    </td>
                                                <td>倒流：空 </td>
                                         </tr>
                                         <tr>
                                                <td>传感器故障：空  </td>
                                                <td>阀门状态：空</td>
                                                <td>表号：0 </td>
                                         </tr>
                                         <tr>
                                                <td>设备ID：1215684715794571848  </td>
                                                <td>初始脉冲：154614815</td>
                                                <td>倍率（m³）/脉冲常数：0.001/1000</td>
                                         </tr>
                                </table>
                            </div>
                            <div class="closeBtm">
                                <span class="close">关闭</span>
                            </div>
                        </div>
        `
                            layui.use('layer', function(){
                                var layer = layui.layer;
                                var index=layer.open({
                                    type: 1,
                                    title: ['家用一体式模组出厂设置信息', 'font-size:18px;color:#fff;text-align:center;background:#5ca3e6'],
                                    area: ['720px', '300px'],
                                    content: factoryData
                                });
                                $('.close').on('click',function(){
                                    layer.close(index)
                                })
                            });
                        })
                    }
                });
});
$('.active1').addClass('active')
$('.active1').on('click',function(){
    $(this).addClass('active')
    $(this).next().removeClass('active')
})
$('.portrait').on('click',function(){
    $(this).addClass('active')
    $(this).prev().removeClass('active')
})
//产品文档模块

//点击物联网端模块
$('.productTab li').eq(0).css("background-color",'#128be8');
var len =$('.productTab li').length;
//点击一级菜单
$('.productTab li').on('click',function(){
    for(var i=0;i<len;i++){
        $('.productTab li').eq(i).css("background-color",'#2c313d')
        $(this).css("background-color",'#128be8')
    }
})
//点击第三方自定义总线系统
$('.productTab li').eq(1).on('click',function(event){
    $('.productTab1').slideDown();
    event.stopPropagation();
})
$('.productTab1').on('click',function(event){
    event.stopPropagation();
})
$(document).on('click',function(){
    $('.productTab1').slideUp()
    $('.productTab1 li').css("background-color",'#2c313d');
})
//点击二级菜单
var len1 =$('.productTab1 li').length;
$('.productTab1 li').on('click',function(){
    for(var i=0;i<len1;i++){
        $('.productTab1 li').eq(i).css("background-color",'#2c313d')
        $(this).css("background-color",'#128be8')
    }
})
//4大模块显示图片
var len2 =$('.father').length;
$('.father').on('click',function(){
    for(var i=0;i<len2;i++){
        var index = $(this).index('.father');
    }
   $('.blockmk').eq(index).show().siblings().hide();
})
//点击产品文档
$('.platformTab li').eq(6).on('click',function(){
    $('.productWrap').show().siblings().hide();
    $('body,html').animate({scrollTop:scHeight},500);
})
//点击账户资料
$('.quit li').eq(0).on('click',function(){
    $(this).css('color','#fff')
    var information =`
    <div>
        <ul class="informationTab">
            <li><span class="left">用户名</span><span class="right">酸菜一撇</span></li>
            <li><span class="left">公司联系人</span><span class="right">冰风谷</span></li>
            <li><span class="left">公司电话</span><span class="right">13129986283</span></li>
            <li><span class="left">公司名称</span><span class="right">武汉易维科技有限公司</span></li>
            <li>
                <span class="left name">地址信息</span>
                <div class="gf-select" id="province">
                    <span><em class="provinceId">请选择省份</em><i class="icon-jt"><input type="hidden" name="province" value=""></i></span>
                    <ul>
                         <li data-value="">请选择省份</li>
                    </ul>
                </div>
                <div class="gf-select" id="city">
                     <span><em class="cityId">请选择城市</em><i class="icon-jt"><input type="hidden" name="city" value=""></i></span>
                    <ul>
                        <li data-value="">请选择城市</li>
                    </ul>
                </div>
                <div class="gf-select" id="area">
                    <span><em class="countyId">请选择区县</em><i class="icon-jt"><input type="hidden" name="area" value=""></i></span>
                    <ul>
                         <li data-value="">请选择区县</li>
                    </ul>
                </div>
            </li>
            <li><span class="left"></span><span class="right">新华路鑫诚国际聚福苑3栋1204</span></li>
            <li><span class="left">厂家标识</span><span class="right">111111111111</span></li>
        </ul>
        <span class="close" style="margin-top:10px;">关闭</span>
      </div>
    `
    layui.use('layer', function(){
        var layer = layui.layer;
        var index=layer.open({
            type: 1,
            title: ['账户资料', 'font-size:18px;color:#fff;text-align:center;background:#2c313d'],
            area: ['1000px', '570px'],
            content: information
        });
        $('.close').on('click',function(){
            layer.close(index)
        })
        //选择城市
        $(function(){
            comSelect();
            selectCity();
        });
    });
})
//鼠标移入APP
var lenLi =$('.codeTab li').length
$('.codeTab li').mouseover(function(){
    for(var i=0;i<lenLi;i++){
        var indexW =$(this).index()
        $('.codePic').hide()
        $('.codePic').eq(indexW).show()
    }
})
$('.codeTab li').mouseout(function(){
    for(var i=0;i<lenLi;i++){
        var indexH =$(this).index()
        $('.codePic').hide()
        $('.codePic').eq(indexH).hide();
    }
})
//******************************************************************************************售后服务模块*************************************************************
//售后服务天地图调用
var map,zoom=5;
//初始化地图对象
map = new TMap("trackMap");
//设置显示地图的中心点和级别
map.centerAndZoom(new TLngLat(116.40969, 39.89945), zoom);
//允许鼠标滚轮缩放地图
map.enableHandleMouseScroll();
//模拟数据
var data_info1 = [
    [106.840785, 28.212108],
    [106.841911, 28.214462],
    [106.841094, 28.215157],
    [106.840927, 28.213243],
    [114.370927, 30.608954],
    [114.480927, 30.088954],
    [116.810927, 40.688954],
    [117.000927, 40.668954],

];
var markerClusterer1,markerclick1,marker1;
var markers = [];
var icon1 = new TIcon("/views/img/tagging.png",new TSize(20,25),{anchor:new TPixel(20,20)});
//				new TMarker(new TLngLat(v.longitude, v.latitude), {icon: icon});
for(var i = 0; i < data_info1.length; i++) {
    var lnglat1 = new TLngLat(data_info1[i][0],data_info1[i][1]);
    markers.push(new TMarker(lnglat1, {icon: icon1}));
    markers[i].indexI = i;
}
var config1 = {
    markers: markers,
};
markerClusterer1 = new TMarkerClusterer(map, config1);


//点击地图中的标识
for(var i=0;i<markers.length;i++){
    markerclick1 = TEvent.addListener(markers[i],"click",function(p){
        $('.trackList').show();
        var h = $(document).height()-$(window).height();
        $(document).scrollTop(h);
    });
}
//点击售后跟踪的详情
$('.trackMore').on('click',function(){
    var trackData =`
    <div class="trackMoreWrap">
    <table border="0" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th>产品形式</th>
                <th>原物联SN</th>
                <th>出厂时间</th>
                <th>新物联SN</th>
                <th>变更时间</th>
                <th>变更次数</th>
                <th>出厂设置信息</th>
            </tr>
        </thead>
            <tr>
                <td>远传表号接入</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>1</td>
                <td class="trackMore1"></td>
            </tr>
            <tr>
                <td>远传表号接入</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>2</td>
                <td class="trackMore1"></td>
            </tr>
            <tr>
                <td>远传表号接入</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>3</td>
                <td class="trackMore1"></td>
            </tr>
            <tr>
                <td>远传表号接入</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>4</td>
                <td class="trackMore1"></td>
            </tr>
            <tr>
                <td>远传表号接入</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>01561117c6ca0ebf6846</td>
                <td>2017-12-6</td>
                <td>5</td>
                <td class="trackMore1"></td>
            </tr>
        </table>
            <div class="trackData">
                <p class='trackDataP'>出产设置信息</p>
                <ul class="trackDatatab clear">
                    <li>物联SN：01561117c6ca0ebf6846</li>
                    <li>使用类型：基站工业用</li>
                    <li>工作模式：从机模式</li>
                    <li>无线频率：470MHz</li>
                    <li>发送频率：24小时</li>
                    <li>发送功率：------</li>
                    <li>网络交互：不带网络反馈</li>
                    <li>出厂时间：2018-3-3</li>
                    <li>软件版本号：1.0</li>
                    <li>硬件版本号：1.0</li>
                </ul>
                <ul class="trackDatatab1 clear">
                    <li>传感信号：双EV  </li>
                    <li>物联电池：正常 </li>
                    <li>强磁：有</li>
                    <li>拆卸：有</li>
                    <li>倒流：空 </li>
                    <li>传感器故障：空</li>
                    <li>阀门状态：空</li>
                    <li>表号：0</li>
                    <li>设备ID：1215684715794571848  </li>
                    <li>初始脉冲：154614815</li>
                    <li>倍率(m³)/脉冲常数：0.001/1000</li>
                </ul>
            </div>
            <span class='close'>关闭</span>
       </div>
    `
    layui.use('layer', function(){
        var layer = layui.layer;
       var index= layer.open({
            type: 1,
            title: ['变更历史数据信息', 'font-size:18px;color:#fff;text-align:center;background:#2c313d'],
            area: ['1100px', '680px'],
            content:trackData,
        });
        $('.close').on('click',function(){
            layer.close(index)
        })
        $('.trackMore1').on('click',function(){
            $('.trackMore1').css('background-image','url(/views/img/more1_h.png)')
            $(this).css('background-image','url(/views/img/more1.png)')
        })
    });
})
$('.platformTab li').eq(3).on('click',function(){
    $('.trackWrap').show().siblings().hide();
    $('body,html').animate({scrollTop:scHeight},500);
})
//点击年限选择
$('.trackR').on('click',function(){
    $(this).addClass('trackFirst').siblings().removeClass('trackFirst')
})
//点击通用模组和家用一体式模组
$('.trackCurr').addClass('track_bg');
$('.trackCurr').on('click',function(){
    $(this).addClass('track_bg');
    $(this).next().removeClass('track_bg');
    $('.hide').hide()
    $('.show').show()
})
$('.trackHouse').on('click',function(){
    $(this).addClass('track_bg');
    $(this).prev().removeClass('track_bg');
    $('.hide').show()
    $('.show').hide()
})