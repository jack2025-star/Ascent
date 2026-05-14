// 引入 Node.js 内置的 http 模块
const http = require('http');

// 创建服务器实例
const server = http.createServer((req, res) => {
    // 设置响应头
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    // 发送响应内容并结束响应
    res.end('你好，世界！服务器已启动！');
});

// 让服务器监听3000端口
server.listen(3000, () => {
    console.log('服务器已启动，访问地址：http://localhost:3000');
});
