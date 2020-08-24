console.log("main.js调用")
// 创建全局变量
// 创建四个变量画布画笔
var can1;
var can2;
var ctx1;
var ctx2;
// 创建两个变量画布宽度和高度
var canWidth;
var canHeight;
// 创建一个变量画布背景
var bgPic;
// 海葵
var ane;
// 鱼
var mom;
// 鼠标位置
var mx = 0;
var my = 0;
// 创建一个保存食物对象
var fruit;
// 创建分数
var data;
// 创建函数game 入口函数
function game() {
  init();
  gameloop();
}
// 创建函数init 初始化函数：为全局变量第一次赋值
function init() {
  // 画笔
  can1 = document.getElementById("canvas1");
  can2 = document.getElementById("canvas2");
  ctx1 = can1.getContext("2d");
  ctx2 = can2.getContext("2d");
  // 画布宽高
  canWidth = can1.width;
  canHeight = can1.height;
  // 创建图片对象并且下载图片
  bgPic = new Image();
  bgPic.src = "src/background.jpg";
  // 创建海葵对象并且调用初始化方法
  ane = new AneObj();
  ane.init();
  // 创建大鱼对象并且调用初始化方法
  mom = new MomObj();
  mom.init();
  // 为画布绑定鼠标移动事件
  can1.onmousemove = function (e) {
    mx = e.offsetX;
    my = e.offsetY;
    // console.log(mx,my)
  }
  // 创建食物对象并且调用初始化方法
  fruit = new FruitObj();
  fruit.init();
  //创建分数对象并且调用初始化方法
  data=new DataObj();
}
// 创建函数 gameloop 创建智能定时器完成绘制元素功能
function gameloop() {
  requestAnimationFrame(gameloop);
  ctx2.drawImage(bgPic, 0, 0)
  // 绘制多个海葵
  ane.draw();
  // 清除画布内容
  ctx1.clearRect(0, 0, canWidth, canHeight)
  // 完成大鱼与食物碰撞检测
  collision()
  // 绘制大鱼对象
  mom.draw();
  // 绘制食物
  fruit.draw();
  //绘制分数对象
  data.draw();
}
// 网页加载成功后调用
  document.body.onload = game


// 海葵
// 创建海葵构造函数
var AneObj = function () {
  this.rootX = [];//海葵起点坐标x
  this.headX = [];//海葵终点坐标x y
  this.headY = [];
  this.amp = [];//海葵摆动幅度
  this.alpha = 0;//保存函数计算结果
}
// 为海葵构造函数添加属性num 表示海葵数量
AneObj.prototype.num = 50;
// 为海葵构造海曙添加方法init 第一次为海葵赋值
AneObj.prototype.init = function () {
  for (var i = 0; i < this.num; i++) {
    this.rootX[i] = i * 16 + Math.random() * 20;
    this.headX[i] = this.rootX[i];
    this.headY[i] = canHeight - 200 + Math.random() * 50;
    this.amp[i] = 20 + Math.random() * 20;//摆动幅度
  }
}
// 为海葵构造函数添加方法draw 根据海葵数据绘制海葵图形
AneObj.prototype.draw = function () {
  // 海葵摆动速度
  this.alpha += 12 * 0.004;
  var p = Math.sin(this.alpha)
  // 保存画笔状态
  ctx2.save();
  ctx2.strokeStyle = "rgb(130, 238, 23)";//海葵颜色
  ctx2.globalAlpha = 0.5;
  ctx2.lineWidth = 20;//边线宽度
  ctx2.lineCap = "round";//为画笔设置线段顶端样式
  // 创建循环遍历所有海葵
  for (var i = 0; i < this.num; i++) {
    // 开始一条新路径
    ctx2.beginPath();
    ctx2.moveTo(this.rootX[i], canHeight);
    this.headX[i] = this.rootX[i] + p * this.amp[i];
    // 绘制贝塞尔曲线
    ctx2.quadraticCurveTo(
      this.rootX[i], canHeight - 100,
      this.headX[i], this.headY[i]);
    // 描边
    ctx2.stroke();
  }
  // 恢复画笔状态
  ctx2.restore();
}
// 大鱼
// 创建大鱼构造函数MomObj
var MomObj = function () {
  this.x;
  this.y;
  this.angle;
  this.bigEye = [];
  this.bigBody = [];
  this.bigTail = [];

  this.bigEyeOn = 0; //眼睛图片下标 0睁 1闭
  this.bigEyeStart = 0;
  this.bigEyeEnd = 1000;
}
//2:为大鱼构造函数添加初始化方法init
MomObj.prototype.init = function () {
  //大鱼初始化在画布中间
  this.x = canWidth * 0.5;
  this.y = canHeight * 0.5;
  //大鱼角度0
  this.angle = 0;
  //创建循环创建大鱼眼睛图片
  //src/bigEye0.png  bigEye1.png
  for (var i = 0; i < 2; i++) {
    this.bigEye[i] = new Image();
    this.bigEye[i].src = `src/bigEye${i}.png`;
  }
  //创建循环创建大鱼身体图片 
  //src/bigSwim0.png ... bigSwim7.png
  for (var i = 0; i < 8; i++) {
    this.bigBody[i] = new Image();
    this.bigBody[i].src = `src/bigSwim${i}.png`;
  }
  //创建循环创建大鱼尾巴图片
  for (var i = 0; i < 8; i++) {
    this.bigTail[i] = new Image();
    this.bigTail[i].src = `src/bigTail${i}.png`;
  }
}
//3:为大鱼构造函数添加绘制方法  draw
MomObj.prototype.draw = function () {
  //3.1:为大鱼指定位置
  this.x = lerpDistance(mx, this.x, 0.95);
  this.y = lerpDistance(my, this.y, 0.95);
  //3.2:为大鱼指定角度
  // this.angle = 0;
  // 修改大鱼角度公式
  // 获取大鱼与鼠标的位置差
  var deltaX = mx - this.x;
  var deltaY = my - this.y;
  // 利用位置差计算角度
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;
  // 修改大鱼角度慢慢向鼠标靠近
  this.angle = lerpAngle(beta, this.angle, 0.9)

  // 大鱼眼睛活动
  // 累加大鱼眼睛睁开时间
  this.bigEyeStart += 10;
  // 如果开始计算时间>结束时间
  if (this.bigEyeStart > this.bigEyeEnd) {
    // 切换下标
    this.bigEyeOn = (this.bigEyeOn + 1) % 2;
    // 清空开始时间
    this.bigEyeStart = 0
    if (this.bigEyeOn == 1) {
      this.bigEyeEnd = 30;
    }
    if (this.bigEyeOn == 0) {
      this.bigEyeEnd = 3000;
    }
  }
  //3.3:保存画笔1状态
  ctx1.save();
  //3.4:移动画布原点到大鱼位置
  ctx1.translate(this.x, this.y)
  //3.5:设置大鱼旋转角度
  ctx1.rotate(this.angle);
  //3.6:画大鱼身体
  ctx1.drawImage(this.bigBody[0],
    0 - this.bigBody[0].width * 0.5,
    0 - this.bigBody[0].height * 0.5);
  //3.7:画大鱼尾巴
  ctx1.drawImage(this.bigTail[0],
    0 - this.bigTail[0].width * 0.5 + 30,
    0 - this.bigTail[0].height * 0.5);
  //3.8:画大鱼眼睛
  ctx1.drawImage(this.bigEye[this.bigEyeOn],
    0 - this.bigEye[this.bigEyeOn].width * 0.5,
    0 - this.bigEye[this.bigEyeOn].height * 0.5);
  //3.9:恢复状态
  ctx1.restore();
}



