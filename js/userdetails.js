var cruxVariable=webStorage();

var Strin=cruxVariable.getItem("String");

var StringBs=cruxVariable.getItem("StringBs");
if(StringBs!==null&&StringBs!=="null"&&StringBs!==undefined&&StringBs!=="undefined"&&StringBs!==""){
	Strin=StringBs;
}
var StringB='&nbsp; > &nbsp;<span class="zq_userdetails">用户详情</span><a class="zq_back" href="javascript:;">返回</a>';
var strign=Strin+StringB
$(".In_nav").html("");
$(".In_nav").html(strign);


var userId = cruxVariable.getItem("userIdOne");

isindexget();


//我是华丽丽的分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


getUserInfoAlla();
getActivityInfoByUser("")
//个人信息
function getUserInfoAlla(){
	
	var data = {"userId":userId};
	
	 $.ajax({
		type : "get",
        url:dataLink+"user/getUserInfoAll", 
        data:data, 
        dataType : "json",
        success : function(json){
        	//console.log(json);
        var	basicInfo = json.basicInfo;     //用户详情
        var	accountInfo = json.accountInfo; //银行账户and 支付宝   if cardType == 1 银行账户，if == 2  支付宝
        var label = "";

        if(basicInfo.labelList=="null" || basicInfo.labelList==null){
			 label = "普通用户";
		 }else{
			 for(s=0;s<basicInfo.labelList.length;s++){
				label += basicInfo.labelList[s].labelName+" ";
			 }
		 }
        
      /*  var headUrl =basicInfo.headUrl ;
        
        if(headUrl.indexOf("wx")>0){
			headUrl =headUrl;
		}else{
			headUrl =imageHeadSrc+headUrl;
		}*/
        var headUrl =isallimg("img/main06-1.png",basicInfo.headUrl);

        
        $(".Us_basic_photo").html("<img src="+headUrl+"/>");
        $("#name").html(basicInfo.nice);
        $("#tel").html(basicInfo.tel);
        $(".Us_name").html(label);
        if(accountInfo!=null){
        	
        	if(accountInfo.cardType==1){
				
          	  $("#band").html(accountInfo.bankCard);
          	  $("#bandName").html(accountInfo.userAccount);
          	//  $("#bandCity").html(accountInfo.userAccount);
          	  $("#branch").html(accountInfo.bankOfDeposit);
			//  $(".User_title").css("display","block");
		    //  $(".User_telBake").css("display","none");
			  $(".Us_alipay").css("display","none");
          }else if(accountInfo.cardType==2){
        	  $("#ipayAccount").html(accountInfo.cardNumber);
        	  $("#ipayName").html(accountInfo.userAccount);
			  $(".User_alipay_inner").css("display","none");
          }
        	
        }else{
		
		$(".User_title").css("display","block");
		$(".User_telBake").css("display","none");
		$(".User_alipay_inner").css("display","none");
		}


        
        }
	 });
	
	
}


//历史活动
function getActivityInfoByUser(currentPage){
	  var _currentPage=currentPage==""?1:currentPage;
	var  data = {"currentPage":_currentPage,"userId":userId}
	
	 $.ajax({
			type : "post",
	        url:dataLink+"user/getActivityInfoByUser", 
	        data:data, 
	        dataType : "json",
	        success : function(json){
	        	if(json.msg=="success"){
	        		
	        	//	console.log(json);
		        	
	        		 var _list=eval(json.pageInfo);
				   	     page(json);
				   	     _list=_list.recordList;
	        		
	        		$(".Us_allot_All").empty();
	        		var date = new Date(); 
	        		var time = date.getTime();
	        		
					for(i=0;i<_list.length;i++){
						var item =_list[i];
						var a = "活动状态";
						var typeVar=item.typeVar.match(/./g); 
						var label="";
						var endTime   = item.endTime;
						var startTime = item.startTime;
						var typeTime = "";
						var isPreview = item.isPreview;
						
						 if(time<endTime){
							 typeTime = "未举行";
							 if(isPreview==5){
								 typeTime = "已举行";
							 }
						 }else{
							 typeTime = "已举行";
						 }
						 
            				 for(s=0;s<typeVar.length;s++){
            					 
            					 if(typeVar[s]==0){
            						 label += "授课者  ";
            					 }else if(typeVar[s]==1){
            						 label += "组织者  ";
            					 }else if(typeVar[s]==3){
            						 label += "普通用户  ";
            					 }
            					 
            				 }
            				 
            				 
            				 var title = item.title ;
                 	    	 if(title!="" && title!=null && title!=undefined && title!="undefined"){
                 	    		title =item.title;
                 			 }else{
                 				title ="&nbsp;";
    						 }
						
						var  html ="<li class='Us_allot_first'>"+typeTime+"</li>  <li class='Us_allot_next'>"+title+"</li>"
				                  +"<li class='Us_allot_last' title='"+label+"'>"+label+"</li>";
						
						 $(".Us_allot_All").append(html);
					}
	        		
	        	}
	        	
	        }
	 });
	
	
}
    //提交数据
    function pageinationView(currentPage){
       // _load._data(currentPage);
	   getActivityInfoByUser(currentPage);
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
       // _load._data($(this).text());
	    getActivityInfoByUser($(this).text());
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
          return;
        }  
       //_load._data(_temp);
	   getActivityInfoByUser(_temp);
    });
  }
}


















