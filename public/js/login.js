window.onload = function() {
  function func() {
   startMove($('.seating')[0],{top:64},70);
  }
  $('#login-btn').onclick = function() {
    $('.activate')[0].style.display ='none';
    $('#register').style.display ='none';
    $('.seating')[0].style.display ='none';
    startMove($('.seating')[0],{top:-30},1);
    startMove($('.activate')[0],{top:0},1);
    startMove($('.login')[0],{left:0},7);
    startMove($('#register'),{top:0},1);
    startMove($('#class-name'),{top:-100},1);
  }
  $('#activation-btn').onclick = function() {
    $('.seating')[0].style.display ='block';
    $('.activate')[0].style.display ='block';
    $('#register').style.display ='none';
    startMove($('.seating')[0],{top:-5},40,func);
    startMove($('#class-name'),{top:0},65);
    startMove($('.activate')[0],{top:-598},8);
    startMove($('.login')[0],{left:400},3);
    startMove($('#register'),{top:0},1);
  }
  for (var i = 0; i < $('p').length; i++) {
    $('p')[i].onclick = function() {
      $('#register').style.display ='block';
      startMove($('#register'),{top:-560},5);
      document.getElementById('user-id').value = this.getAttribute('data-id');
    }
  }
}



