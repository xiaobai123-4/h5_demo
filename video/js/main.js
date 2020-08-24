// 功能：创建程序使用全局变量,创建弹幕对象并且调用其相关方法,控制程序流程
// 创建全局变量
// 视频
var v3
// 发送消息
var msg;
// 画布
var c3;
// 画笔
var ctx;
// 画布长宽
var canWidth;
var canHeight;
//颜色
var color;
//大小
var font;
//创建几个变量保存输入框
var inputMsg;//输入框
var inputBtn;//发送按钮
var inputPlay;//播放按钮
// 创建入口函数game
function game(){
  init();
  gameloop();
}
// 创建初始化全局变量函数init45
function init(){
  // 赋值画布元素
  c3=document.getElementById("c3");
  // 赋值画笔对象
  ctx=c3.getContext("2d");
  // 赋值画布宽高
  canWidth=c3.width;
  canHeight=c3.height;
  //赋值颜色大小
  color=["#fff","red","yellow","blue","#000"];
  font=["34px","36px"];
  // 创建弹幕对象
  msg=new MsgObj();
  //为输入内容赋值
  inputMsg=document.getElementById("inputMsg");
  inputBtn=document.getElementById("inputBtn");
  inputPlay=document.getElementById("inputPlay");
  v3=document.getElementById("v3")
  // 绑定点击事件
  inputBtn.addEventListener("click",handleMsg);
  inputPlay.addEventListener("click",video);
  // 调用弹幕对象init方法
  msg.init();
}
// 创建定时器循环调用函数gameloop
function gameloop(){
  // 创建定时器调用gameloop
  requestAnimationFrame(gameloop);
  // 调用弹幕对象draw方法
  msg.draw();
}
// 网页内容加载完成调用入口函数game
document.body.onload=game;
//创建函数处理按钮点击事件
function handleMsg(){
  // 功能：获取用户输入文字并封装发送弹幕对象
  // 用户输入文字
  var m=inputMsg.value;
  var c=color[Math.floor(Math.random()*color.length)];
  var f=font[Math.floor(Math.random()*font.length)];
  var obj={m,c,f};
  msg.add(obj);
}
function video(){
  if(v3.paused){
    v3.play();
    inputPlay.value="暂停";
  }else{
    v3.pause();
    inputPlay.value="播放";
  }
}