var cruxVariable=webStorage();
var Strin=cruxVariable.getItem("String");
var iscentmour=cruxVariable.getItem("iscentmour");
var StringA='&nbsp; &gt; &nbsp;</i><span class="zq_financialaudit_get">财务审核结算</span>';
var StringB='&nbsp; &gt; &nbsp;</i><span class="zq_financialaudit_get">财务审核结算</span>';
if(iscentmour==1){//显示右侧及结算按钮
	var strign=Strin+StringA
	$(".Flt_content_right").show();
	$(".zq_button_flt").show();
}else{
	var strign=Strin+StringB
}
$(".zq_mantel_nav").html(strign);
//点击结算时弹出弹框
$(".zq_button_flt").click(function(){
	$(".zq_shade").show();
	$(".zq_currentmanage_direct").show();
})
//点击弹窗取消时
$(".zq_alert_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_currentmanage_direct").hide();
})
//点击弹窗确定时
$(".zq_manage_alertget").click(function(){
	$(".zq_shade").hide();
	$(".zq_currentmanage_direct").hide();
	audit();
})


indexall();
isindexget();


//审核结算
function audit() {
	var activityId= cruxVariable.getItem("activityid");
	var data={"activityId":activityId};
	$.ajax({  
        url:dataLink+"NotSettled/AuditAmount",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg=="success"){
        		window.location.href="oentstatements.html";
        	}
        },  
        timeout:3000  

		 }); 
} 



if(iscentmour==1){
	//未结算
	$(function(){
		cruxVariable.setItem("_currentPage","");
		notUserSettled();
		notUserAll();
	});
}else{
	//已结算
	$(function(){
		cruxVariable.setItem("_currentPage","");
		userSettled();
		userAll();
	});
}

	//未结算收益详情
	function notUserSettled(){
		
		 var activityid = cruxVariable.getItem("activityid");
		var _currentPage=cruxVariable.getItem("not_hudong_currentPage");
		 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
		var data={"currentPage":_currentPage,"activityId":activityid};
		$.ajax({
		      url:dataLink+"NotSettled/getNotSettledUse", 
		      type: 'GET',
		      dataType:'json',  
		      data:data, 
		      success:function(result){
		    	  if(result.msg=="success"){//成功的时候
		    		  var list=result.pageInfo;
		    		  	//$("#sp").html("");
						$(".Flt_headline_con").html("");
						$(".Flt_fotter").html("");
		    		  	$("#spTwo").html(page(result,"not_details"));
            			list=list.recordList;
            			$(".reslut").html("");
						  var title = result.title;
			            	$(".Flt_title h1").html(title);
						  if (list.length>0) {
							  for(i=0;i<list.length;i++){
			               		  var item = list[i];
			               		var ticketPayType =null;
			               		  if (item.ticketPayType ==1) {
									ticketPayType ="分期";
			               		  }else if (item.ticketPayType ==0) {
			               			ticketPayType ="全额";
								}
			               		var detailsList= item.detailsList;
				               		if (detailsList.length==1) {
				               			var html ='<ul class="Flt_teble">';
									}else if (detailsList.length==2) {
										var html ='<ul class="Flt_teble_two">';
									}else if (detailsList.length==3) {
										var html ='<ul class="Flt_teble">';
									}
									
			               			html +='<li class="Flt_one">'+(i+1)+'</li>';
			               			if (item.userName == null) {
			               				var name = "企信智慧"
			               				html +='<li class="Flt_two">'+name+'</li>';
									}else {
										html +='<li class="Flt_two">'+item.userName+'</li>';
									}
			               			
			               			html +='<li class="Flt_three">'+item.tel+'</li>';
			               			html +='<li class="Flt_four">'+item.typeName+'</li>';
			               			html +='<li class="Flt_five"><span>'+item.fee+'</span>元</li>';
			               			html +='<li class="Flt_six">'+item.count+'</li>';
			               			html +='<li class="Flt_seven">'+ticketPayType+'</li>'
			               			html +='<li class="Flt_eight">';
									if(detailsList.length>0){
										for (var j = 0; j < detailsList.length; j++) {
			               				var details =detailsList[j];
			               				var payType=null;
										if (details.payType ==0) {
											payType="支付宝";
										}else if (details.payType ==1) {
											payType="微信";
										}else if (details.payType ==2) {
											payType="线下支付";
										}else {
											payType="免费";
										}
										
			               				html += '<p>'+details.feeType+'&nbsp; &nbsp;'+details.payFee+'&nbsp; &nbsp;'+payType+'</p>';
									}
									}
			               			
			               			html +='</li>';
			               			html +='</ul>';
			               			
			               		  $(".Flt_headline_con").append(html);
			               		 
			               	  }
							  _pageinationView._currentPage();
							  _pageinationView._go(result.pageInfo.pageCount);
						}
						  var profit=result.profit;
						  var htm ='<p class="Flt_fotter_one">总计：<span>'+profit.fee+'</span>元</p>';
						      htm +='<p class="Flt_fotter_two">线上：<span>'+profit.shareFee+'</span>元</p>';
						      htm +='<p class="Flt_fotter_three">线下：<span>'+profit.ngoFee+'</span>元</p>';
						  $(".Flt_fotter").append(htm);  
		    	  }
				 
		      },  
		        timeout:3000  
		 });  
	}
	

