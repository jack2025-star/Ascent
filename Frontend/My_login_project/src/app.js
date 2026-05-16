// 引入 Node.js 内置模块
const path = require('path');
//引入Express
const express = require('express');
const cors = require('cors');

// 创建应用实例
const app = express();

// 解析JSON格式的请求体
app.use(express.json());
app.use(cors());

// 配置静态文件服务：将 src 目录设为静态资源根目录
app.use(express.static(path.join(__dirname)));

//模拟数据库中的用户数据
const users = [
    { username: 'admin', password: '123456' }
]

// 首页路由：直接返回登录页面（可选，若静态文件已托管可省略）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// 登录路由
app.post('/login', (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;
    // 查找用户是否匹配
    const user = users.find(u => u.username === username && u.password === password);

    // 判断用户是否存在
    if (user) {
        res.json({ success: true, message: "登录成功！" });
    } else {
        res.json({ success: false, message: "用户名或密码错误！" })
    }
})

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已启动:http://localhost:3000')
})