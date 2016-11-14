<!--
/**
 * Calendar
 * @param   language            0(zh_cn)|1(en_us)|2(en_en)|3(zh_tw)
 * @param   patternDelimiter    "-"
 * @param   date2StringPattern  "yyyy-MM-dd"
 * @param   string2DatePattern  "ymd"
 * NOTE!    you can use it free, but keep the copyright please
 * IMPORTANT:you must include this script file inner html body elment 
 */
function Calendar(container,selected,time, language, patternDelimiter, date2StringPattern, string2DatePattern) {
	this.language  = language  || 1;
	this.patternDelimiter = patternDelimiter     || "-";
	this.date2StringPattern = date2StringPattern || Calendar.language["date2StringPattern"][this.language].replace(/\-/g, this.patternDelimiter);
	this.string2DatePattern = string2DatePattern || Calendar.language["string2DatePattern"][this.language];
	
	this.dateControl = null;
	this.div = container;
	this.selected = selected;
	
	this.date = new Date(time);
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
};

Calendar.language = {
	"year"   : ["\u5e74", "", "", "\u5e74"],
	"months" : [
				["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],
				["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
				["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
				["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"]
				],
	"weeks"  : [["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],
				["Sun","Mon","Tur","Wed","Thu","Fri","Sat"],
				["Sun","Mon","Tur","Wed","Thu","Fri","Sat"],
				["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"]
		],
	"clear"  : ["\u6e05\u7a7a", "Clear", "Clear", "\u6e05\u7a7a"],
	"today"  : ["\u4eca\u5929", "Today", "Today", "\u4eca\u5929"],
	"close"  : ["\u5173\u95ed", "Close", "Close", "\u95dc\u9589"],
	"date2StringPattern" : ["yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd"],
	"string2DatePattern" : ["ymd","ymd", "ymd", "ymd"]
};

Calendar.prototype.draw = function() {
	calendar = this;
	
	var _cs = [];
	_cs[_cs.length] = '<table id="__calendarTable" border="0" cellpadding="0" cellspacing="0" class="month">';
	_cs[_cs.length] = ' <tr>';
	var thClass = ['sun','mon','tue','wed','thu','fri','sat'];
	for(var i = 0; i < 7; i++) {
		_cs[_cs.length] = '<th class="'+thClass[i]+'">';
		_cs[_cs.length] = Calendar.language["weeks"][this.language][i];
		_cs[_cs.length] = '<\/th>';	
	}
	_cs[_cs.length] = '<\/tr>';
	for(var i = 0; i < 5; i++){
		_cs[_cs.length] = '<tr align="center">';
		for(var j = 0; j < 7; j++) {
			_cs[_cs.length] = '<td class="'+thClass[j]+'">&nbsp;<\/td>';
		}
		_cs[_cs.length] = '<\/tr>';
	}
	_cs[_cs.length] = '<\/table>';
	
	this.div.innerHTML = _cs.join("");
	
};

Calendar.prototype.bindData = function () {
	var calendar = this;
	var dateArray = this.getMonthViewDateArray(this.date.getFullYear(), this.date.getMonth());
	var tds = this.getElementsByTagName("td", this.getElementById("__calendarTable"));
	for(var i = 0; i < tds.length; i++) {
		tds[i].onclick = null;
		tds[i].onmouseover = null;
		tds[i].onmouseout = null;
		if(dateArray[i] == undefined){
			tds[i].innerHTML = '<div class="cell undo"></div>' || "&nbsp;";
		}else{
			tds[i].innerHTML = '<div class="cell">'+dateArray[i]+'</div>' || "&nbsp;";
		}
		if (i > dateArray.length - 1) continue;
		if (dateArray[i]){
			//设置已打卡日期
			for(var j in this.selected){
				if(this.selected[j] == dateArray[i]){
					tds[i].innerHTML = '<div class="cell done">'+dateArray[i]+'</div>' || "&nbsp;";
				}
			}
			//设置标记
			var today = new Date();
			if (today.getFullYear() == calendar.date.getFullYear()) {
				if (today.getMonth() == calendar.date.getMonth()) {
					if (today.getDate() == dateArray[i]) {
						$(tds[i]).addClass('current');
					}
				}
			}
		}//end if
	}//end for
};

Calendar.prototype.getMonthViewDateArray = function (y, m) {
        console.log(y);
        console.log(m);
	var dateArray = new Array(42);
	var dayOfFirstDate = new Date(y, m, 1).getDay();
	var dateCountOfMonth = new Date(y, m + 1, 0).getDate();
	for (var i = 0; i < dateCountOfMonth; i++) {
		dateArray[i + dayOfFirstDate] = i + 1;
	}
	return dateArray;
};

Calendar.prototype.show = function (dateControl, popuControl) {
	this.draw();
	this.bindData();
};

Calendar.prototype.getElementById = function(id, object){
	object = object || document;
	return document.getElementById ? object.getElementById(id) : document.all(id);
};

Calendar.prototype.getElementsByTagName = function(tagName, object){
	object = object || document;
	return document.getElementsByTagName ? object.getElementsByTagName(tagName) : document.all.tags(tagName);
};


/**
 * @param   d the delimiter
 * @param   p the pattern of your date
 * @author  meizz
 * @author  kimsoft add w+ pattern
 */
Date.prototype.format = function(style) {
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(),      //day
		"h+" : this.getHours(),     //hour
		"m+" : this.getMinutes(),   //minute
		"s+" : this.getSeconds(),   //second
		"w+" : "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(this.getDay()),   //week
		"q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S"  : this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(style)) {
		style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if (new RegExp("("+ k +")").test(style)){
			style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return style;
};

/**
 * @param d the delimiter
 * @param p the pattern of your date
 * @rebuilder kimsoft
 * @version build 2006.12.15
 */
String.prototype.toDate = function(delimiter, pattern) {
	delimiter = delimiter || "-";
	pattern = pattern || "ymd";
	var a = this.split(delimiter);
	var y = parseInt(a[pattern.indexOf("y")], 10);
	//remember to change this next century ;)
	if(y.toString().length <= 2) y += 2000;
	if(isNaN(y)) y = new Date().getFullYear();
	var m = parseInt(a[pattern.indexOf("m")], 10) - 1;
	var d = parseInt(a[pattern.indexOf("d")], 10);
	if(isNaN(d)) d = 1;
	return new Date(y, m, d);
};
//-->
