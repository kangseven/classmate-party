/*window.onscroll = function () {
  if (document.documentElement.scrollTop + document.body.scrollTop > 300) {
      document.getElementById("top-scroll").style.display = "block";
  }
  else {
      document.getElementById("top-scroll").style.display = "none";
  }
}*/

$('#btn').onclick = function() {
  $('#join-msg').style.display ='block';
  startMove($('#join-msg'),{left:300},5);
  }
$('#buttons-cancel').onclick = function() {
  $('#join-msg').style.display ='none';
  startMove($('#join-msg'),{left:-1000},2);
}
$('#buttons-determine').onclick = function() {
  $('#join-msg').style.display ='none';
  startMove($('#join-msg'),{left:-1000},2);
  $('#box-msg').innerHTML = '恭喜你报名成功';
  $('.join-title')[0].innerHTML = '恭喜你报名成功';
  boxMsg();
}
