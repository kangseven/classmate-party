window.onload = function () {
	$('.acitive-img')[0].onmouseover = function () {
		startMove($('.move-text')[0],{left:245},3);
		startMove($('.line')[0],{left:183},5);
		startMove($('#shadow'),{left:-70,top:-180},3);
	}
	$('.acitive-img')[0].onmouseout = function () {
		startMove($('.move-text')[0],{left:-245},2);
		startMove($('.line')[0],{left:-210},3);
		startMove($('#shadow'),{left:570,top:200},7);
	}
};

