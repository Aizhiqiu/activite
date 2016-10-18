$(function(){
//	$(window).keydown(function(){
//		keyDown(event);
//	})
			$(".Lo_btn").click(function(){
				var _userName=$(".Lo_num").val();
				var _pwd=$(".Lo_pwd").val();
				var data={"useAccount":_userName,"pwd":_pwd};
				var _flag=_login._check();
				if(_flag){
					$.ajax({  
							url:dataLink+"userManage/login",  
				            type : "GET",
				            dataType : "json",
		            		contentType: "application/json; charset=utf-8",
				            data:data, 
					        success:function(result){
							   if(result.msg=="success"){
				                      //不是超级管理员没权限查看系统设置
				                        console.info(result);
				                      	var cruxVariable=webStorage();
				                      	cruxVariable.setItem("isAdmin",result.isAdmin);
				                      	cruxVariable.setItem("manage_user_id",result.userId);
				                      	localStorage.removeItem("scrheader");
				                      	localStorage.removeItem("scrnavleft");
				                       if(result.isAdmin==1){
				                      //页面跳转
				                    	   window.location.href="economyfit.html";
				                      }else if(result.isAdmin==2){
				                    	  window.location.href="oentstatements.html";
				                      }else{
				                      	window.location.href="index.html";
				                      }
							   }else{
								   $("#span").html(result.errorCode);
									setTimeout(function(){$("#span").html("")}, 3000);
									if(result.state==1){
											$(".Lo_num").val("");
									}else if(result.state==2){
 											$(".Lo_pwd").val("");
									}else{
									$(".Lo_num").val("");
									 $(".Lo_pwd").val("");
									}
							       return false;
							   }
					        		
					        },  
					        timeout:3000  
			    	});  
			    }
				
			});
			
			
		});
		
		
		
	function keyDown(e){ 
			 var keycode = 0;
			 //IE浏览器
			 if(CheckBrowserIsIE()){
			  keycode = event.keyCode;
			 }else{
			 //火狐浏览器
			 keycode = e.which;
			 }
			
			if (keycode == 13 ) //回车键是13
			{
			  	var _userName=$(".Lo_num").val();
				var _pwd=$(".Lo_pwd").val();
				var data={"useAccount":_userName,"pwd":_pwd};
				var _flag=_login._check();
				if(_flag){
					$.ajax({  
							url:dataLink+"userManage/login",  
				            type : "GET",
				            dataType : "json",
		            		contentType: "application/json; charset=utf-8",
				            data:data, 
					        success:function(result){
							   if(result.msg=="success"){
				                      //不是超级管理员没权限查看系统设置
				                        console.info(result);
				                      	var cruxVariable=webStorage();
				                      	cruxVariable.setItem("isAdmin",result.isAdmin);
				                      	cruxVariable.setItem("manage_user_id",result.userId);
				                      	localStorage.removeItem("scrheader");
				                      	localStorage.removeItem("scrnavleft");
				                       if(result.isAdmin==1){
				                      //页面跳转
				                    	   window.location.href="economyfit.html";
				                      }else if(result.isAdmin==2){
				                    	  window.location.href="oentstatements.html";
				                      }else{
				                      	window.location.href="index.html";
				                      }
							   }else{
								   $("#span").html(result.errorCode);
									setTimeout(function(){$("#span").html("")}, 3000);
									if(result.state==1){
											$(".Lo_num").val("");
									}else if(result.state==2){
 											$(".Lo_pwd").val("");
									}else{
									$(".Lo_num").val("");
									 $(".Lo_pwd").val("");
									}
							       return false;
							   }
					        		
					        },  
					        timeout:3000  
			    	});  
			    }
			}
			}
			//判断访问者的浏览器是否是IE
			function CheckBrowserIsIE(){
			 	var result = false;
			 	var browser = navigator.appName;
			 	if(browser == "Microsoft Internet Explorer"){
			  		result = true;
			 	}
			 	return result;
			}

//校验
var _login={
	_check:function(){
		var _flag=true;
		var _userName=$(".Lo_num").val();
		var _pwd=$(".Lo_pwd").val();
		//var patten = /^[a-zA-Z]\w{4,12}$/ig;
		//var pattern = /^[A-Za-z0-9]{6,18}$/;
		if(_userName==""||_pwd==""){
			 $(".Lo_num").val("");
			 $(".Lo_pwd").val("");
			$("#span").html("请输入正确的用户名或密码");
			setTimeout(function(){$("#span").html("")}, 3000);
			_flag=false;
			return _flag ;
		}/*else if(!patten.test(_userName) ||!pattern.test(_pwd)){
			 $(".Lo_num").val("");
			 $(".Lo_pwd").val("");
			$("#span").html('您输入的用户名/密码无效，请重新输入！');
			setTimeout(function(){$("#span").html("")}, 3000);
			_flag=false;
			return _flag ;
		}*/
		var cruxVariable=webStorage();
			cruxVariable.setItem("magae_nice_name",_userName);
		return _flag;
		
	}
}
