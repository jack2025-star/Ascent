//引入Express
const express = require('express');


// 创建应用实例
const app = express();


// 根路径
app.get('/', (req, res) => {
    res.send('欢迎来到首页！！');
});

//about路径
app.get('/about', (req, res) => {
    res.send('这是一个关于页面')
});

//usr路径
app.get('/user', (req, res) => {
    const user = { name: "小明", age: 20 };
    res.json(user);
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已启动:http://localhost:3000')
})