isindexget();
var cruxVariable=webStorage();
//mocent=1;带审核
//mocent=2;不带审核


//开始
$(function(){
	onloadMessage();
	cruxVariable.setItem("_currentPage","");
});
 	
function onloadMessage(){
	var _currentPage=cruxVariable.getItem("_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"currentPage":_currentPage};
	$.ajax({  
        url:dataLink+"info/getEndInfoList",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
			
        	if(result.msg="success"){
        		 var list=eval(result.pageInfo);
    		     list=list.recordList;
    		     page(result);
    		     $("#load_message").html("");
            	for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var isPreview = item.isPreview;
            		var html ='<ul class="zq_over_teble clearfix">';
            		html+='<span style="display:none;">'+item.activityId+'</span>';
            		html+='<li class="zq_manage_movear">'+(i+1)+'</li>';
            		html+='<li class="zq_manage_title">'+item.title+'</li>';
            		html+='<li class="zq_manage_times"><a href="javascript:;">查看报名名单</a></li>';
            		if(isPreview ==5){
            			html+='<li class="zq_mannav_yes">是</li>';
            		}else{
            			html+='<li class="zq_mannav_yes">否</li>';
            		}
            		
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
	 	var activityid=$(this).parent(".zq_over_teble").find("span").html();
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
	  	var activityid=$(this).parent(".zq_over_teble").find("span").html();
	  	cruxVariable.setItem("activityid",activityid);
	  	var String=$(".In_nav").html();
	  	cruxVariable.setItem("String",String);//储存路径
	  	cruxVariable.removeItem("StringBs");
	  	cruxVariable.setItem("index",1)
	  	cruxVariable.setItem("mocent",2)
	  	window.location.href="activity.html"
	  })
  }
			
}




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


