var cruxVariable=webStorage();
isindexget()
 
//page   //点击什么进去收益 1==授课者  2==组织者  3==邀请者

	//跳转收益详情
		function onclickget(page,userIdLectures){
		cruxVariable.setItem("userIdLectures",userIdLectures);
		var activityId=$("#come").html();
		cruxVariable.setItem("activityId",activityId);
		var String=$(".In_nav").html();
		cruxVariable.setItem("page",page);
		window.location.href="lucredetail.html"
	
		};



		$(function(){
			cruxVariable.setItem("_currentPage","");
			userAll();
			
		});
		function userAll(){
			$(".Lu_income").html("");
			var activityId= cruxVariable.getItem("activityId");
			var _currentPage=cruxVariable.getItem("_currentPage");
			 _currentPage=_currentPage==""||_currentPage==null?1:_currentPage;
			var data={"activityId":activityId,"currentPage":_currentPage};
			$.ajax({  
		        url:dataLink+"profit/getRevenueDetails",  
		        type: 'GET',
		        dataType: 'json',
		        data:data,
		        success:function(result){
		        	if(result.msg="success"){
						
		            	var list=result.pageInfo;
							  list=list.recordList;
							  page(result);
		            	var title = result.title;
		            	$(".zq_centent h1").html(title);
		            	for(var i=0;i<list.length;i++){
		            		var item=list[i];
		            		var html = '<ul class="Lu_table clearfix">';
							html+='<span style="display: none;" id="come">'+activityId+'</span>';
							html+='<span style="display: none;" id="user">'+item.userId+'</span>';
		            		html+='<li class="Lu_num">'+(i+1)+'</li>';
							if(item.userName ==null){
								html+='<li class="Lu_name">'+""+'</li>';
							}else{
								html+='<li class="Lu_name">'+item.userName+'</li>';
							}
		            		
		            		html+='<li class="Lu_vip">'+item.fee+'元</li>';
		            		html+='<li class="Lu_oney_one">'+item.teachFee+'元</li>';
							html+='<li class="Lu_money"><span>'+item.ngoFee+'</span>元</li>';
		            		html+='<li class="Lu_oney_two">'+item.shareFee+'元</li>';
		            		html+='</ul>';
		            		$(".Lu_income").append(html);
		            		//授课者收益
							$(".Lu_oney_one").click(function(){
							  var userIdLectures=$(this).parent().find("#user").html();
								onclickget(1,userIdLectures)
							});
								  //组织者收益
							$(".Lu_money").click(function(){
								var userIdLectures=$(this).parent().find("#user").html();
								onclickget(2,userIdLectures)
							});
							  //邀请者收益
							$(".Lu_oney_two").click(function(){
								var userIdLectures=$(this).parent().find("#user").html();
								onclickget(3,userIdLectures)
							});						 
							
		            	}
		            	
		        	}
		        },  
		        timeout:3000  

				 });  
			
		};





		 //提交数据
    function pageinationView(currentPage){
        //_load._data(currentPage);
		cruxVariable.setItem("_currentPage",currentPage==""?1:currentPage);
		userAll()
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
        //_load._data($(this).text());
		cruxVariable.setItem("_currentPage",$(this).text()==""?1:$(this).text());
		userAll()
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
      userAll()
    });
  }
}