var dataLink="http://test.eyouxin.net/activity-manage/";
var imageHeadSrc="http://test.eyouxin.net/activity/resources/img-upload/";
//var dataLink="http://192.168.1.160:8020/qixinmax/manage/"
 	var  cruxVariable=sessionStorage;
function webStorage(){//是否保存登录信息
	return cruxVariable;
	
};
//返回按键
function backget(){
	$(".zq_back").click(function(){
		window.history.back();
	});
}
//页面侧边栏更改

function managementGet(index){
	if(index==1){
		$(".zq_management_activity ").addClass("zq_management_Get");
	}else if(index==2){
		$(".zq_management_user ").addClass("zq_management_Get");
	}else if(index==3){
		$(".zq_management_money ").addClass("zq_management_Get");
	}
}

//管理跳转
function isindexget(){
	backget()
	$(".zq_navtab_isone").click(function(){
		window.location.href="index.html"
	});
	$(".zq_navtab_istow").click(function(){
		window.location.href="currentmanage.html"
	});
	$(".zq_navtab_isshw").click(function(){
		window.location.href="hadover.html"
	});
	$(".zq_list_get").click(function(){
		window.location.href="list.html"
	});
	$(".zq_user").click(function(){
		window.location.href="uesr.html"
	});
	$(".zq_moneymanage_get").click(function(){
		window.location.href="moneymanage.html"
	});
	
	$(".zq_luredetail").click(function(){
		window.location.href="lucredetail.html"
	});
	
	$(".zq_financialaudit_get").click(function(){
		window.location.href="financialaudit.html"
	});
	$(".zq_userdetails").click(function(){
		window.location.href="userdetails.html"
	});
	$(".zq_incomelist").click(function(){
		window.location.href="incomelist.html"
	});
	$(".zq_economyfit_isget").click(function(){
		window.location.href="economyfit.html"
	});
	$(".zq_withdrawals_get").click(function(){
		window.location.href="withdrawals.html"
	});
	$(".zq_statements_get").click(function(){
		window.location.href="oentstatements.html"
	});
	$(".zq_examine_get").click(function(){
		window.location.href="examine.html"
	});
	$(".zq_overstatements_get").click(function(){
		window.location.href="overstatements.html"
	});
	$(".zq_moner_Getone").click(function(){
		window.location.href="oentstatements.html"
	});
	$(".zq_moner_Gettow").click(function(){
		window.location.href="overstatements.html"
	});
	$(".zq_moner_Getshw").click(function(){
		window.location.href="withdrawals.html"
	});
}
//头部点击及跳转
function headerget(){
	$(".zq_index_mode").click(function(){
		window.location.href="index.html"
	})
	var cruxVariable=webStorage();
	var userId=cruxVariable.getItem("manage_user_id");
	if(userId==null||userId=="null"||userId==""||userId==undefined||userId=="undefined"){
		window.location.href="entry.html"
	}
	var nice=cruxVariable.getItem("magae_nice_name");
	if(nice!==null&&nice!=="null"&&nice!==""&&nice!==undefined&&nice!=="undefined"){
		$(".In_name").html(nice)
	}
	$(".In_next").click(function(){
		cruxVariable.clear();
		window.location.href="entry.html"
	})
}
//页面加载等其他通用方法
//勿动！！！！
function indexall(){
	//下列代码勿动！！！
	var widthThis=$(window).width();
	var heightThis=$(window).height();
	$("body").css({"width":widthThis+"px","height":heightThis+"px"});
	$(".In_nav").css({"width":(widthThis-170)+"px"});
	$(".zq_centent_statements").css({"width":(widthThis-170)+"px","height":heightThis-146+"px"});
	var heightIsmou=$(".zq_centent_statements").height()-$(".zq_index_navtab").height()-$(".zq_paging").height();
	$(".zq_statements_centent").css({"min-height":heightIsmou+"px"})
	$(".zq_shade").css({"height":heightThis+"px","width":widthThis+"px"})
	ajax("header.html",function(str){
			var sA=str.indexOf("body>")
			var sB=str.indexOf("</body")
		   	var scr=str.substring((sA+5),sB)
			$('#zq_header').html(scr);
			headerget()//此为判断是否登陆
		},function(scr){
			
		});
		ajax("navleft.html",function(str){
			var sA=str.indexOf("body>")
			var sB=str.indexOf("</body")
		    var scr=str.substring((sA+5),sB)
			$('#zq_nav_left').html(scr);
			$(".zq_management_money").addClass("zq_management_Get");
			navleftget()
		},function(scr){
			
		});
}
//侧边栏跳转
function navleftget(){
	var cruxVariable=webStorage();
	var _isAdmin=cruxVariable.getItem("isAdmin");
		if(_isAdmin==2){
			$(".zq_management_fit").css("display","none");
			$(".zq_management_activity").css("display","none");
			$(".zq_management_user").css("display","none");
		 } else if(_isAdmin==0){
  			$(".zq_management_money").css("display","none");
  
 		}
	if(_isAdmin==1){
		$(".zq_management_fit").css("display","block");
	 }
	$(".zq_nav_left ul li").hover(function(){
		$(".zq_ingdex_detas").each(function(){
			$(this).hide();
		});
		$(this).find(".zq_ingdex_detas").show();
	},function(){
		$(".zq_ingdex_detas").each(function(){
			$(this).hide();
		});
		$(".zq_management_Get").find(".zq_ingdex_detas").show();
	})
	$(".zq_centent").show();
	$(".In_nav").show();
	$(".zq_nav_left").css({"min-height":($(window).height()-90)+"px"});
	$(".zq_management_activity").click(function(){
		window.location.href="index.html"
	});
	$(".zq_management_user").click(function(){
		window.location.href="uesr.html"
	});
	//金额管理
	$(".zq_management_money").click(function(){
		window.location.href="oentstatements.html"
//		window.location.href="moneymanage.html"
	});
	$(".zq_management_fit").click(function(){
		window.location.href="economyfit.html"
	});
	
}
//转换long格式
//扩展Date的format方法 
Date.prototype.format = function (format) { 
var o = { 
"M+": this.getMonth() + 1, 
"d+": this.getDate(), 
"h+": this.getHours(), 
"m+": this.getMinutes(), 
"s+": this.getSeconds(), 
"q+": Math.floor((this.getMonth() + 3) / 3), 
"S": this.getMilliseconds() 
} 
if (/(y+)/.test(format)) { 
format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
} 
for (var k in o) { 
if (new RegExp("(" + k + ")").test(format)) { 
format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); 
} 
} 
return format; 
} 