//未结算分配列表
	function notUserAll(){
	
	var activityId= cruxVariable.getItem("activityid");
	var _currentPage=cruxVariable.getItem("not_fenpei_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"activityId":activityId,"currentPage":_currentPage};
	$.ajax({  
        url:dataLink+"NotSettled/getNotTotalActivity",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
				$(".Flt_headline_con_r").html("");
				$(".Flt_r_fotter").html("");
            	var list=result.pageInfo;
            		//$("#spTwo").html("");
	 				$("#sp").html(page(result,"not_settled"));
	 				list=list.recordList;
					 $(".Flt_r_fotter").html("");
            	for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var html = '<ul class="Flt_teble_r">';
            		html+='<li class="Flt_r_one">'+(i+1)+'</li>';
					if(item.userName ==null){
						var name = "企信智慧"
						html+='<li class="Flt_r_two">'+name+'</li>';
					}else{
						html+='<li class="Flt_r_two">'+item.userName+'</li>';
					}
            		
            		html+='<li class="Flt_r_three">'+item.fee+'元</li>';
            		html+='<li class="Flt_r_four">'+item.teachFee+'元</li>';
					html+='<li class="Flt_r_five"><span>'+item.ngoFee+'</span>元</li>';
            		html+='<li class="Flt_r_six">'+item.shareFee+'元</li>';
            		html+='</ul>';
            		$(".Flt_headline_con_r").append(html);
            		
            	}
				_pageinationView._currentPage();
	            _pageinationView._go(result.pageInfo.pageCount);
            	var profit=result.profit;
						var ht='<p class="Flt_fotter_r">平台收益：<span>'+profit.ngoFee+'</span>元</p>';
            				ht += '<p class="Flt_fotter_r">总计：<span>'+profit.fee+'</span>元</p>';
            		 $(".Flt_r_fotter").append(ht);
            		 
        	}
        },  
        timeout:3000  

		 });  
	
};
	  //提交数据
    function pageinationView(currentPage,oper){
		if(iscentmour==1){
			if(oper=="not_details"){
				cruxVariable.setItem("not_hudong_currentPage",currentPage==""?1:currentPage);
				notUserSettled();
			}else if(oper=="not_settled"){
				cruxVariable.setItem("not_fenpei_currentPage",currentPage==""?1:currentPage);
				notUserAll();
			}
		//未结算
		}else{
			//已结算			
			if(oper=="details"){
				cruxVariable.setItem("yes_hudong_currentPage",currentPage==""?1:currentPage);
				userSettled();
			}else if(oper=="settled"){
				cruxVariable.setItem("yes_fenpei_currentPage",currentPage==""?1:currentPage);
				userAll();
			}
		}
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
    	  if(iscentmour==1){
			  //未结算
			   if("spTwo"==$(this).parent().parent().parent().parent().attr("id")){
				    cruxVariable.setItem("not_hudong_currentPage",$(this).text()==""?1:$(this).text());
					notUserSettled();
				
		      }else if("sp"==$(this).parent().parent().parent().parent().attr("id")){
				    cruxVariable.setItem("not_fenpei_currentPage",$(this).text()==""?1:$(this).text()); 
					notUserAll();
			  }
		
		}else{
			//已结算
			$(this).parent().parent().parent().parent().attr("id")
				if("spTwo"==$(this).parent().parent().parent().parent().attr("id")){
				    cruxVariable.setItem("yes_hudong_currentPage",$(this).text()==""?1:$(this).text()); 
					userSettled();
		      }else if("sp"==$(this).parent().parent().parent().parent().attr("id")){
				    cruxVariable.setItem("yes_fenpei_currentPage",$(this).text()==""?1:$(this).text());
					userAll();
			  }

			
				
		}
    });
   },
   //跳转到某页
  _go:function(pageCount){
    $(".cls").click(function(){
		var _temp=$(this).parent(".zq_paging_centent").find("#zq_paging_numberget").val();
      //$(this).parent()..find("zp_cls").val();
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
       // cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
        if(iscentmour==1){
			 if("spTwo"==$(this).parent().parent().parent().attr("id")){
				    cruxVariable.setItem("not_hudong_currentPage",_temp==""?1:_temp); 
					notUserSettled();
		      }else if("sp"==$(this).parent().parent().parent().attr("id")){
				    cruxVariable.setItem("not_fenpei_currentPage",_temp==""?1:_temp); 
					notUserAll();
			  }
		
		}else{
			  if("spTwo"==$(this).parent().parent().parent().attr("id")){
				//已结算
				    cruxVariable.setItem("yes_hudong_currentPage",_temp==""?1:_temp); 
					userSettled();
		      }else if("sp"==$(this).parent().parent().parent().attr("id")){
				  //已结算
				    cruxVariable.setItem("yes_fenpei_currentPage",_temp==""?1:_temp); 
					userAll();
			  }
			
				
				
		}
    });
  }
}	





	//已结算收益详情
	function userSettled(){
		
		 var activityid = cruxVariable.getItem("activityid");
		var _currentPage=cruxVariable.getItem("yes_hudong_currentPage");
		 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
		var data={"currentPage":_currentPage,"activityId":activityid};
		$.ajax({
		      url:dataLink+"Settled/getSettledUse", 
		      type: 'GET',
		      dataType:'json',  
		      data:data, 
		      success:function(result){
		    	  if(result.msg=="success"){//成功的时候
				  $(".Flt_headline_con").html("");
				  $(".Flt_fotter").html("");
		    		  var list=result.pageInfo;
		    		  	//$("#sp").html("");
		    		  	$("#spTwo").html(page(result,"details"));
		    		  	list=list.recordList;
						  var title = result.title;
			            	$(".Flt_title h1").html(title);
						  if (list.length>0) {
							  for(i=0;i<list.length;i++){
			               		  var item = list[i];
			               		var ticketPayType =null;
			               		  if (item.ticketPayType ==1) {
									ticketPayType ="分期";
			               		  }else if (item.ticketPayType ==0) {
			               			ticketPayType ="全额";
									}
			               		var detailsList= item.detailsList;
									
				               		if (detailsList.length==1) {
				               			var html ='<ul class="Flt_teble">';
									}else if (detailsList.length==2) {
										var html ='<ul class="Flt_teble_two">';
									}else if (detailsList.length==3) {
										var html ='<ul class="Flt_teble">';
									}
									
			               			html +='<li class="Flt_one">'+(i+1)+'</li>';
			               			if (item.userName == null) {
			               				html +='<li class="Flt_two">'+"企信智慧"+'</li>';
									}else {
										html +='<li class="Flt_two">'+item.userName+'</li>';
									}
			               			
			               			html +='<li class="Flt_three">'+item.tel+'</li>';
			               			html +='<li class="Flt_four">'+item.typeName+'</li>';
			               			html +='<li class="Flt_five"><span>'+item.fee+'</span>元</li>';
			               			html +='<li class="Flt_six">'+item.count+'</li>';
			               			html +='<li class="Flt_seven">'+ticketPayType+'</li>'
			               			html +='<li class="Flt_eight">';
									if(detailsList.length>0){
										for (var j = 0; j < detailsList.length; j++) {
			               				var details =detailsList[j];
			               				var payType=null;
										if (details.payType ==0) {
											payType="支付宝";
										}else if (details.payType ==1) {
											payType="微信";
										}else if (details.payType ==2){
											payType="线下支付";
										}else {
											payType="免费";
										}
										
			               				html += '<p>'+details.feeType+'&nbsp; &nbsp;'+details.payFee+'&nbsp; &nbsp;'+payType+'</p>';
									}
									}
			               			
			               			html +='</li>';
			               			html +='</ul>';
			               			
			               		  $(".Flt_headline_con").append(html);
			               		 
			               	  }
							  _pageinationView._currentPage();
							  _pageinationView._go(result.pageInfo.pageCount); 
						}
						  var profit=result.profit;
						  var htm ='<p class="Flt_fotter_one">总计：<span>'+profit.fee+'</span>元</p>';
						      htm +='<p class="Flt_fotter_two">线上：<span>'+profit.shareFee+'</span>元</p>';
						      htm +='<p class="Flt_fotter_three">线下：<span>'+profit.ngoFee+'</span>元</p>';
						  $(".Flt_fotter").append(htm);  
		    	  }
				 
		      },  
		        timeout:3000  
		 });  
	}
	

