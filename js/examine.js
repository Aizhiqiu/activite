indexall();
var cruxVariable=webStorage();
var Strin=cruxVariable.getItem("String");
var StringB='&nbsp; &gt; &nbsp;<span class="zq_examine_get">审核</span>';
var strign=Strin+StringB
$(".zq_mantel_nav").html("");
$(".zq_mantel_nav").html(strign);
isindexget();



//取消时
$(".zq_manger_move").click(function(){
	$(".zq_manage_right").hide();
	$(".zq_manage_rightOne").hide();
	
})


$(function(){
  _examine._detail();

})
var _curuserId="";//当前申请者userId
//个人账户详情
var _examine={
	_detail:function(){
		var _auditId=cruxVariable.getItem("_auditId");
		var data={"id":_auditId};
		$.ajax({  
				url:dataLink+"audit/auditInfo",  
	            type : "GET",
	            dataType : "json",
	            data:data,
        		contentType: "application/json; charset=utf-8",
		        success:function(result){
				   if(result.msg=="success"){
				   	 var _auditInfo=result.auditInfo;
				   	 _curuserId=_auditInfo.userId;
				   	 var _name=_auditInfo.userName==null?"":_auditInfo.userName;
				   	 var _html='<p style="display: none;">'+_auditInfo.userId+'</p><span class="zq_title_left">姓名</span><span class="zq_examine_name">'+_name+'</span><br />';
				   	     var _cardNumber=_auditInfo.cardNumber==null?"":_auditInfo.cardNumber;
				   	 	_html+='<span class="zq_title_left">支付宝账户</span><span class="zq_alipay">'+_cardNumber+'</span><br />';
				   	 	var _userAccount=_auditInfo.userAccount==null?"":_auditInfo.userAccount;
				   	 	_html+='<span class="zq_title_left">支付宝真实姓名</span><span class="zq_alipay_name">'+_userAccount+'</span><br />';
				   	 	_html+='<span class="zq_title_left">账户余额 </span><span class="zq_money">'+_auditInfo.amount+'  元</span><span class="zq_money_list">详情</span> <br />';
				   	 	_html+='<span class="zq_title_left">提现申请</span><span class="zq_examine_money">'+_auditInfo.money+'</span><br />';
				   	 	_html+='<span class="zq_title_left zq_examine_list">提现记录</span><br />';
				   	 	_html+='<div class="zq_examine_button">';
				   	 	_html+='<a class="zq_examine_moueGet" href="javascript:;">通过</a><a class="zq_examine_moueNo" href="javascript:;">不通过</a>';
				   	 	_html+='</div>';
				   	 	$(".zq_centent_left").append(_html);
				   }
				   _look._over();
				   _look._details();
				   _audit._pass();
		        },  
		        timeout:3000  
			});  
		
	}
}

