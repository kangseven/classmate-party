window.onload = function() {
  $('#login-btn').onclick = function() {
    addClass($('.login')[0],'enter-left-bounce');
    removeClass($('.activate')[0],'enter-up-bounce');
    removeClass($('#class-name'),'journal');
    removeClass($('.register')[0],'enter-up-bounce');
    startMove($('.activate')[0],{top:0},1);
    startMove($('.login')[0],{left:0},7);
    startMove($('.register')[0],{top:0},1);
    for (var j = 0; j < $('p').length; j++) {
      $('p')[j].style.backgroundColor = 'rgba(25, 122, 154, 0.85)';
    }
  }
  $('#activation-btn').onclick = function() {
    addClass($('.activate')[0],'enter-up-bounce');
    addClass($('#class-name'),'journal')
    removeClass($('.register')[0],'enter-up-bounce');
    removeClass($('.login')[0],'enter-left-bounce');
    startMove($('.activate')[0],{top:-578},8);
    startMove($('.login')[0],{left:400},3);
    startMove($('.register')[0],{top:0},1);
  }
  for (var i = 0; i < $('p').length; i++) {
    $('p')[i].onclick = function() {
      for (var j = 0; j < $('p').length; j++) {
       $('p')[j].style.backgroundColor = 'rgba(25, 122, 154, 0.85)';
      }
      this.style.backgroundColor = '#DAA520';
      addClass($('.register')[0],'enter-up-bounce');
      startMove($('.register')[0],{top:-560},5);
      document.getElementById('user-id').value = this.getAttribute('data-id');
    }
  }
}



