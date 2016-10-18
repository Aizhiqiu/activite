isindexget();
var cruxVariable=webStorage();
//mocent=1;带审核
//mocent=2;不带审核
//跳转前页
//index=1;活动管里
//index=2;用户管理
//index=3;金额管理
//审核跳转活动详情带审核
$(function(){
	cruxVariable.setItem("_currentPage","");
	onloadMessage();
});

function onloadMessage(){
	var _currentPage=cruxVariable.getItem("_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"currentPage":_currentPage,"isPreview":3};
	$.ajax({  
        url:dataLink+"info/getInfoList",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
            	 var list=eval(result.pageInfo);
    		     list=list.recordList;
    		     	page(result);
    		     	$(".relust").html("");
            	for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var html = '<ul class="zq_manage_teble clearfix">';
            		html+='<span style="display: none;">'+item.activityId+'</span>';
            		html+='<li class="zq_manage_movear">'+(i+1)+'</li>';
            		html+='<li class="zq_manage_title zq_manage_stateone">'+item.title+'</li>';
            		html+='<li class="zq_manage_time">'+getFormatDateByLong(item.createTime,"yyyy-MM-dd hh:mm")+'</li>';
            		html+='<li class="zq_manage_state zq_manage_stateone">未审核</li>';
            		html+='</ul>';     
            		$(".relust").append(html);
            	}
            	getActivityInfoListCount();
            	_go._details_one();
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
		_details:function(){
		 //跳转活动详情带审核
		 $(".zq_manage_state").click(function(){
			    var activityid=$(this).parent(".zq_manage_teble").find("span").html();
				cruxVariable.setItem("activityid",activityid);
				var index=1;
				cruxVariable.setItem("index",index);
				var String=$(".In_nav").html();
				cruxVariable.setItem("String",String);//储存路径
				cruxVariable.removeItem("StringBs");
				cruxVariable.setItem("mocent",1);
				cruxVariable.setItem("index",1);
				window.location.href="activity.html"
		 }) 
	   },
	   _details_one:function(){ 
	  	  //跳转活动详情不带审核
		  $(".zq_manage_title").click(function(){
			    var activityid=$(this).parent(".zq_manage_teble").find("span").html();
				cruxVariable.setItem("activityid",activityid);
				var String=$(".In_nav").html();
				cruxVariable.setItem("String",String);//储存路径
				cruxVariable.removeItem("StringBs");
				var index=1;
				cruxVariable.setItem("index",index);
				cruxVariable.setItem("mocent",2)
				window.location.href="activity.html"
		  })
	  }
}


//跳转活动详情带审核
$(".zq_manage_stateone").click(function(){
	var activityid=$(this).parent(".zq_manage_teble").find("span").html();
	cruxVariable.setItem("activityid",activityid);
	var String=$(".In_nav").html();
	cruxVariable.setItem("String",String);//储存路径
	cruxVariable.removeItem("StringBs");
	var index=1;
	cruxVariable.setItem("index",index);
	cruxVariable.setItem("mocent",1)
	window.location.href="activity.html"
})
//跳转活动详情不带审核
$(".zq_manage_title").click(function(){
	var activityid=$(this).parent(".zq_manage_teble").find("span").html();
	cruxVariable.setItem("activityid",activityid);
	var index=1;
	cruxVariable.setItem("index",index);
	var String=$(".In_nav").html();
	cruxVariable.setItem("String",String);//储存路径
	cruxVariable.removeItem("StringBs");
	
	cruxVariable.setItem("mocent",2)
	window.location.href="activity.html"
})



 //提交数据
function pageinationView(currentPage){
	cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
	onloadMessage()
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
    	cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
    	onloadMessage()
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
        onloadMessage()
    });
  }
}



