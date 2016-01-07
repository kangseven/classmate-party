var $ = (function() {
  return function  (childNode, parentNode) {
  //查询表达式为字符串,并且不能为空
  if (typeof(childNode) !== 'string' || childNode ==' ') {
    return [] ;
  }
  //使用空格分割
  var splitArr = childNode.split (' ') ;
  var elements = [] ;
  var idObj = null ;
  var ArrOne = splitArr[0];
  parentNode = parentNode || document;
  switch (ArrOne.charAt(0)) {
    case '#':
    //Id选择器
    idObj = document.getElementById(ArrOne.substr(1));
    if (idObj) {
      elements.push(idObj);       
    }
      break;
    case '.' :
    //类选择器
    var allElments = parentNode.getElementsByTagName('*');
    var className = ArrOne.substr(1);
    for (var i = 0; i < allElments.length; i++) {
      if(allElments[i].className.indexOf(className)>-1) {
        elements.push(allElments[i]);
      }
    }
      break;
    default:
    //根据tag获取元素
      elements = parentNode.getElementsByTagName(ArrOne);
      break;
    }
    if(splitArr.length > 1){
      var l = [];
      for(var i=0; i<elements.length; i++){
        var ll = arguments.callee(childNode.substr(splitArr[0].length+1), elements[i]);
        if(ll.tagName){
          l.push(ll);
        }
        else{
          for(var j=0; j<ll.length; j++) {
            l.push(ll[j]);
          }
        }          
      }
      elements = l;
    }
    if (splitArr.length == 1&&  idObj) {
    //当为Id选择器时,直接返回对象.
      elements = idObj;
    }
    else{
    //去除数组中重复元素
      var l = [];
      for(var i=0; i<elements.length; i++)elements[i].$isAdd = false;
      for(var i=0; i<elements.length; i++){
        if(!elements[i].$isAdd){
            elements[i].$isAdd = true;
            l.push(elements[i]);
        }
      }
      elements = l;
    } 
    return elements;
  }
})();
function getStyle(element, attr) {
  //IE
  if (element.currentStyle) {
    return element.currentStyle[attr];
  //chrom
  } 
  else {
    return getComputedStyle(element)[attr];
  }
}
function startMove(element, json,ratio,func) {
  clearInterval(element.timer);
  element.timer = setInterval(function () {
    var flag = true; //假设所有运动到达终点.
    for (var attr in json) {
    //1.取当前的属性值。
      var iCurrent = 0;
      if (attr === "opacity") { //为透明度时执行。
        iCurrent = Math.round(parseFloat(getStyle(element, attr)) * 100);
      } 
      else { //默认情况
        iCurrent = parseInt(getStyle(element, attr)); //实际样式大小
      }
      //2.算运动速度,动画缓冲效果
      var iSpeed = (json[attr] - iCurrent) / ratio; //(目标值-当前值)/缩放系数=速度
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //速度取整

      //3.未到达目标值时，执行代码 
      if (iCurrent != json[attr]) {
        flag = false; //终止条件
      }
      if (attr === "opacity") { //为透明度时，执行
        element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")"; //IE
        element.style.opacity = (iCurrent + iSpeed) / 100;
        //标准
      } else { //默认
        element.style[attr] = iCurrent + iSpeed + "px";
      }
          
      //4. 运动终止，是否回调
      if (flag) {
        clearInterval(element.timer);
        if (func) {
          func();
        }
      }
    }
  }, 30);
}
function func() {
 startMove($('.activate-title')[0],{top:40},20);
}
$('.switch-btn')[1].onclick = function() {
  startMove($('.login')[0],{left:390},2);
  startMove($('.interface-btn')[0],{right:-395},50);
  startMove($('h1')[0],{right:-425},2);
  startMove($('.activate-title')[0],{top:65},30,func);
  startMove($('.activate')[1],{top:-17,left:0},5);

}
$('.interface-btn')[0].onclick = function() {
  startMove($('.login')[0],{left:-30},5);
  startMove($('.interface-btn')[0],{right:-430},1);
  startMove($('h1')[0],{right:0},5);
  startMove($('.activate-title')[0],{top:-80},1);
  startMove($('.activate')[1],{top:600,left:-155},1);
  startMove($('#registration-page'),{top:116,left:1000},2);

}
for (var i = 0; i < $('p').length; i++) {
  $('p')[i].onclick= function() {
    startMove($('#registration-page'),{top:-500,left:440},5);
    startMove($('.activate')[1],{top:600,left:-155},1);
  }
}
$('.close-btn')[0].onclick = function() {
  startMove($('#registration-page'),{top:116,left:1000},1);
  startMove($('.activate')[1],{top:-17,left:0},5);
}



