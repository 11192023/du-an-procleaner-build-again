$("#btnTheoNgay").click(function(){
	$(this).removeClass("btn-searchbar");
	$(this).addClass("btn-searchbar-active");
	$("#btnDaiHan").addClass("btn-searchbar");
	$("#btnDaiHan").removeClass("btn-searchbar-active");
});

$("#btnDaiHan").click(function(){
	$(this).removeClass("btn-searchbar");
	$(this).addClass("btn-searchbar-active");
	$("#btnTheoNgay").addClass("btn-searchbar");
	$("#btnTheoNgay").removeClass("btn-searchbar-active");
});