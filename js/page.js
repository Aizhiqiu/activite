/*
    使用该分页:在分页区域加<span "id=sp"></span> 
     调用page方法传入后台返回值即可

*/
<!-- 分页 start -->

function page( page){
	 if(page.pageInfo!=""&&page.pageInfo.recordList!=null&&page.pageInfo.recordList.length>0&&page.pageInfo.pageCount>1){
        var _html='<div class="zq_paging">';
          _html+='<div class="zq_paging_centent">';
        if (page.pageInfo.beginPageIndex<=page.pageInfo.endPageIndex){

            if(page.pageInfo.currentPage > 1){
               _html+='<a  href="javascript:pageinationView('+(page.pageInfo.currentPage - 1)+')">';
               _html+='<span></span>上一页</a> <ul>';
            }

                 for(var x=page.pageInfo.beginPageIndex;x<=page.pageInfo.endPageIndex;x++){
                        if(page.pageInfo.currentPage == x){
                           _html+='<li class="currentPage_s">';
                            _html+=x+'</li>';
                        }else{
                            _html+='<li class="currentPage">';
                            _html+=x+'</li></ul>';
                        }
                 }
                if (page.pageInfo.currentPage < page.pageInfo.pageCount) {
                //html+='<div class="page_right">';
                _html+='<a class="zq_paging_toget" href="javascript:pageinationView('+(page.pageInfo.currentPage + 1)+')">下一页<span></span></a>'
                

             }
                _html+='<span class="zq_paging_number">共'+page.pageInfo.pageCount+'页&nbsp;';
                _html+="到第</span><input type='text'id='zq_paging_numberget' value='"+page.pageInfo.currentPage +"'>";
                _html+='<span class="zq_paging_numberis">页</span><input type="button" id="zq_paging_numbget" value="确定">'
                _html+='</div>  </div>';
        } 
       
     $("#sp").html(_html);
      _pageinationView._currentPage(); 
      _pageinationView._go(page.pageInfo.pageCount);
   
      
    
  }
}

  /*  //提交数据
    function pageinationView(currentPage){
        _load._data(currentPage);
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
        _load._data($(this).text());
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
       _load._data(_temp);
    });
  }
}*/


