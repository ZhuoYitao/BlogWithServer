// Starting point of the application.
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// DB Setup
mongoose.connect('mongodb://localhost:auth/auth')

// App Setup
// 使用use后app可以使用middleware。
// app接收的所有requests都会经过middleware。
// cors用于让服务器能够响应来自其他域名的请求
app.use(cors());
// morgan是一个记录http请求日志的中间件。
app.use(morgan('combined'));
// bodyParser在这里用于把所有类型的http的body信息解析为json。
app.use(bodyParser.json({type:'*/*'}));
// router里定义了这个app如何处理请求。
router(app);

// Server SetUp
// 如果需要监听1024以下的端口，则用这个命令行：sudo setcap CAP_NET_BIND_SERVICE+ep <node在服务器里的位置>
const port = 3090;
// Create a server that knows to accept http requests and send it to the app.
const server = http.createServer(app);
server.listen(port);
console.log('listening');