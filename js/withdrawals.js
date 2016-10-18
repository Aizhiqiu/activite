
indexall();
isindexget();
var cruxVariable=webStorage();
//打款确认弹出弹窗
var _w_id="";  //申请者id
var _pay={

	_show:function(){
		$(".zq_money_withdraw").click(function(){
			_w_id=$(this).parent().parent().find("p").html();
			$(".zq_shade").show();
			$(".zq_withdrawals_alertA").show();
			$("#zq_aliply_number").val("");
		})
	},
	_send:function(_billNo){
		var _userId=cruxVariable.getItem("manage_user_id");
				var data={"userId":_userId,"wId":_w_id,"billNo":_billNo};
		$.ajax({  
				url:dataLink+"outLay/payment",  
	            type : "Post",
	            dataType : "json",
	            data:data,
		        success:function(result){
		        	console.info(result);
				   if(result.msg=="success"){
				   	_withdraw._list();
				   }
		        },  
		        timeout:3000  
			}); 
	}
}
//打款确认弹窗点击确定时
$(".zq_alertA_get").click(function(){
	var numbe=$("#zq_aliply_number").val();
	var patter =/^[0-9]*[1-9][0-9]*$/;
 	if(numbe!==""){
    	if(!patter.test(numbe)){
            $("#zq_aliply_number").val("");
            alert("请输入正确单号");
        }else{//当输入值都是数字的时候
        	_pay._send(numbe);
        	$(".zq_shade").hide();
			$(".zq_withdrawals_alertA").hide();
        };
    }else{
    	 alert("请输入正确单号");
    }
})
//点击取消时
$(".zq_alert_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_withdrawals_alertA").hide();
	$(".zq_withdrawals_alertB").hide();
	$("#zq_aliply_number").val("");
})
//点击确定
$(".zq_alertB_get").click(function(){
	$(".zq_shade").hide();
	$(".zq_withdrawals_alertA").hide();
	$(".zq_withdrawals_alertB").hide();
});
//点击已打款时弹窗
var _end={
	_pay:function(){
			$(".zq_money_withdrawals").click(function(){
			_w_id=$(this).parent().parent().find("p").html();
			_end._send();
			var _html='<span>打款金额&nbsp;：&nbsp;<a id="money_id"></a></span><br />';
				   	 	_html+='<span>支付宝交易流水号&nbsp;：&nbsp;<a id="number_id"></a></span><br />';
				   	 	_html+='<span>打款确认时间&nbsp;：&nbsp;<a id="pay_date"></a></span><br />';
				   	 	_html+='<span>打款人&nbsp;：&nbsp;<a id="pay_user"></a></span>';
				   	 	$(".zq_money_withdrawals_list").html(_html);
			$(".zq_shade").show();
			$(".zq_withdrawals_alertB").show();
		})	
	},
	_send:function(){
		var _userId=cruxVariable.getItem("manage_user_id");
				var data={"wId":_w_id};
		$.ajax({  
				url:dataLink+"outLay/queryOutLayDetai",  
	            type : "GET",
	            dataType : "json",
	            data:data,
		        success:function(result){
		        	console.info(result);
		        	if (result.outLayDetai!=null) {
				      if(result.msg=="success"){
				   	var _outLayDetai=result.outLayDetai;
				   	var _nice=_outLayDetai.nice;
				   		_nice=_nice==null||_outLayDetai.nice=="null"||_outLayDetai.nice=="undefined"?"":_nice;
				   		$("#money_id").html(_outLayDetai.money);
				   		$("#number_id").html(_outLayDetai.billNo);
				   		$("#pay_date").html(getFormatDateByLong(_outLayDetai.outTime,'yyyy-MM-dd hh:mm'));
				   		$("#pay_user").html(_nice);
				   
				    }
				 }  
		        },  
		        timeout:3000  
			}); 
	}
	
}