/** 
*转换long值为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 
function getFormatDateByLong(l, pattern) { 
return getFormatDate(new Date(l), pattern); 
} 
/** 
*转换日期对象为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 
function getFormatDate(date, pattern) { 
if (date == undefined) { 
date = new Date(); 
} 
if (pattern == undefined) { 
pattern = "yyyy-MM-dd hh:mm:ss"; 
} 
return date.format(pattern); 
} 
function ThisTime(isShowTimeDetail,Time){
		if (isShowTimeDetail==1) {
			return(getFormatDateByLong(Time, "yyyy-MM-dd hh:mm"))
		}else{
			return(getFormatDateByLong(Time, "yyyy-MM-dd hh:mm"))
		};
	}

//调用内容
function ajax(url,fnSucc,fnFaild){
		if(window.XMLHttpRequest){
			var oAjax= new XMLHttpRequest();
		}else{
			var oAjax= new ActiveXObject("Microsoft.XMLHTP");
		};
		oAjax.open("GET",url,true);
		oAjax.send(null);
		oAjax.onreadystatechange=function(){
			if(oAjax.readyState==4){
				if(oAjax.status==200){
					fnSucc(oAjax.responseText);
				}else{
					fnFaild(oAjax.status);
				}
			}
		};
	}
//活动详情
function showConet(star){
	var stara=star.replace('{"[QIXIN_ZHI_HUI]":"',"");
	var starc=stara.replace('[/QIXIN_ZHI_HUI]"}',"");
	return starc;
}
//图片头像等
function isallimg(iskeiaimg,thisimg){
	var headUrl =iskeiaimg;
		if(thisimg==null || thisimg=="" || thisimg==undefined){
				if(iskeiaimg.indexOf("http://")>=0){
					headUrl =iskeiaimg;
				}else{
					headUrl =imageHeadSrc+iskeiaimg;
				};
		}else if(thisimg!=null && thisimg!="" && thisimg!=undefined){
			if(thisimg.indexOf("http://")>=0){
				headUrl =thisimg;
			}else{
				headUrl =imageHeadSrc+thisimg;
			};
		}
	return headUrl;
}
