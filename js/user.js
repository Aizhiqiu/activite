var cruxVariable=webStorage();


//管理跳转
isindexget();

window.onload=function(){
	var H = document.documentElement.clientHeight;
	var quanbei=document.getElementById("personal_bg");
	quanbei.style.height=H+"px";
};


//跳转到用户详情
$(".zq_choice_nameone").click(function(){
	var userId=$(this).parent(".zq_over_teble").find("span").html();
	cruxVariable.setItem("manage_user_id",userId);
	var String='<span class="zq_user">用户管理</span>&nbsp; > &nbsp;<span class="zq_user">用户列表</span>';
	cruxVariable.setItem("StringBs",String);//储存路径2,,由于冲突，改成路径2
	cruxVariable.setItem("mocent",2)
	var index=2;
	cruxVariable.setItem("index",index);
	window.location.href="userdetails.html"
})
//导出弹窗
$(".zq_mae_export_alt").click(function(){
		var arrList = new Array();
		  $(".zq_mae_clicktwo").each(function(i){
			var useridOne=$(this).parent(".zq_choice_is").parent(".zq_over_teble").find("span").html();
			arrList.push(useridOne);
		    })
	$("#idString").val(arrList);
	$(".zq_shade").show();
	$(".zq_list_export").show();
	
})
//删除弹窗
$(".zq_mae_remove_alt").click(function(){
	if($(".zq_mae_clicktwo").length<1){
		return false;
	}
	var arrList = new Array();
  $(".zq_mae_clicktwo").each(function(i){
	var useridOne=$(this).parent(".zq_choice_is").parent(".zq_over_teble").find("span").html();
	arrList.push(useridOne);
    })
	$(".zq_shade").show();
	$(".zq_list_remove").show();
//	console.log(arrList)
	$("#idString").val(arrList);
})