// 管理活动下--管理报名
$(".zq_choice_get").click(function(){
		if($(this).hasClass("zq_choice_gettow")){//取消全选
			$(this).removeClass("zq_choice_gettow");
			$(".zq_mae_click").each(function(i){
				$(this).removeClass("zq_mae_clicktwo");
			});
		}else{//全选
			$(this).addClass("zq_choice_gettow");
			$(".zq_mae_click").each(function(i){
				$(this).addClass("zq_mae_clicktwo");
			});
		}
		var i=$(".zq_mae_clicktwo").length
		$(".zq_choice_fewer").html("已选择"+i+"人");
		if(i<1){
			$(".zq_mae_removeone").addClass("zq_mae_remove_altA");
			$(".zq_mae_remove_altA").click(function(){
				return false;
			})
		}else{
			$(".zq_mae_removeone").removeClass("zq_mae_remove_altA");
		}
	});
//点击选择的点击函数，Ajax遍历之后需再次调用
var  _click={
	_choose:function(){
			$(".zq_mae_click").click(function(){
		$(this).toggleClass("zq_mae_clicktwo");
		var isA=$(".zq_mae_click").length;
		var isB=$(".zq_mae_clicktwo").length;
		$(".zq_choice_fewer").html("已选择"+isB+"人")
		if (isA==isB) {
			$(".zq_choice_get").addClass("zq_choice_gettow");
		}else{
			$(".zq_choice_get").removeClass("zq_choice_gettow");
		}
		if(isB<1){
			$(".zq_choice_get").removeClass("zq_choice_gettow");
			$(".zq_mae_removeone").addClass("zq_mae_remove_altA");
			$(".zq_mae_remove_alt").click(function(){
				return false;
			})
		}else{
			$(".zq_mae_removeone").removeClass("zq_mae_remove_altA");
		}
	})
	}
}


var  _audit={
	_go:function(){
		//点击审核跳转到审核页
		 $(".zq_money_withd").click(function(){
			    var activityid=$(this).parent(".zq_mover").parent(".zq_withdrawals_centent").find("p").html();
				cruxVariable.setItem("activityid",activityid);
				var index=3;
				cruxVariable.setItem("index",index);
				var String=$(".zq_mantel_nav").html();
				cruxVariable.setItem("String",String);//储存路径
				//存储申请者id
				var _auditId=$(this).parent().parent().find("p").html();
				cruxVariable.setItem("_auditId",_auditId);
				window.location.href="examine.html"
		 }) 
	
	}
}
		

$(function(){ 
　_withdraw._list();
  _export._excel();
  getNotSettledListCount();
 
}); 

