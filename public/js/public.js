/*定义选择器*/
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
/*运动函数*/
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
/*全局提示框*/
function boxMsg() {
  if($('#box-msg').innerHTML) {
    $('#box-msg').style.display = 'block';
    $('#box-bg').style.display = 'block';
    setTimeout("document.body.removeChild($('#box-msg'))",2000)
    setTimeout("document.body.removeChild($('#box-bg'))",2000)
  }
};
boxMsg();



