/**
 * 补零函数
 */
function addonZero (num, count) {
  num += '';
  while(num.length < count){
    return addonZero('0' + num, count);
  }
  return num;
}

module.exports = {
  dateFormat: function (date, format) {
    var date = new Date(date),
        year = date.getFullYear(),
        month = addonZero(date.getMonth() + 1, 2),
        day = addonZero(date.getDate(), 2),
        hours = addonZero(date.getHours(), 2),
        minutes = addonZero(date.getMinutes(), 2),
        seconds = addonZero(date.getSeconds(), 2);

    return format.replace(/yyyy/g, year)
                 .replace(/MM/g, month)
                 .replace(/dd/g, day)
                 .replace(/HH/g, hours)
                 .replace(/mm/g, minutes)
                 .replace(/ss/g, seconds)
                 .replace(/yy/g, year%100);
  }
}
