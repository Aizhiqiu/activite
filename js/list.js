var cruxVariable=webStorage();
var Strin=cruxVariable.getItem("String");
var StringB='&nbsp; > &nbsp;<span class="zq_list_get">报名名单</span><a class="zq_back" href="javascript:;">返回</a>';
var strign=Strin+StringB
$(".In_nav").html("");
$(".In_nav").html(strign);

//index=1;活动管里
//index=2;用户管理
//index=3;金额管理
var index=cruxVariable.getItem("index");
	managementGet(index);
//跳转到用户详情
$(".zq_list_nameone").click(function(){
	var userId=$(this).parent(".zq_manage_teble").find("span").html();
	cruxVariable.setItem("manage_user_id",userId);
	var String='<span class="zq_navtab_isone">活动管理</span>&nbsp; &gt; &nbsp;<span class="zq_navtab_isshw">已结束</span>	&nbsp; &gt; &nbsp;<span class="zq_list_get">报名名单</span>';
	cruxVariable.setItem("StringBs",String);//储存路径2,,由于冲突，改成路径2
	cruxVariable.setItem("mocent",2)
	var index=1;
	cruxVariable.setItem("index",index);
	window.location.href="userdetails.html"
})

//导出弹窗
$(".zq_mae_export_alt").click(function(){
	$(".zq_shade").show();
	$(".zq_list_export").show();
	
})
//点击取消
$(".zq_export_move").click(function(){
	$(".zq_shade").hide();
	$(".zq_list_export").hide();
	
})
isindexget();//点击nav栏

var activityId = cruxVariable.getItem("activityid");
//开始
$(function(){
	_export._excel(activityId);
	cruxVariable.setItem("_currentPage","");
	onloadInfoList();
});

function onloadInfoList(){
	var _currentPage=cruxVariable.getItem("_currentPage");
	 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
	var data={"activityId":activityId,"currentPage":_currentPage};
	$.ajax({  
        url:dataLink+"eticket/getEnrollInfo",  
        type: 'GET',
        dataType: 'json',
        data:data,
        success:function(result){
        	if(result.msg="success"){
            	var list =eval(result.pageInfo);
                page(result);
                list=list.recordList;
               if(list.length!=0){
                $(".relust").html("");
            	for(var i=0;i<list.length;i++){
            		var item=list[i];
            		var html ='<ul class="zq_list_teble clearfix">';
            		html+='<span style="display: none;"></span>';
            		html+='<li class="zq_list_number">'+(1+i)+'</li>';
            		html+='<li class="zq_list_name zq_list_nameone"><a href="javascript:load_user('+item.userId+');">'+item.applyName+'</a></li>';
                var _ticketName=item.ticketName==null||item.ticketName=="null"?"后台添加":item.ticketName;
            		html+='<li class="zq_list_names">'+_ticketName+'</li>';
               var _fee=item.ticketName==null||item.ticketName=="null"?"免费":item.fee+'元';
            		html+='<li class="zq_list_prices">'+_fee+'</li>';
                if(item.ticketName!=null&&item.ticketName!="null"){
                    if(item.payType==3){
                    html+='<li class="zq_list_paytype">全款支付</li>';    
                    }else if(item.payType==1){
                    html+='<li class="zq_list_paytype">微信支付</li>';   
                    }else{
                    html+='<li class="zq_list_paytype">支付宝支付</li>';   
                    }
                }else{
                   html+='<li class="zq_list_paytype">后台添加</li>';   
                }    
            		html+='<li class="zq_list_paydepth">';
            		html+='<div class="zq_list_depth">';
            		html+=item.payDetail;
            		html+='</div>';
            		html+='</li></ul>';
            		$(".relust").append(html);
            	}
            		$(".zq_list_title").html(result.activityTitle);
               }else{
            	   $(".zq_mae_export_alt").addClass("zq_mae_remove_altA");
					$(".zq_mae_export_alt").click(function(){
						$(".zq_shade").hide();
						$(".zq_list_export").hide();
						
					})
               }	
        	}
        },  
        timeout:3000  
		 });  
}
  //提交数据
function pageinationView(currentPage){
	cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
    onloadInfoList();
   
}

function load_user(userId){
 cruxVariable.setItem("userIdOne",userId);
 window.location.href="userdetails.html";
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
       cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
       onloadInfoList();
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
        onloadInfoList();
    });
  }
}
//导出
var _export={
  _excel:function(activityId){
    $(".zq_export_get").click(function(){
          $(".zq_shade").hide();
          $(".zq_list_export").hide();
          if(activityId!=""){
            window.location.href=dataLink+"export/excel?activityId="+activityId;
          }
    });

  }
}
