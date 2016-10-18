
var cruxVariable=webStorage();
	//请求后台数据
		
		$(function(){
			ActivityManagement();
		});
		function ActivityManagement(){
			$(".Mo_content_each").html("");
			var _currentPage=cruxVariable.getItem("_currentPage_s");
			 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"currentPage":_currentPage};
			$.ajax({
			      url:dataLink+"profit/getActivityManagement", 
			      type: 'GET',
			      dataType:'json',  
			      data:data, 
			      success:function(result){
			    	  if(result.msg=="success"){//成功的时候
			    		  var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
							  if(list.length !=0){
								  for(i=0;i<list.length;i++){
				               		  var item = list[i];
				               		  var feeTypeList = item.feeType;
									 if (feeTypeList.length ==2) {
										var html ='<ul class="zq_money_teble_two clearfix">';
									}else if (feeTypeList.length ==3) {
										var html ='<ul class="zq_money_teble_three clearfix">';
									}else if (feeTypeList.length ==4) {
										var html ='<ul class="zq_money_teble_four clearfix">';
									}else if (feeTypeList.length ==5) {
										var html ='<ul class="zq_money_teble_five clearfix">';
									}else if (feeTypeList.length ==6) {
										var html ='<ul class="zq_money_teble_six clearfix">';
									}else {
										var html ='<ul class="zq_money_teble clearfix">';
									}
										html+='<span style="display: none;" id="zq_manage">'+item.activityId+'</span>';
				               			html +='<li class="Mo_num">'+(i+1)+'</li>';
				               			html +='<li class="Mo_title"><span>'+item.title+'</span></li>';
				               			html +='<li class="Mo_time">'+ThisTime(1,item.startTime)+'</li>';
				               			html +='<li class="Mo_vip">';
				               			for(j=0;j<feeTypeList.length;j++){
					               			 var feeItem = feeTypeList[j];
					               			html +='<p>'+feeItem.typeName+'</p>';
				               			}
				               			html +='</li>';
				               			html +='<li class="Mo_money">';
				               				for(j=0;j<feeTypeList.length;j++){
						               			 var feeItem = feeTypeList[j];
						               			html +='<p style="height:60px;line-height:60px;"><span>'+feeItem.fee+'</span>元</p>';
					               			}
				               			html +='</li>';
				               			html +='<li class="Mo_oney_one">';
			               				for(j=0;j<feeTypeList.length;j++){
					               			 var feeItem = feeTypeList[j];
					               			html +='<p>'+feeItem.lessCount+'</p>';
				               			}
			               				html +='</li>';
				               			html +='<li class="Mo_oney_two">'+item.fee+'元</li>';
				               			html +='<li class="Mo_look">查看详情</li>';
				               			html +='</ul>';
				               		  $(".Mo_content_each").append(html);
				               		  
					               		//跳转活动详情不带审核
					               		$(".Mo_title").click(function(){
					               			var activityid=$(this).parent().find("#zq_manage").html();
					               			cruxVariable.setItem("activityid",activityid);
					               			var String=$(".In_nav").html();
					               			cruxVariable.setItem("String",String);//储存路径
					               			cruxVariable.removeItem("StringBs");
					               			var index=3;
					               			cruxVariable.setItem("index",index);
					               			cruxVariable.setItem("mocent",2)
					               			window.location.href="activity.html"
					               		})
				               	  }
								 }else{
									$(".zq_manage_centent").css("min-height","720px");
								 }
								  _go._xiangqing();
			    	  }
					 
			      },  
			        timeout:3000  
			 });  
		}

	var _go={
   _xiangqing:function(){ 				
   			//跳转收益详情
		$(".Mo_look").click(function(){
		var activityId=$(this).parent().find("#zq_manage").html();
		cruxVariable.setItem("activityId",activityId);
		var index=3;
		cruxVariable.setItem("index",index);
		window.location.href="incomelist.html"
		});
	  }
	}


		
    //提交数据
    function pageinationView(currentPage){
        //_load._data(currentPage);
		cruxVariable.setItem("_currentPage_s",currentPage==""?1:currentPage);
		ActivityManagement()
		

      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
        //_load._data($(this).text());
    	   cruxVariable.setItem("_currentPage_s",$(this).text()==""?1:$(this).text());
			ActivityManagement()
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
		 ActivityManagement()
    });
  }
}
isindexget()