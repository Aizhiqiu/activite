
//mocent=1;带审核
//mocent=2;不带审核

var cruxVariable=webStorage();
var Strin=cruxVariable.getItem("String");
var mocent=cruxVariable.getItem("mocent");
var index=cruxVariable.getItem("index");
	managementGet(index);
if(mocent==1){
	$(".In_button").show();
}

var StringB='&nbsp; > &nbsp;<span class="zq_activity_Get">活动详情</span><a class="zq_back" href="javascript:;">返回</a>';
var strign=Strin+StringB
$(".In_nav").html("");
$(".In_nav").html(strign);

isindexget();

var activityId = cruxVariable.getItem("activityid");
//开始
$(function(){
	var url=window.location.href;//获取地址栏 url 
	var index=url.indexOf('&');//获取#的位置 
	var paramVal=url.substr(index,url.length);//获取 # 后面所有字符串 
	var state = paramVal.replace("&state=","")
	if(state=="show"){
		$(".In_button").show();
	}
	onloadMessage(activityId);
	//通过审核
	$(".In_button_ok").click(function(){
		if(activityId!=""){
			var data={"isPreview":1,"activityId":activityId,"cause":"通过"};
			$.ajax({  
	            url:dataLink+"info/passInfo",  
	            type: 'GET',
		        dataType: 'json',
		        data:data,
	            success:function(result){
	            	if(result.msg="success"){
	            		window.location.href="index.html";
	            	}
	            },  
	            timeout:3000  
	   		 });   
		}
	})
	//未通过审核
	$(".Ec_add").click(function(){
		var cause = $("#not_cross").val();
		var causeStr = Trim(cause);
		if(cause!=""&&causeStr.length>3&&causeStr.length<60){
			$("#text_error").html("");
			var data={"isPreview":0,"activityId":activityId,"cause":cause};
			$.ajax({  
	            url:dataLink+"info/passInfo",  
	            type: 'GET',
		        dataType: 'json',
		        data:data,
	            success:function(result){
	            	if(result.msg="success"){
	            		$(".Ec_bg").hide();
	            		window.location.href="index.html";
	            	}
	            },  
	            timeout:3000  
	   		 });   
		}else{
			$("#text_error").html("不符合字数要求，请重新输入");
			setTimeout("hide_view()",3000);
		}
	})
	
});

function hide_view(){
	$("#text_error").html("");
}

function Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
function onloadMessage(activityId){
	var data={"activityId":activityId};
    $.ajax({  
    	type : "get",
        url:dataLink+"show/InfoDetalis",  
        dataType:'json',  
        data:data,
        success:function(result){
            var  activity=result.activity;
            activity=eval(activity);
            //标题
            $("#activity_title").html(activity.title);
            //开始时间
            $("#activity_starTime").html(ThisTime(activity.isShowTimeDetail,activity.startTime));
            //结束时间
            $("#activity_endTime").html(ThisTime(activity.isShowTimeDetail,activity.endTime));
            //报名截止时间
            $("#activity_lastTime").html(getFormatDateByLong(activity.closedTime,"yyyy-MM-dd hh:mm"));
            //活动地址
            $("#activity_addr").html(activity.provinceCity+activity.district+activity.addr);
            //活动内容
            var string=showConet(activity.content);
            $("#activity_img").attr("src",activity.activityLogo);
            //string=activity.content.replace(/span/gm,'div');
            $(".In_basic_text").html(string);
            
            var itemList = result.pay_item;
            for(var i=0;i<itemList.length;i++){
            	var feeitem = itemList[i];
            	var html = '<ul>';
            	html+='<li class="In_money_one">'+(1+i)+'</li>';
            	html+='<li class="In_money_two">'+feeitem.typeName+'</li>';
            	html+='<li class="In_money_three"><span>'+feeitem.fee+'</span>元</li>';
            	html+='<li class="In_money_three"><span>'+feeitem.maxCount+'</span>人</li>';
            	
            	var itemFeeList = feeitem.stages;
            	var fee_type_name = "<span>";
            	if(feeitem.isFee>1){
            		html+='<li class="In_money_three">分期</li>';
            		for(var j=0;j<itemFeeList.length;j++){
                		var itemFeeItem = itemFeeList[j];
                		if(j==0){
                			fee_type_name+="<p>第一期<span>&nbsp"+itemFeeItem.stagesFee+"&nbsp</span>元</p>"
                		}else if(j==1){
                			fee_type_name+="<p>第二期<span>&nbsp"+itemFeeItem.stagesFee+"&nbsp</span>元</p>"
                		}else if(j==2){
                			fee_type_name+="<p>第三期<span>&nbsp"+itemFeeItem.stagesFee+"&nbsp</span>元</p>"
                		}
                	}
            	}else{
            		html+='<li class="In_money_three">全款</li>';
            		fee_type_name+="<p><span>&nbsp"+feeitem.fee+"&nbsp</span>元</p>";
            	}
            	fee_type_name+="</span>";
            	if(itemFeeList.length==1||feeitem.isFee<=1){
            		html+='<li class="In_money_four_one">'+fee_type_name+'</li>';
            	}else if(itemFeeList.length==2){
            		html+='<li class="In_money_four_two">'+fee_type_name+'</li>';
            	}else{
            		html+='<li class="In_money_four">'+fee_type_name+'</li>';
            	}
            	
            	html+='</ul>';
            	$("#activity_Money").append(html);
            }
            var applyList = result.apply_list;
            for(var i=0;i<applyList.length;i++){
            	var applyitem = applyList[i];
            	if(applyitem.isShow==1){
            		var html = "";
	            	if(applyitem.isRequired==1){
		            	html = '<li>'+applyitem.name+'：&nbsp;<span>（必填）</span></li>';
	            	}else{
	            		html = '<li>'+applyitem.name+'：&nbsp;<span>（非必填）</span></li>';
	            	}
	            	$(".In_message").append(html);
	            };
            }
            //组织者
            $("#activity_organizerRatio").html(result.RevenueRatio.organizerRatio*100+"%");
            //授课者
            $("#activity_lectureRatio").html(result.RevenueRatio.lectureRatio*100+"%");
            //分享者
            $("#activity_shareRatio").html(result.RevenueRatio.shareRatio*100+"%");
            //主讲人
            $("#activity_promulgator").append(result.promulgator);
            //授课者
            $("#activity_organizer").append(result.organizer);
        },  
        timeout:3000  
    }); 
};