//提现记录列表
var _withdraw={
	//初始化列表数据
	_list:function(){
		var _currentPage=cruxVariable.getItem("_withdraw_currentPage");
		 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"currentPage":_currentPage};
		$.ajax({  
				url:dataLink+"withdraw/queryAll",  
	            type : "GET",
	            dataType : "json",
	            data:data,
        		contentType: "application/json; charset=utf-8",
		        success:function(result){
		        	console.info(result);
				   if(result.msg=="success"){
				   			var list =eval(result.pageInfo);
               	 				page(result);
                				list=list.recordList;
                				if(list.length==0){
                					$(".zq_mae_export_alt").hide();
                				}else{
                					$(".zq_mae_export_alt").show();
                				}
                				if(result.auditCount>0){
                					$("#tixian").html(result.auditCount);
                					$("#tixian").css('display','block');
                				}else{
                					$("#tixian").css('display','none');
                				}
                	  $(".zq_withdrawals_title").html("");
                	 var _html_temp='<div class="zq_tittle_head">';
					     _html_temp+='<span class="zq_mover">选择</span>';
					    _html_temp+='<span class="zq_name_title">姓名</span>';
					    _html_temp+='<span class="zq_mobile">手机号</span>'
					    _html_temp+='<span class="zq_money_ply">支付宝账户</span>'
					    _html_temp+='<span class="zq_money_names">支付宝真实姓名</span>'
					    _html_temp+='<span class="zq_money_nubmo">提现金额</span>  '
					    _html_temp+='<span class="zq_money_review">审核</span></div>';
					      $(".zq_withdrawals_title").html(_html_temp);
                	for(var x=0;x<list.length;x++){
                		var item=list[x];
                		
                		var _html='<div class="zq_withdrawals_centent">';
                		_html+='<p style="display: none;">'+item.id+'</p>';
                		_html+='<span class="zq_mover"><a class="zq_mae_click " href="javascript:;"></a></span>';
                		var _userName=item.userName==null?"":item.userName;
                		_html+='<span class="zq_name_title">'+_userName+'</span>';
                		var _tel=item.tel==""||item.tel==null||item.tel=="null"?"":item.tel;
                		_html+='<span class="zq_mobile">'+_tel+'</span>';
                		var _cardNumber=item.cardNumber==null?"":item.cardNumber;
                		var _userAccount=item.userAccount==null?"":item.userAccount;
                		_html+='<span class="zq_money_ply">'+_cardNumber+'</span>';
                		_html+='<span class="zq_money_names">'+_userAccount+'</span>';
                		_html+='<span class="zq_money_nubmo">'+item.money+'</span>';
                		_html+='<span class="zq_money_review">';
                		_html+=_withdraw._stae(item.type,item.money);
                		_html+='</span></div>'
                		$(".zq_withdrawals_title").append(_html);
                	}
                	_click._choose();
                	//跳转审核页
                	_audit._go();
                	//打款输入交易码窗口
                	_pay._show();
                	//已打款
                	_end._pay();
				   }
		        },  
		        timeout:3000  
			});  
	},
	//提现申请状态
  _stae:function(type,_money){
  	var _reslut=""
  	switch(type)
  	 {
		case 1:
		  _reslut='<a class="zq_money zq_money_withd" href="javascript:;">等待审核</a>';
		  break;
		case 2:
		    if(_money>0){
		  		_reslut='<a class="zq_money zq_money_withdraw" href="javascript:;">打款确认</a>';
		    }else{
		    	_reslut='<a class="zq_money">打款确认</a>';
		    }
		  break;
		case 3:
		  _reslut='<a class="zq_money">未通过审核</a>';
		  break;
		default:
		 _reslut='<a class="zq_money zq_money_withdrawals" href="javascript:;">已打款</a>';
	 }
	  return _reslut;

   }
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




//导出
var _export={
	_excel:function(){
		$(".zq_mae_exportone").click(function(){
		//导出时需要得到每个记录的Id
		var arrList = new Array();
				$(".zq_mae_clicktwo").each(function(i){
					var useridOne=$(this).parent(".zq_mover").parent(".zq_withdrawals_centent").find("p").html();
					arrList.push(useridOne);

			 })
			if(arrList!=null&&arrList.length>0&&arrList!=""){
			window.location.href=dataLink+"withdraw/exportWithdraw?ids="+arrList;
			}else{
					window.location.href=dataLink+"withdraw/exportWithdraw?ids=";
			}
		});
	}
}


 //提交数据
    function pageinationView(currentPage){
      cruxVariable.setItem("_withdraw_currentPage",currentPage==""?1:currentPage);  
      _withdraw._list();
}

var _pageinationView={
   _currentPage:function(){
   	$(".zq_choice_get").removeClass("zq_choice_gettow");
   	$(".zq_choice_fewer").html("已选择0人");
    $(".currentPage").click(function(){
      cruxVariable.setItem("_withdraw_currentPage",$(this).text()==""?1:$(this).text());
      _withdraw._list();
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
          cruxVariable.setItem("_withdraw_currentPage",_temp==""?1:_temp);
          _withdraw._list();
       
    });
  }
}