//食物
var FruitObj = function () {
  this.x = [];//食物位置
  this.y = [];
  this.spd = [];//上浮速度
  this.orange;
  this.blue;
  this.fruitType = [];//食物类型0橙色1蓝色
}
FruitObj.prototype.num = 3;
FruitObj.prototype.init = function () {
  // 赋值图片对象
  this.orange = new Image();
  this.orange.src = "src/fruit.png";
  this.blue = new Image();
  this.blue.src = "src/blue.png";
  // 创建循环赋值
  for (var i = 0; i <= this.num; i++) {
    this.x[i] = i * canWidth / this.num + Math.random() * 10;
    this.y[i] = canHeight;
    this.spd[i] = 1 + Math.random() * 5;//上浮速度
    this.fruitType[i] = Math.random() < 0.9 ? 1 : 0;//食物类型1blue,2orange
  }
}
FruitObj.prototype.draw = function () {
  for (var i = 0; i < this.num; i++) {
    // 判断食物颜色
    if (this.fruitType[i] === 1) {
      var pic = this.blue;
    } else {
      var pic = this.orange;
    }
    this.y[i] -= this.spd[i];
    ctx1.drawImage(pic, this.x[i], this.y[i]);
    if (this.y[i] < 0) {
      this.y[i] = canHeight;
    }
  }
}

//功能五:分数
var DataObj=function(){
  this.score=0;
};
DataObj.prototype.draw=function(){
  ctx1.save()
  ctx1.fillStyle="#ffffff";
  ctx1.font="35px Verdana";
  ctx1.textAlign="center";
  ctx1.fillText("SCORE:"+this.score,canWidth*0.5,canHeight-500);
  ctx1.restore()
}


// 功能六：吃食物得分
function collision(){
  // 创建循环遍历每个食物
  for(var i=0;i<fruit.num;i++){
    //  计算大鱼和食物之间的距离
    var p=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
    if(p<900){
      // 如果距离在(30-900px)之间
      fruit.y[i]=canHeight;
      // 表示被吃掉 得分食物隐藏
      if(fruit.fruitType[i]===1){//吃蓝色食物
        data.score+=100;//每次加100分
      }else{//否则橙色
        data.score+=200;//每次加200分
      }
    }
  }
}