//已结算分配列表
	function userAll(){
	
	var activityId= cruxVariable.getItem("activityid");
	var _currentPage=cruxVariable.getItem("yes_fenpei_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"activityId":activityId,"currentPage":_currentPage};
	$.ajax({  
        url:dataLink+"Settled/getTotalActivityCost",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
				$(".Flt_headline_con_r").html("");
				$(".Flt_r_fotter").html("");
            	var list=result.pageInfo;
            	//$("#spTwo").html("");
 				$("#sp").html(page(result,"settled"));
 				list=list.recordList;
				$(".reslut").html("");
            	
            	for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var html = '<ul class="Flt_teble_r">';
            		html+='<li class="Flt_r_one">'+(i+1)+'</li>';
					if(item.userName ==null){
						html+='<li class="Flt_r_two">'+"企信智慧"+'</li>';
					}else{
						html+='<li class="Flt_r_two">'+item.userName+'</li>';
					}
            		
            		html+='<li class="Flt_r_three">'+item.fee+'元</li>';
            		html+='<li class="Flt_r_four">'+item.teachFee+'元</li>';
					html+='<li class="Flt_r_five"><span>'+item.ngoFee+'</span>元</li>';
            		html+='<li class="Flt_r_six">'+item.shareFee+'元</li>';
            		html+='</ul>';
            		$(".Flt_headline_con_r").append(html);
            		
            	}
				_pageinationView._currentPage();
	            _pageinationView._go(result.pageInfo.pageCount); 
            	var profit=result.profit;
						var ht='<p class="Flt_fotter_r">平台收益：<span>'+profit.ngoFee+'</span>元</p>';
            				ht += '<p class="Flt_fotter_r">总计：<span>'+profit.fee+'</span>元</p>';
            		 $(".Flt_r_fotter").append(ht);
            		 
        	}
        },  
        timeout:3000  

		 });  
	
};
	




