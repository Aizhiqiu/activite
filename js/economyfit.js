//加载管理员列表
		$(function(){
			_load._data();
			_add._user();	 
		});

	 //初始化数据
$(".Ec_global a").click(function(){
	$(".Ec_global a span").each(function(){
		$(this).removeClass("zq_ble_resabl");
	})
	$(this).find("span").addClass("zq_ble_resabl");
});
   var _load={
   	  _data:function(){
   	  		var cruxVariable=webStorage();
			var _isAdmin=cruxVariable.getItem("isAdmin");
			if(_isAdmin!=1){

				$(".zq_management_fit").css("display","none");
			 }
   	  	$.ajax({  
					url:dataLink+"userManage/list",  
		            type : "GET",
		            dataType : "json",
            		contentType: "application/json; charset=utf-8",
			        success:function(result){
					   if(result.msg=="success"){
					   	  var _list=eval(result.pageInfo);
					   	  	$(".ul").html("");
		                      for(var i=0;i<_list.length;i++){
		                       var _index=i+1;
		                      	var _html='<li class="In_money_one">'+_index+'</li>';
		                      		_html+='<li class="In_money_two">'+_list[i].name+'</li>';
		                      		_html+='<li class="In_money_three">'+_list[i].useAccount+'</li>';
		                      		_html+='<li class="In_money_four">'+_list[i].plainPwd+'</li>';
		                      		if(_list[i].type ==0){
		                      			_html+='<li class="In_money_six">普通管理员</li>';
		                      		}else if(_list[i].type ==2){
		                      			_html+='<li class="In_money_six">财务管理员</li>';
		                      		}
		                      		_html+='<li class="In_money_five Ec_del"><span style="display:none">'+_list[i].id+'</span></li>';
		                      		$(".ul").append(_html);
		                      }
		                      _delete._user();
		                    
					   }else{
						   alert(result.errorCode);
					       return false;
					   }
			        		
			        },  
			        timeout:3000  
	    	}); 
   	  }
   }

 //删除用户
   var _delete={
       _user:function(){
       	 $(".Ec_del").click(function(){
				var _id=$(this).find("span").text();
       	 		var _del="delete";
			$(".Ec_bgtwo").css("display","block");
			//取消
			$(".zq_export_move").click(function(){

				$(".Ec_bgtwo").css("display","none");
				
			});
			//确认
			$(".zq_remove_get").click(function(){
				$(".Ec_bgtwo").css("display","none");
       	 		var data={"id":_id,"operate":_del};
		       	 		$.ajax({  
							url:dataLink+"userManage/saveOrupdate",  
				           	 type:"post",
				             data:data, 
				             dataType : "json",
					        success:function(result){
					          if(result.msg=="success"){
					        		_load._data();	
					            }
					        },  
					        timeout:3000  
			    	 });

			});
       	 	
       	  });

        }

   }

 
   //添加管理员
   var _add={
   	  _user:function(){
   	  	$(".Ec_add").click(function(){
   	  			var _flag=true;
   	  			var _name=$(".Ec_fame").val();
   	  			   _name=$.trim(_name);
		   	  	var _userName=$(".Ec_num").val();
		   	  	  _userName=$.trim(_userName);
		   	  	var _pwd=$(".Ec_pwd").val();
		   	  	 _pwd=$.trim(_pwd);
		   	  	var _add="add";
		   	  	var _text="";
		   	  	var isuser=null;
				$(".zq_ble_resabl").each(function(){
				   isuser =  $(this).attr("id");
				})
		   	  	if(_name==""){
		   	  		_flag=false;
		   	  	 _text="请输入正确的姓名!";
		   	  	  _show._info(_text);
		   	  	  return;
		   	  	}else if(_userName==""){
		   	  			_flag=false;
		   	  		   _text="请输入正确的用户名!";
		   	  		    _show._info(_text);
		   	  		   return;
		   	  	}else if(_pwd==""){
		   	  		 _flag=false;
		   	  		 _text="请输入正确的密码!";
		   	  		  _show._info(_text);
		   	  			 return;
		   	  	}else if (isuser==null || isuser=="") {
		   	  		_flag=false;
		   	  		_text="请选择权限!";
		   	  		_show._info(_text);
	   	  			 return;
				}
		   	  	if(_name.replace(/[^\x00-\xff]/g, "**").length<4||_name.replace(/[^\x00-\xff]/g, "**").length>12){
		   	  		_flag=false;
		   	  		_show._info(_inflow._info(_name,4,12,"姓名"));
		   	  		return;
		   	  
		   	  	} if(_userName.replace(/[^\x00-\xff]/g, "**").length<4||_userName.replace(/[^\x00-\xff]/g, "**").length>12){
		   	  		_flag=false;
		   	  		_show._info(_inflow._info(_userName,4,12,"用户名"));
		   	  		return;
		   	  		
		   	  		
		   	  	}if (_pwd.replace(/[^\x00-\xff]/g, "**").length<8||_pwd.replace(/[^\x00-\xff]/g, "**").length>18) {
		   	  		_flag=false;
		   	  		_show._info(_inflow._info(_pwd,8,18,"密码"));
		   	  		return;         
		   	  	}
				
		   	  if(_flag){
		   	  		var data={"name":_name,"useAccount":_userName,"plainPwd":_pwd,"pwd":_pwd,"operate":_add,"type":isuser};
		       	 		$.ajax({  
							url:dataLink+"userManage/saveOrupdate",  
				           	 type:"post",
				             data:data, 
				             dataType : "json",
					        success:function(result){
					          if(result.msg=="success"){
					        	$(".zq_lobel_choi a span").removeClass("zq_ble_resabl");
					          	$(".ul").html("");
					          	$(".Ec_bg").css("display","none");
					        		_load._data();	
					            }else{
					            _text=result.errorCode;	
					            $("#span").html(_text);
		   	  					setTimeout(function(){$("#span").html("")}, 3000);
					            }
					        },  
					        timeout:3000  
			    	 });
		   	  }
		   	  	
   	  	});
   	  }

   }
   //长度校验信息
     var _inflow={
   	    _info:function(text,minleng,maxLeng,title){
   	    	if(text!=""){
	   	    	if(text.replace(/[^\x00-\xff]/g, "**").length<minleng||text.replace(/[^\x00-\xff]/g, "**").length>maxLeng){
	   	    		return  title+"请输入"+minleng+"-"+maxLeng+"有效字符";
	   	    	}
   	    	}

   	    }
   }
   //提示信息
   var _show={
   	_info:function(_text){
   					$("#span").html(_text);
				setTimeout(function(){$("#span").html("")}, 3000);
				
   		}
   }
   
isindexget()