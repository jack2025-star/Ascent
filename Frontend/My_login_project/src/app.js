// 引入 Node.js 内置模块
const path = require('path');
require('dotenv').config(); // 加载环境变量
//引入Express
const express = require('express');
const cors = require('cors');
// 引入 MySQL 模块
const mysql = require('mysql2');

// 创建应用实例
const app = express();

// 解析JSON格式的请求体
app.use(express.json());
app.use(cors());

// 配置静态文件服务：将 src 目录设为静态资源根目录
app.use(express.static(path.join(__dirname)));

// 创建数据库连接
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'test'
});

// 测试数据库连接
db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
    } else {
        console.log('成功连接到数据库！');
    }
});

// 首页路由：直接返回登录页面（可选，若静态文件已托管可省略）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// 登录路由
app.post('/login', (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;

    // 使用参数化查询防止 SQL 注入
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ success: false, message: "服务器内部错误" });
        }

        // 判断用户是否存在
        if (results.length > 0) {
            res.json({ success: true, message: "登录成功！" });
        } else {
            res.json({ success: false, message: "用户名或密码错误！" });
        }
    });
})

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已启动:http://localhost:3000')
})