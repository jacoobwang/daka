var oo = document.getElementById('dateTime');
  var storage = window.localStorage,
      date = new Date(),
      now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

  var idx;    
  if(date.getMonth()+1<10){
    idx = date.getFullYear()+'-'+"0"+(date.getMonth()+1);
  }else{    
    idx = date.getFullYear()+'-'+(date.getMonth()+1)   
  }
  var month = getQueryString('t') || idx,
      t = month.split('-'),
      isSign = false,
      data = JSON.parse(storage.getItem(month)) || false,
      user = storage.getItem('user') || false;

  init();  
  
  function init(){
    $('#date').html(t[0]+'年'+t[1]+'月'); 
    setNavLink();   
    var ids = [];
    if(user == false){
      layer.open({
        type: 1
        ,content: '<div class="personInfo"><p>设置我的昵称</p><input type="text" /><a onclick="setNickname();" href="#">提交</a></div>'
        ,shadeClose: false
        ,style: 'position:fixed; bottom:42%; left:20%; width: 60%; height: 200px; padding:10px 0; border:none;'
      });
      var calendar = new Calendar(oo,ids,month);
      calendar.show();
      return false;
    }
     $('#name').html(user);
    if(data){
      $('#day_num').html(data.length);
      for(var i in data){
        ids.push(data[i].split('-')[2]);
        if(data[i] == now){
          isSign = true;
        }
      }
    }
    var calendar = new Calendar(oo,ids,month);
    calendar.show();
  } 

  function setNickname(){
    var user = $('.personInfo input').val();
    if(user.length>0){
      storage.setItem('user',user);
      layer.closeAll();
    }else{
       layer.open({
        content: '请填写昵称'
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
      });
    }
  }

  function doDakaAction(){ 
    if(isSign == true){
      layer.open({
          content: '今天已打过拉',
          btn: ['OK']
      });
      return false;
    }
    if(month != idx){
      layer.open({
          content: '请回到'+date.getFullYear()+'年'+(date.getMonth()+1)+'月打卡哦，不允许超前或滞后打卡',
          btn: ['OK']
      });
      return false;
    }
    if(data != false){
      data.push(now);
    }else{
      data = new Array(now);
    }
    storage.setItem(idx,JSON.stringify(data));
    isSign = true;
    $('.current .cell').addClass('done');
    layer.open({
        content: '打卡成功',
        btn: ['OK']
    });
    $('#day_num').html(parseInt($('#day_num').html())+1);
  }

  function setNavLink(){
    var date = formatMonth(t),
        url  = 'http://'+location.host+location.pathname;
    $('#prev').attr('href',url+'?t='+date.prev);
    $('#next').attr('href',url+'?t='+date.next);
  }

  function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  } 

  function formatMonth(t){
    t[0] = parseInt(t[0]);
    t[1] = parseInt(t[1]);
    var rs = [];
    if(t[1]-1 == 0){
      rs[0] = t[0] -1;
      rs[1] = 12;
      rs[2] = 2;
      return {
        prev : rs[1]<10 ? (rs[0] +'-0'+ rs[1]): (rs[0] +'-'+ rs[1]),
        next : rs[2]<10 ? (t[0] +'-0'+ rs[2]) : (t[0] +'-'+ rs[2])
      }
    }
    if(t[1]+1 > 12){
      rs[0] = t[0] +1;
      rs[1] = 1;
      rs[2] = 11;
      return {
        prev : rs[2]<10 ? (t[0] +'-0'+ rs[2]) : (t[0] +'-'+ rs[2]),
        next : rs[1]<10 ? (rs[0] +'-0'+ rs[1]) : (rs[0] +'-'+ rs[1])
      }
    }
    else{
      rs[0] = t[0];
      rs[1] = t[1]-1;
      rs[2] = t[1]+1; 
    }
    return {
      prev : rs[1]<10 ? (rs[0] +'-0'+ rs[1]) : (rs[0] +'-'+ rs[1]),
      next : rs[2]<10 ? (rs[0] +'-0'+ rs[2]) : (rs[0] +'-'+ rs[2])
    }
  }
