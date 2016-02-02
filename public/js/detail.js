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
  addClass($('#join-msg'),'journal');
  }
$('#buttons-cancel').onclick = function() {
  $('#join-msg').style.display ='none';
  startMove($('#join-msg'),{left:-1000},2);
}
