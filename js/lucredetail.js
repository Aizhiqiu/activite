var cruxVariable=webStorage();
isindexget()


//从收益列表跳过来 判断
var page1=cruxVariable.getItem("page");//点击什么详情进来
//page   //点击什么进去收益 1==授课者  2==组织者  3==邀请者
if(page1==1){//授课者
	$("head title").html("授课者收益")
	$(".zq_luredetail").html("授课者收益")
	$(".zq_centent h1").html("授课者收益详情")
	cruxVariable.setItem("_currentPage","");
	lectures();
}else if(page1==2){//组织者
	$("head title").html("组织者收益")
	$(".zq_luredetail").html("组织者收益")
	$(".zq_centent h1").html("组织者收益详情")
	cruxVariable.setItem("_currentPage","");
	organizers();
}else if(page1==3){//邀请者
	$("head title").html("邀请者收益")
	$(".zq_luredetail").html("邀请者收益")
	$(".zq_centent h1").html("邀请者收益详情")
	cruxVariable.setItem("_currentPage","");
	share();
}
//组织收益列表
		function organizers(){
			$(".Lu_organ").html("");
			var activityId= cruxVariable.getItem("activityId");
			var userId= cruxVariable.getItem("userIdLectures");
			var _currentPage=cruxVariable.getItem("_currentPage");
			 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"userId":userId,"activityId":activityId,"currentPage":_currentPage};
			$.ajax({  
		        url:dataLink+"profit/getOrganizersIncomeDetails",  
		        type: 'GET',
		        dataType: 'json',
		        data:data,
		        success:function(result){
		        	if(result.msg="success"){
						
		            	var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
							  if(list!=null){
								for(var i=0;i<list.length;i++){
									var item=list[i];
									var ratio =(((item.divide)*10000)/100)+'%';
									var html = '<ul class="Lu_table clearfix">';
									html+='<li class="Lu_num">'+(i+1)+'</li>';
									if (item.userName == null) {
										html+='<li class="Lu_name">'+""+'</li>';
									}else {
										html+='<li class="Lu_name">'+item.userName+'</li>';
									}
									
									html+='<li class="Lu_vip">'+item.typeName+'</li>';
									html+='<li class="Lu_money"><span>'+item.ngoFee+'</span>元</li>';
									html+='<li class="Lu_oney_one">'+ratio+'</li>';
									html+='<li class="Lu_oney_two">'+item.fee+'元</li>';
									html+='</ul>';
									$(".Lu_organ").append(html);
								}
							}
		        	}
		        },  
		        timeout:3000  

				 });
		};
//授课收益列表
		function lectures(){
			$(".Lu_organ").html("");
			var activityId= cruxVariable.getItem("activityId");
			var userId= cruxVariable.getItem("userIdLectures");
			var _currentPage=cruxVariable.getItem("_currentPage");
			 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"userId":userId,"activityId":activityId,"currentPage":_currentPage};
			$.ajax({  
		        url:dataLink+"profit/getTeachIncomeDetails",  
		        type: 'GET',
		        dataType: 'json',
		        data:data,
		        success:function(result){
		        	if(result.msg="success"){
		            	var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
						 if(list!=null){
							for(var i=0;i<list.length;i++){
								var item=list[i];
								var ratio =(((item.divide)*10000)/100)+'%';
								var html = '<ul class="Lu_table clearfix">';
								html+='<li class="Lu_num">'+(i+1)+'</li>';
								if (item.userName == null) {
									html+='<li class="Lu_name">'+""+'</li>';
								}else {
									html+='<li class="Lu_name">'+item.userName+'</li>';
								}
								
								html+='<li class="Lu_vip">'+item.typeName+'</li>';
								html+='<li class="Lu_money"><span>'+item.ngoFee+'</span>元</li>';
								html+='<li class="Lu_oney_one">'+ratio+'</li>';
								html+='<li class="Lu_oney_two">'+item.fee+'元</li>';
								html+='</ul>';
								$(".Lu_organ").append(html);
							}
						 }
		        	}
		        },  
		        timeout:3000  

				 }); 
		};
//分享收益列表			
			function share(){
				$(".Lu_organ").html("");
				var userId= cruxVariable.getItem("userIdLectures");
				var activityId= cruxVariable.getItem("activityId");
				var _currentPage=cruxVariable.getItem("_currentPage");
				 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"userId":userId,"activityId":activityId,"currentPage":_currentPage};
				$.ajax({  
			        url:dataLink+"profit/getShareIncomeDetails",  
			        type: 'GET',
			        dataType: 'json',
			        data:data,
			        success:function(result){
			        	if(result.msg="success"){
			            	var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
							  if(list!=null){
								for(var i=0;i<list.length;i++){
									var item=list[i];
									var ratio =(((item.divide)*10000)/100)+'%';
									var html = '<ul class="Lu_table clearfix">';
									html+='<li class="Lu_num">'+(i+1)+'</li>';
									if (item.userName == null) {
										html+='<li class="Lu_name">'+""+'</li>';
									}else {
										html+='<li class="Lu_name">'+item.userName+'</li>';
									}
									html+='<li class="Lu_vip">'+item.typeName+'</li>';
									html+='<li class="Lu_money"><span>'+item.ngoFee+'</span>元</li>';
									html+='<li class="Lu_oney_one">'+ratio+'</li>';
									html+='<li class="Lu_oney_two">'+item.fee+'元</li>';
									html+='</ul>';
									$(".Lu_organ").append(html);
								}
							  }
			        	}
			        },  
			        timeout:3000  

					 }); 
			};		


			
		 //提交数据
    function pageinationView(currentPage){
        //_load._data(currentPage);
    	if (page1==1){
    		cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
    		lectures();
    	}else if (page1==2) {
    		cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
    		organizers();
		}else if(page1==3){
			cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
			share();
		}
		
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
        //_load._data($(this).text());
		if (page1==1){
    		cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
    		lectures();
    	}else if (page1==2) {
    		cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
    		organizers();
		}else if(page1==3){
			cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
			share();
		}
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
      if (page1==1){
    	cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
  		lectures();
      	}else if (page1==2) {
      	cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
  		organizers();
		}else if(page1==3){
			cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
			share();
		}
    });
  }
}