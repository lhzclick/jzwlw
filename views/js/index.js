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
//获取一屏的高度
var scHeight = $(document).height()
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
$('.back').on('click',function(ev){
    $('.quit').show()
    ev.stopPropagation();
})
$(document).on('click',function () {
    $('.quit').hide(200)
})
//点击出现二维码
$('.codeList1').hide()
$('.codeList2').on('click',function(ev){
    $('.codeList1').show(200)
    ev.stopPropagation();
})
$(document).on('click',function () {
    $('.codeList1').hide(200)
})

//点击返回顶部
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
/*出厂设置模块切换*/
$('.modular').eq(0).addClass('modular-bg')
$('.modular').eq(0).on('click',function(){
    $(this).addClass('modular-bg')
    $(this).next().removeClass('modular-bg')
    $('.dataTab').eq(0).show()
    $('.dataTab').eq(1).hide()
})
$('.modular').eq(1).on('click',function(){
    $(this).addClass('modular-bg')
    $(this).prev().removeClass('modular-bg')
    $('.dataTab').eq(1).show()
    $('.dataTab').eq(0).hide()
})
/*出厂设置点击详情弹框*/
$('.detail').on('click',function(){
    let factoryData =`
    <div _class="factoryData">
            <div class="jyytsWrap">
            <table class="factoryTab" border="0" cellspacing="0" >
                <tr>
                    <td>物联SN:10811017C64DA4AB</td>
                    <td>模拟信号：双EV</td>
                    <td>电源状态：正常 </td>
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
                    <td>ID：1215684715794571848  </td>
                    <td>脉冲值：154614815</td>
                    <td>倍率（m³）：0.001</td>
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
/*点击出厂设置*/
var color1 =['rgba(9,145,235,.92)','rgba(9,197,235,.92)']
var color2 =['rgba(9,145,235,.67)','rgba(9,197,235,.67)']
var len = color1.length;
$('.factory').on('click',function(){
    $('.mapContion').show();
    $('.backTop').show();
    $('.scatterWrap').hide();
    $('body,html').animate({scrollTop:scHeight},500);
})

//点击分布管理
$('.distribution').on('click',function(){
    $('body,html').animate({scrollTop:scHeight},500);
    $('.mapContion').hide();
    $('.scatterWrap').show();
    $('.backTop').show();
    /*天地图调用*/
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
    var map;
    map = new T.Map('mapDiv', {
        attributionControl: false,
        inertia: false
    });
    map.centerAndZoom(new T.LngLat(106.840785, 28.212108), zoom);

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
    /*天地图调用结束*/
})

$('.platformTab li').on('click',function () {
    for(var i = 0 ; i < len; i++){
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
/*更多详情*/
$('.view').on('click',function(){
    var text =$(this).parent().prev().prev().prev().prev().prev().prev().text()
    /*组合式模组主体*/
    let combinedData = `
    <div class="combinedWrap">
        <ul class="combinedTab">
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
                <tr>
                    <th>时间</th>
                    <th>发送频率</th>
                    <th>发送功率</th>
                    <th>网络互交</th>
                    <th>实发条数</th>
                    <th>应发条数</th>
                    <th>成功率</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr class="dataXs" style="display:none">
                    <td colspan="7" style="height:96px;" >暂无数据</td>
                </tr>
            </table>
        </div>
        <div class="colseBtm">
             <span class="close">关闭</span>
        </div>
        </div>
`
    /*一体式主体*/
    let combinedData1=`
    <div class="combinedWrap">
        <ul class="combinedTab">
            <li class="state">
                <span>物联SN：10811017C64DA4AB</span>
                <span>模拟信号：双EV</span>
                <span>电源状态：正常 </span>
                <span>强磁：有</span>
                <span>拆卸：有</span>
                <span>倒流：空</span>
                <span>传感器故障：空  </span>
                <span>阀门状态：空</span>
                <span>表号：0</span>
                <span>ID：1215684715794571848</span>
                <span>脉冲值：154614815</span>
                <span>倍率（m³）：0.001</span>
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
                <tr>
                    <th>时间</th>
                    <th>发送频率</th>
                    <th>发送功率</th>
                    <th>网络互交</th>
                    <th>实发条数</th>
                    <th>应发条数</th>
                    <th>成功率</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr>
                    <td>2017-06-01</td>
                    <td>-----</td>
                    <td>17dbm</td>
                    <td>不带网络反馈</td>
                    <td>256</td>
                    <td>256</td>
                    <td>100%</td>
                    <td class="enter"></td>
                </tr>
                <tr class="dataXs" style="display:none">
                    <td colspan="7" style="height:96px;" >暂无数据</td>
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
                ,area:['1100px',"780px"]
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


