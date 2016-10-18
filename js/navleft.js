$(function(){
	navleftget();
	$(".zq_nav_left li").hover(function(){
		$(".zq_nav_left li").children(".zq_ingdex_detas").hide();
		$(this).children(".zq_ingdex_detas").show();
	})
	$(".zq_nav_left ul").mouseleave(function(){
		$(".zq_nav_left li").children(".zq_ingdex_detas").hide();
		$(".zq_management_Get .zq_ingdex_detas").show();
	})
})