//提现记录
var _id="";
var _opera="";
var _look={
	//查看提现记录
	_over:function(){
		$(".zq_examine_list").click(function(){
			_opera="_over";

			//申请提现者用户id
		  _id=$(this).parent().find("p").html();
		_look._list();
		$(".zq_manage_right").show();
		$(".zq_manage_rightOne").hide();
	 })
	},
	//提现记录列表
	_list:function(){
			var _currentPage=cruxVariable.getItem("_over_currentPage");
		 	_currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
		 if(_id!=""){	
		   var data={"userId":_id,"currentPage":_currentPage};
			$.ajax({  
					url:dataLink+"audit/getCashrecords",  
		            type : "GET",
		            dataType : "json",
		            data:data,
	        		contentType: "application/json; charset=utf-8",
			        success:function(result){
					   if(result.msg=="success"){
					   			var list =eval(result.pageInfo);
					   			 $("#spTwo").html("");
	               	 				$("#sp").html(page(result,""));
	                				list=list.recordList;
	                	  $(".reslut").html("");
	                	for(var x=0;x<list.length;x++){
	                		var item=list[x];
	                		var _html='<div class="zq_tatl_manger">';
	                		_html+='<span class="zq_manger_oneA">'+(x+1)+'</span>';
	                		_html+='<span class="zq_manger_toeA">'+getFormatDateByLong(item.outTime,'yyyy-MM-dd hh:mm')+'</span>';
	                		_html+='<span class="zq_manger_thwA">'+item.money+'元</span>';
	                		_html+='<span class="zq_manger_fourA">'+item.billNo+'</span>';
	                		_html+='</div>'
	                		$(".reslut").append(_html);
	                	}
	                		_pageinationView._currentPage();
							_pageinationView._go(result.pageInfo.pageCount);
					   }
			        },  
			        timeout:3000  
				}); 
		}
	},
	//查看账户详情时
	_details:function(){
		$(".zq_money_list").click(function(){
			_opera="_details";
			_id=$(this).parent().find("p").html();
			_look._incomeList();
			$(".zq_manage_rightOne").show();
			$(".zq_manage_right").hide();
	
		})
	},
	//账户收益列表
	_incomeList:function(){
		var _currentPage=cruxVariable.getItem("_details_currentPage");
		 	_currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
		 if(_id!=""){	
		   var data={"userId":_id,"currentPage":_currentPage};
			$.ajax({  
					url:dataLink+"audit/queryRecordDetail",  
		            type : "GET",
		            dataType : "json",
		            data:data,
	        		contentType: "application/json; charset=utf-8",
			        success:function(result){
			        	 if(result.msg=="success"){
					   			var list =eval(result.pageInfo);
					   		  $("#sp").html("");
	               	 		  $("#spTwo").html(page(result,""));
	                			list=list.recordList;
	                	  $(".reslut").html("");
	                	for(var x=0;x<list.length;x++){
	                		var item=list[x];
	                		var _html='<div class="zq_tatl_manger">';
	                		_html+='<span class="zq_manger_one">'+(x+1)+'</span>';
	                		_html+='<span class="zq_manger_toe">'+item.title+'</span>';
	                		_html+='<span class="zq_manger_thw">'+item.type+'</span>';
	                		_html+='<span class="zq_manger_four">'+item.money+'元</span>';
	                		_html+='</div>'
	                		$(".reslut").append(_html);
	                	}
	               		_pageinationView._currentPage();
	               	    _pageinationView._go(result.pageInfo.pageCount); 
					   }
			        },  
			        timeout:3000  
				}); 
		}
	}

}

  //提交数据
    function pageinationView(currentPage){
      if(_opera!=""&&_opera=="_over"){
      	  cruxVariable.setItem("_over_currentPage",currentPage==""?1:currentPage);
      	_look._list();
      }else if(_opera!=""&&_opera=="_details"){
      	 cruxVariable.setItem("_details_currentPage",currentPage==""?1:currentPage);
      	_look._incomeList();
      }
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
    	  if(_opera!=""&&_opera=="_over"){
		      cruxVariable.setItem("_over_currentPage",$(this).text()==""?1:$(this).text());
		    	 _look._list();
		    	 return ;
		   }else if(_opera!=""&&_opera=="_details"){
      	 	cruxVariable.setItem("_details_currentPage",$(this).text()==""?1:$(this).text());
      	 	_look._incomeList();
      	 	return;
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
          return;
        }  
          if(_opera!=""&&_opera=="_over"){
          cruxVariable.setItem("_over_currentPage",_temp==""?1:_temp);
         _look._list();
      }else if(_opera!=""&&_opera=="_details"){
      	 cruxVariable.setItem("_details_currentPage",_temp==""?1:_temp);
      	 _look._incomeList();
      }
       
    });
  }
}



var _audit={
	//通过时
	_pass:function(){
		$(".zq_examine_moueGet").click(function(){
			//window.location.href="withdrawals.html"
			var _url="withdrawals.html";
			_audit._send(2,_url);
	
		})
	//不通过时
		$(".zq_examine_moueNo").click(function(){
			//window.location.href="withdrawals.html"
			var _url="withdrawals.html";
			_audit._send(3,_url);
		})
	},
	_send:function(_applicantType,url){
		var _auditId=cruxVariable.getItem("_auditId");
		var data={"userId":_curuserId,"id":_auditId,"applicantType":_applicantType};
		console.info(data);
			$.ajax({  
					url:dataLink+"audit/updatewithdraw",  
		            type : "POST",
		            dataType : "json",
		            data:data,
			        success:function(result){
			        	 if(result.msg=="success"){
			        	 	window.location.href=url;
			        	 }
			        },  
			        timeout:3000  
				}); 
	}

}

