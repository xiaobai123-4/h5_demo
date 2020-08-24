// 功能一：创建弹幕的构造函数并且添加属性和方法
// 创建弹幕的构造函数
var MsgObj = function () {
  this.m = [];//文本内容100条
  this.x = [];//文本位置 x
  this.y = [];//文本位置 y
  this.color = [];//文本颜色 
  this.font = [];//文本大小
  this.spd = [];//文本移动速度 3 1
  this.alive = [];//显示或者隐藏true
}
// 为构造函数添加属性num=100
MsgObj.prototype.num = 100;
// 为构造函数添加方法init 初始化：第一次为构造函数中数据赋值
MsgObj.prototype.init = function () {
  //创建循环遍历所有数组中数据
  for (var i = 0; i <= this.num; i++) {
    // 赋值文字
    this.m[i] = "666";
    // 赋值x画布宽度
    this.x[i] = canWidth;
    // 赋值y随机
    this.y[i] = Math.random();
    // 赋值颜色#fff
    this.color[i] = "#fff";
    // 赋值字体大小
    this.font[i] = "30px";
    // 赋值文字速度
    this.spd[i] = 2;
    // 赋值状态
    this.alive[i] = false;//临时修改
  }
}
// 为构造函数添加方法draw 绘制方法：将数据绘制画布中
MsgObj.prototype.draw = function () {
  //清除画布,擦除画布上原有图片
  ctx.clearRect(0, 0, canWidth, canHeight);
  // 创建循环遍历所有弹幕文字
  for (var i = 0; i < this.num; i++) {
    //判断当前弹幕是否显示状态
    if (this.alive[i]) {
      // 获取当前文字颜色赋值给当前画笔对象
      ctx.fillStyle = this.color[i];
      // 获取当前文字大小赋值给当前画笔对象
      ctx.font = this.font[i] + " 楷体"
      // 获取当前文字移动速度，修改当前文字X值减速度[向左移动]
      this.x[i] -= this.spd[i];
      //绘制文字
      ctx.fillText(this.m[i], this.x[i], this.y[i]);
      // 如果文字移动超出画布修改状态
      if (this.x[i] < 0) {
        this.alive[i] = false;//隐藏
        this.x[i] = canWidth;//恢复
      }
      if (this.y[i] <= 25 || this.y[i] > canHeight) {
        this.alive[i] = false;//隐藏
        this.x[i] = canWidth;//恢复
      }
    }
  }
}
// 功能二:创建一组函数当页面内容加载成功后调用函数
MsgObj.prototype.add = function (obj) {
  //功能:获取用户输入信息添加到弹幕中
  //    并且显示
  //技巧:我们有100弹幕文字,按下标
  //挑一个状态为false
  //1:创建循环遍历所有弹幕文字
  for (var i = 0; i < this.num; i++) {
    //2:判断当前文字状态false
    if (this.alive[i] == false) {
      //3:创建随机速度赋值当前文字速度
      this.spd[i] = 1 + Math.random() * 5;
      this.y[i] = Math.random() * canHeight;
      //4:获取参数文字内容赋值
      this.m[i] = obj.m;
      //5:获取参数文字颜色赋值
      this.color[i] = obj.c;
      //6:获取参数文字大小赋值
      this.font[i] = obj.f;
      //7:将文字状态true
      this.alive[i] = true;
      //8:返回 一次挑一个
      return;
    }//if end
  }//for end
}