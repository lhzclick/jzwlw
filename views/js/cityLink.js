//1
function comSelect(){
	$(document).on("click",".gf-select > span",function(){
		$(this).closest(".gf-select").css("z-index",100);
		$(".gf-select ul").hide();
		if($(this).next("ul").children().length>4){
			$(this).next("ul").css({"height":154,"overflow":"auto"});
		}else{
			$(this).next("ul").css({"height":"auto"});
		}
		$(this).next("ul").show();
	});
	$(document).on("click",".gf-select > span > i",function(){
		var parent = $(this).closest("span").next("ul");
		parent.hide();
		return false;
	});			
	$(document).on("click",".gf-select ul li",function(){
		var parent = $(this).closest("ul");
		var select = $(this).closest(".gf-select");
		var value = $(this).attr("data-value");
		var text = $(this).text();
		if($(this).closest(".gf-select").hasClass("noclick")){
			parent.hide();
			return false;
		}				
		select.css("z-index",1);
		select.find("em").html(text);
		select.find("input[type='hidden']").val(value!=0?value:"");
		parent.hide();
	});
	$(document).on("click",function(e){
		if($(e.target).closest(".gf-select").length == 0){
			$(".gf-select").css("z-index",1);
			$(".gf-select ul").hide();
		}
	});
}
function selectCity(options){
	var config = {
		domSelect : ["#province","#city","#area"],
		domInit : ["请选择省份","请选择城市","请选择区县"]
	}
	var opts = $.extend(config,options);
	var $jsondata = {};
	var provinceItemEvent = function(){
		var json = $jsondata;
		var item = ['<li>'+opts.domInit[1]+'</li>'];
		var name = $(this).attr("name");
		if(name && name != ""){
			var data = json["city"][name];

			for(var i=0;i<data.length;i++){
				item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
			}
			$(opts.domSelect[1]).find("ul").html(item.join("\n"));
		}else{
			$(opts.domSelect[1]).find("ul").html(item.join("\n"));
		}
		$(opts.domSelect[1]).find("ul li:first").trigger("click");
	}
	var cityItemEvent = function(){
		var json = $jsondata;
		var item = ['<li>'+opts.domInit[2]+'</li>'];
		var name = $(this).attr("name");
		if(name && name != ""){
			var data = json["district"][name];
			for(var i=0;i<data.length;i++){
				item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
			}
			$(opts.domSelect[2]).find("ul").html(item.join("\n"));				
		}else{
			$(opts.domSelect[2]).find("ul").html(item.join("\n"));							
		}
		$(opts.domSelect[2]).find("ul li:first").trigger("click");
	}
	var initSelectEvent = function(json){
		var item = ['<li>'+opts.domInit[0]+'</li>'];
		var data = json["province"];
		var initProvinVal = $(opts.domSelect[0]).find("input").val();
		var initCityVal = $(opts.domSelect[1]).find("input").val();
		var initAreaVal = $(opts.domSelect[2]).find("input").val();
		
		for(var i=0;i<data.length;i++){
			item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
		}
		$(opts.domSelect[0]).find("ul").html(item.join("\n"));
		$jsondata = json;
		
		if(initProvinVal!=""){
			$(opts.domSelect[0]).find("ul li[data-value='"+initProvinVal+"']").click();
		}

		if(initCityVal!=""){
			$(opts.domSelect[1]).find("ul li[data-value='"+initCityVal+"']").click();
		}

		if(initAreaVal!=""){
			$(opts.domSelect[2]).find("ul li[data-value='"+initAreaVal+"']").click();
		}
	}
	var ajaxConfig = {
		url : "/views/js/allcity.js",
		dataType : "jsonp",
		jsonpCallback : "callback",
		success : initSelectEvent				
	}
	$.ajax(ajaxConfig);
	$(document).on("click",opts.domSelect[0]+" li",provinceItemEvent);
	$(document).on("click",opts.domSelect[1]+" li",cityItemEvent);			
}