//点击取消
$(".zq_export_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_list_export").hide();
	$(".zq_lobel_torest").hide();
	$(".zq_list_remove").hide();
	
})
//打标签弹窗
$(".zq_lobel_get").click(function(){
	var userId=$(this).parent(".zq_over_teble").find("span").html();
	cruxVariable.setItem("manage_user_id",userId);
	$(".zq_shade").show();
	$(".zq_lobel_torest").show();
	
})
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
	//管理活动下--管理报名
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
	$(".zq_mae_click").click(function(){//选择
		$(this).toggleClass("zq_mae_clicktwo");
		var isA=$(".zq_mae_click").length;
		var isB=$(".zq_mae_clicktwo").length;

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
	
//	打标签点击事件
$(".zq_lobel_choi a").click(function(){
	$(this).find("span").toggleClass("zq_ble_resabl");
});




//遍历函数
var arrList = new Array();

  $(".zq_mae_clicktwo").each(function(i){
	var useridOne=$(this).parent(".zq_over_teble").find("span").html();
	arrList.push(useridOne);

    })




//我是华丽丽的分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

initMagAll("");

/**
 * 首页列表
 * @param pageNum
 * @param numPerPage
 */
 var _pageCount="";
function initMagAll(str){
	var nice = $.trim($("#zq_search_name").val());
	var tel  =$.trim($("#zq_search_tle").val());
	var _currentPage=cruxVariable.getItem("_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	 if("search"==str){
	 	_currentPage=1;
	 }
	var data = {"currentPage":_currentPage};
	
	if(nice!="" && nice!=null && nice!=undefined && nice!="undefined"){
	     data = {"currentPage":_currentPage,"nice":nice};
	}
	if(tel!="" && tel!=null && tel!=undefined && tel!="undefined"){
	     data = {"currentPage":_currentPage,"tel":tel};
	}
	if(nice!="" && nice!=null && nice!=undefined && nice!="undefined" && tel!="" && tel!=null && tel!=undefined && tel!="undefined"){
		 data = {"currentPage":_currentPage,"nice":nice,"tel":tel};
	}
		 $.ajax({
			 type : "post",
             url:dataLink+"user/getUserAll", 
             data:data, 
             dataType : "json",
             success : function(json){
            	 $(".reslut").empty();
            	if(json.msg=="success"){
		//		console.log(json.pageInfo.recordList);
            	 if(json.pageInfo.recordList.length!=0){
            	 	 $(".User_text").html("");
            	 	 $(".zq_mae_export_alt").removeClass("zq_mae_remove_altA");
						$(".zq_mae_export_alt").click(function(){
							$(".zq_shade").show();
							$(".zq_list_export").show();
							
						})

						
            			_pageCount=json.pageInfo.pageCount
            		 //var list = json.msgList;
            		   var list=eval(json.pageInfo);
            		    
            		     list=list.recordList;
            		     $("#sp").html("");
            		     if(list.length>0){
            		     	page(json);

            		     }/*else{
            		     	
            		     }*/
             		for(i=0;i<list.length;i++){
             			var item = list[i];
             			  var j = i*1+1;
             			 var date = ThisTime(0,item.ctime);
             			 
             			 var label ="";
             			 if(item.labelList.length==0){
             				 label = "普通用户";
             			 }else{
             				 for(s=0;s<item.labelList.length;s++){
             					label += item.labelList[s].labelName+" ";
             				 }
             			 }
             			  var nice = item.nice ;
              	    	 if(nice!="" && nice!=null && nice!=undefined && nice!="undefined" && nice!=" " ){
              				 nice =item.nice;
              			 }else{
 						  nice ="<span>企信用户</span>";
 						 }
              			 
              	  	  var tel = item.tel ;
           	    	  if(tel!="" && tel!=null && tel!=undefined && tel!="undefined"&& tel!=" " ){
           	    		tel =item.tel;
           			   }else{
           				 tel ="<span>&nbsp;</span>";
           			   }
             			 var  html = "<ul class='zq_over_teble clearfix'>  <span style='display: none;'>"+item.id+"</span>";
             			      html += "<li class='zq_choice_is'><a class='zq_mae_click' href='javascript:;'></a></li>";
             			      html += "<li class='zq_choice_number'>"+j+"</li>  <li class='zq_choice_name zq_choice_nameone'>"+nice+"</li>";
             			      html += "  <li class='zq_choice_momber'>"+tel+"</li>";
             			      html += "<li class='zq_choice_lobel zq_lobel_get'> <span style='display: none;'>"+JSON.stringify(item.labelList)+"</span>"+label+"</li>  <li class='zq_choice_time'>"+date+"</li></ul>";
             			    
             			 $(".reslut").append(html);
             			
             		}
					//管理活动下--管理报名
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
				
            		$(".zq_mae_click").click(function(){//选择
						$(this).toggleClass("zq_mae_clicktwo");
						var isA=$(".zq_mae_click").length;
						var isB=$(".zq_mae_clicktwo").length;
						if (isA==isB) {
							$(".zq_choice_get").addClass("zq_choice_gettow");
						}else{
							$(".zq_choice_get").removeClass("zq_choice_gettow");
						}
						$(".zq_choice_fewer").html("已选择"+isB+"人")
						if(isB<1){
							$(".zq_choice_get").removeClass("zq_choice_gettow");
							$(".zq_mae_removeone").addClass("zq_mae_remove_altA");
							$(".zq_mae_remove_alt").click(function(){
								return false;
							})
						}else{
							$(".zq_mae_removeone").removeClass("zq_mae_remove_altA");
						}
					});

					
					//跳转到用户详情
					$(".zq_choice_nameone").click(function(){
						var userIdOne=$(this).parent(".zq_over_teble").find("span").html();
						cruxVariable.setItem("userIdOne",userIdOne);
						var String='<span class="zq_user">用户管理</span>&nbsp; > &nbsp;<span class="zq_user">用户列表</span>';
						cruxVariable.setItem("StringBs",String);//储存路径2,,由于冲突，改成路径2
						cruxVariable.setItem("mocent",2)
						var index=2;
						cruxVariable.setItem("index",index);
						window.location.href="userdetails.html"
					});
					
					//打标签弹窗
					$(".zq_lobel_get").click(function(){
						var userIdOne=$(this).parent(".zq_over_teble").find("span").html();
						cruxVariable.setItem("userIdOne",userIdOne);
						$(".zq_shade").show();
						$(".zq_lobel_torest").show();
					    var labelString =	$(this).find("span").html();
					    var labelJson = JSON.parse(labelString);
						$("#1").removeClass();
						$("#2").removeClass();
						for(var i=0;i<labelJson.length;i++){
							var item=labelJson[i];
							if(item.labelId==1){//主讲人
    								$("#1").toggleClass("zq_ble_resabl");

							}else if(item.labelId==2){//组织者
								    $("#2").toggleClass("zq_ble_resabl");
							}
						}
					
					});

            		}else{
            			if("search"!=str){
            			 	_del._loadDate(_pageCount);
            			 }
            			 $(".zq_mae_export_alt").addClass("zq_mae_remove_altA");
						$(".zq_mae_export_alt").click(function(){
							$(".zq_shade").hide();
							$(".zq_list_export").hide();
							
						})
						$(".zq_mae_remove_alt").addClass("zq_mae_remove_altA");
            			$("#sp").html("");
            			$(".zq_choice_get").removeClass("zq_choice_gettow");
            			$(".zq_choice_fewer").html("已选择0人")
            			 $(".User_text").html("用户不存在！");
						  $("#zq_search_name").val("");
            		     $("#zq_search_tle").val("");
            			setTimeout(function(){$(".User_text").html("")}, 3000);
            		}
            		
				}

             }
			 
		 });
		 
	}

/**
 * 删除
 */
function deleteUser(){
	var id =$("#idString").val();
	 var _currentPage=$("#indexpage").html();
		_currentPage==""?1:_currentPage;
	if(id != "" && id !=null && id !="undefined" && id != undefined){
		
		var data = {"idString":id}
		$.ajax({
			 type : "get",
	         url:dataLink+"user/deleteUserById", 
	         data:data, 
	         dataType : "json",
	         success : function(json){
	        	 
	        	 if(json.msg=="success"){
	        		 $(".zq_shade").hide();
	        		 $(".zq_list_remove").hide();
					 $("#personal_bg").show().fadeOut(500);
					 initMagAll("");
	        	 }
	        	 
	         }
		 });
		
	}else{
		
		
	}
	
	
}


/**
 * 我是打标签啊哈哈哈哈   
 */
function insertLabelUser(){
	
	var userId = cruxVariable.getItem("userIdOne");
	var arrList = new Array();

	  $(".zq_ble_resabl").each(function(i){
		
		  var id =  $(this).attr("id");
	    	 arrList.push(id);

	    })
     //  JSONArray jsonArray=JSONArray.fromObject(arrList);
		var json='"userId":"'+userId+'"';
		 var data ='{'+json+',"ids":'+'['+arrList+']'+'}';
//		 console.log(data);
	    $.ajax({
			 type : "post",
	         url:dataLink+"user/insertLabelUser", 
	         data:data, 
	         dataType : "json",
			 contentType: "application/json; charset=utf-8",
	         success : function(json){
	        	 
	        	 if(json.msg=="success"){
					
	        		 $(".zq_shade").hide();
					 $(".zq_lobel_torest").hide();
					  $("#personal_bg").show().fadeOut(500);

	        	     initMagAll();
	        	 }
	         }
		 });
	
}

$(function(){
	_export._excel();
});

//导出
var _export={
	_excel:function(){
		$(".zq_export_get_s").click(function(){
			$(".zq_shade").hide();
			$(".zq_list_export").hide();
			$(".zq_lobel_torest").hide();
			$(".zq_list_remove").hide();
			var id =$("#idString").val();
			if(id != "" && id !=null && id !="undefined" && id != undefined){
			window.location.href=dataLink+"user/export?ids="+id;
			}else{
					window.location.href=dataLink+"user/export?ids=";
			}
		});
	}
}






    //提交数据
 function pageinationView(currentPage){
 	  $("#indexpage").html(currentPage);
 	  cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
       initMagAll("");
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
    	  $("#indexpage").html($(this).text());
    	   cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
        initMagAll("");
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
       
        cruxVariable.setItem("_currentPage",_temp==""?1:_temp);
        initMagAll("");
       $("#indexpage").html(_temp);
    });
  }
}


var  _del={
	_loadDate:function(pageCount){
		if(pageCount>=2){
			cruxVariable.setItem("_currentPage",pageCount-1);
		 	initMagAll("");
		} 
		
	}
}