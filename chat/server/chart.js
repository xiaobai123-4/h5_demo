// 创建web服务器
var server = require("http").createServer();
// 创建io对象
var io = require("socket.io")(server);
// 绑定监听窗口
server.listen(9001);
console.log("服务器已启动...")
// io对象绑定默认事件connection
io.on("connection", (socket) => {
  // 功能一：新人进入发送广播
  // 触发广播事件enter
  io.emit("enter",socket.id)
  // 功能二：客户发来聊天内容广播
  // 为socket绑定事件 Message
  socket.on("message",(data)=>{
    // 触发广播事件list
    io.emit("list",data)
  });
  // 功能三：客户下线 广播下线
  // 为socket绑定事件 disconnect
  socket.on("disconnect",(data)=>{
    // 触发广播事件 leave
    io.emit("leave",socket.id)
  })
});