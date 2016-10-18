isindexget();
var cruxVariable=webStorage();
//开始
$(function(){
	cruxVariable.setItem("_currentPage","");
	onloadMessage();
});


function onloadMessage(){
	var _currentPage=cruxVariable.getItem("_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"currentPage":_currentPage,"isPreview":1};
	$.ajax({  
        url:dataLink+"info/getNowInfoList",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
        		 var list=eval(result.pageInfo);
    		     list=list.recordList;
    		     console.info(list.length);
    		     page(result);
    		     $("#load_message").html("");
            	 for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var html = '<ul class="zq_manage_teble clearfix">';
            		html+='<span style="display: none;" id="">'+item.activityId+'</span>';
            		html+='<li class="zq_manage_movear">'+(i+1)+'</li>';
            		html+='<li class="zq_manage_title" style="margin:0;">'+item.title+'</li>';
            		html+='<li class="zq_manage_times" >查看报名名单</li>';
            		html+='<li class="zq_manage_operate"><a class="zq_direct_get" href="javascript:showDirectView('+item.activityId+');">提前下线</a>&nbsp;&nbsp;<a class="zq_draft_get" href="javascript:showDraftView('+item.activityId+');">退回草稿箱</a></li>';
            		html+='</ul>';
            		$("#load_message").append(html);
            	 }
            	 getActivityInfoListCount();
            	 _go._apply();
            	 _go._details();
        	}
        },  
        timeout:3000  
	});  
};


//获取未审核个数
function getActivityInfoListCount(){
	var data={"currentPage":1,"isPreview":3};
	$.ajax({  
        url:dataLink+"info/getInfoListCount",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
				$("#activity_index_count").html("")
            	var count = result.activityCount;
            	if(count>0){
            		$("#activity_index_count").css("display","block")
            		$("#activity_index_count").append(count);
            	}else{
					$("#activity_index_count").css("display","none")
            	}
        	}
        },  
        timeout:3000  
	});  
}

var  _go={
	 _apply:function(){
		//跳转报名名单
		 $(".zq_manage_times").click(function(){
		 	var activityid=$(this).parent(".zq_manage_teble").find("span").html();
		 	cruxVariable.setItem("activityid",activityid);
		 	var String=$(".In_nav").html();
		 	cruxVariable.setItem("String",String);//储存路径
		 	cruxVariable.removeItem("StringBs");
		 	cruxVariable.setItem("index",1);
		 	window.location.href="list.html"
		 }) 
	 },
  	_details:function(){
  		//跳转活动详情不带审核
		  $(".zq_manage_title").click(function(){
		  	var activityid=$(this).parent(".zq_manage_teble").find("span").html();
		  	cruxVariable.setItem("activityid",activityid);
		  	var String=$(".In_nav").html();
		  	cruxVariable.setItem("String",String);//储存路径
		  	cruxVariable.removeItem("StringBs");
		  	cruxVariable.setItem("mocent",2);
		  	cruxVariable.setItem("index",1);
		  	window.location.href="activity.html"
		  })
  }
	
		
}



 //提交数据
function pageinationView(currentPage){
    // _load._data(currentPage);
	onloadMessage(currentPage)
}


//提前下线弹窗
function showDirectView(activityid){
//	var activityid=$(this).parent(".zq_manage_teble clearfix").find("span").html();
//	cruxVariable.setItem("activityid",activityid);
	$("#line_activity_id").val(activityid);
	$(".zq_shade").show();
	$(".zq_direct_centent").val("");
	$(".zq_currentmanage_direct").show();
}
//退回草稿箱
function showDraftView(activityid){
//	var activityid=$(this).parent(".zq_manage_teble").find("span").html();
//	cruxVariable.setItem("activityid",activityid);
	$("#draft_activity_id").val(activityid);
	$(".zq_shade").show();
	$(".zq_draft_centent").val("");
	$(".zq_currentmanage_draft").show();
}


//弹窗取消时
$(".zq_alert_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_direct_centent").val("");
	$(".zq_currentmanage_direct").hide();
})
$(".zq_draft_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_draft_centent").val("");
	$(".zq_currentmanage_draft").hide();
})

//提前下线
function OfflineInfo(){
	var activityId = $("#line_activity_id").val();
	var online = $("#online_centent").val();
	var onlinestr = Trim(online);
	if(online!=""&&onlinestr.length>3&&onlinestr.length<60){
		$("#text_error1").html("");
		var data={"isPreview":4,"activityId":activityId,"cause":onlinestr};
		$.ajax({  
            url:dataLink+"info/onlineInfo",  
            type: 'GET',
	        dataType: 'json',
	        data:data,
            success:function(result){
            	if(result.msg="success"){
	            	$(".zq_currentmanage_direct").hide();
	            	$(".zq_shade").hide();
	            	onloadMessage("");
            	}
            },  
            timeout:3000  
   		 });    
	}else{
		$("#text_error1").html("不符合字数要求，请重新输入");
		setTimeout("hide_view('text_error1')",3000);
	}
}

//退回草稿箱
function infoDraft(){
	var activityId = $("#draft_activity_id").val();
	var draft = $("#draft_centent").val();
	var draftstr = Trim(draft);
	var pageNum = "";
	var numPerPage = "";
	if(draft!=""&&draftstr.length>3&&draftstr.length<60){
		$("#text_error2").html("");
		var data={"pageNum":pageNum,"numPerPage":numPerPage,"isPreview":6,"activityId":activityId,"cause":draftstr};
		$.ajax({  
	        url:dataLink+"info/onlineInfo",  
	        type: 'GET',
	        dataType: 'json',
	        data:data,
	        success:function(result){
	        	if(result.msg="success"){
	        		$(".zq_currentmanage_draft").hide();
	            	$(".zq_shade").hide();
	            	onloadMessage("");
	        	}
	        },  
	        timeout:3000  
		});  
	}else{
		$("#text_error2").html("不符合字数要求，请重新输入");
		setTimeout("hide_view('text_error2')",3000);
	}
}
function hide_view(id){
	$("#"+id).html("");
}
//查看活动详情
function showInfoDetails(activityId){
	window.location.href="activity.html?activityId="+activityId;
}
//查看报名名单
function showInfoList(activityId){
	window.location.href="list.html?activityId="+activityId;
}

function Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}




  //提交数据
function pageinationView(currentPage){
	 cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
	    onloadMessage();
}

var _pageinationView={
_currentPage:function(){
$(".currentPage").click(function(){
	 cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
	 onloadMessage();
});
},
//跳转到某页
_go:function(pageCount){
$("#zq_paging_numbget").click(function(){
  var _temp=$("#zq_paging_numberget").val();
   if (_temp.replace(/\D/g,'')=="") {
      $("#zq_paging_numberget").val("");
      return;
   }
    var re = /^[1-9]+[0-9]*]*$/;
    if (!re.test(_temp)){
         $("#zq_paging_numberget").val("");
      return;
      }
    if(_temp>pageCount){
      $("#zq_paging_numberget").val("");
      $("#indexpage").html("");
      return;
    } 
    cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
    onloadMessage();
});
}
}
