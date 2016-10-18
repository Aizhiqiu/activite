indexall();
isindexget();
var cruxVariable=webStorage();
//mocent=1;带审核
//mocent=2;不带审核
//跳转前页
//index=1;活动管里
//index=2;用户管理
//index=3;金额管理

 	$(function(){
 		Settled();
		getNotSettledListCount();
		getTiXianCount();
		});
		function Settled(){
			var _currentPage=cruxVariable.getItem("_currentPage_s");
			 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"currentPage":_currentPage};
			$.ajax({
			      url:dataLink+"Settled/getSettledList", 
			      type: 'GET',
			      dataType:'json',  
			      data:data, 
			      success:function(result){
			    	  if(result.msg=="success"){//成功的时候
			    		  $("#SettledList").html("");
			    		  var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
							  if (list.length>0) {
								  for(i=0;i<list.length;i++){
				               		  var item = list[i];
				               		  var feeTypeList = item.feeType;
										var html ='<ul class="zq_centent_ul clearfix">';
										html+='<span style="display: none;">'+item.activityId+'</span>';
				               			html +='<li class="zq_title_page">'+(i+1)+'</li>';
				               			html +='<li class="zq_title_names zq_title_namesGet">'+item.title+'</li>';
				               			html +='<li class="zq_title_list zq_title_listGet">查看</li>';
				               			html +='<li class="zq_title_tatements zq_title_tatementsGet">审核结算</li>';
				               			html +='</ul>';
				               		  $("#SettledList").append(html);
				               		  
				               		 //跳转活动详情不带审核
				               		$(".zq_title_namesGet").click(function(){
				               		    var activityid=$(this).parent(".zq_centent_ul").find("span").html();
				               			cruxVariable.setItem("activityid",activityid);
				               			var String=$(".zq_mantel_nav").html();
				               			cruxVariable.setItem("String",String);//储存路径
				               			cruxVariable.removeItem("StringBs");
				               			var index=3;
				               			cruxVariable.setItem("mocent",2)
				               			cruxVariable.setItem("index",index);
				               			window.location.href="activity.html"
				               		})
				               	//跳转报名名单
				               	 	$(".zq_title_listGet").click(function(){
				               		 	var activityid=$(this).parent(".zq_centent_ul").find("span").html();
				               		 	cruxVariable.setItem("activityid",activityid);
				               		 	var String=$(".zq_mantel_nav").html();
				               		 	cruxVariable.setItem("String",String);//储存路径
				               		 	cruxVariable.removeItem("StringBs");
				               		 	cruxVariable.setItem("index",3);
				               		 	window.location.href="list.html"
				               	 	})
				               	//跳转审核结算不显示右侧不显示按钮
				               	 	$(".zq_title_tatementsGet").click(function(){
				               		 	var activityid=$(this).parent(".zq_centent_ul").find("span").html();
				               		 	cruxVariable.setItem("activityid",activityid);
				               		 	var String=$(".zq_mantel_nav").html();
				               		 	cruxVariable.setItem("String",String);//储存路径
				               		 	cruxVariable.removeItem("StringBs");
				               		 	cruxVariable.setItem("index",3);
				               		 	cruxVariable.setItem("iscentmour",0);
				               		 	window.location.href="financialaudit.html"//跳转到审核结算
				               	 	}) 
				               		  
				               	  }
							}
								  
			    	  }
					 
			      },  
			        timeout:3000  
			 });  
		}
 	
function getNotSettledListCount(){
	var data={"currentPage":1};
	$.ajax({  
        url:dataLink+"NotSettled/getNotSettledList",   
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
				$("#notSettled").html("");
            	var count = result.activityCount;
			    	var list=result.pageInfo;
					var count = list.recordCount;
					if (count >0) {
						$("#notSettled").css("display","block")
						$("#notSettled").append(count);
					}else {
						$("#notSettled").css("display","none")
					}
						
        	}
        },  
        timeout:3000  
	});  
}
function getTiXianCount(){
	var data={"currentPage":1};
	$.ajax({  
        url:dataLink+"withdraw/queryAll",   
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
				$("#tixian").html("");
            	var count =result.auditCount;
            	if (count >0) {
            		$("#tixian").css("display","block")
					$("#tixian").append(count);
				}else {
					$("#tixian").css("display","none")
				}
					
        	}
        },  
        timeout:3000  
	});  
}

	
	
		  //提交数据
	    function pageinationView(currentPage){
	        //_load._data(currentPage);
			cruxVariable.setItem("_currentPage_s",currentPage==""?1:currentPage);
			Settled();
			

	      
	}

	var _pageinationView={
	   _currentPage:function(){
	    $(".currentPage").click(function(){
	        //_load._data($(this).text());
	    	   cruxVariable.setItem("_currentPage_s",$(this).text()==""?1:$(this).text());
	    	   Settled();
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
	        cruxVariable.setItem("_currentPage_s",_temp==""?1:_temp);
	        Settled();
	    });
	  }
	}