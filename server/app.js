const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { basicLimiter } = require('./middleware/rateLimiter');

// 路由导入
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscription');
const billingRoutes = require('./routes/billing');
const coursesRoutes = require('./routes/courses');
const apiRoutes = require('./routes/api');

// 初始化应用
const app = express();

// 安全中间件
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// 日志中间件
app.use(morgan('combined'));

// 解析中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// 基础限流
app.use(basicLimiter);

// 路由
app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api', apiRoutes);

// API文档
app.get('/api', (req, res) => {
  res.json({
    name: '意念科技 API',
    version: '1.0.0',
    description: '意念科技在线学习平台API',
    endpoints: {
      auth: '/api/auth',
      subscription: '/api/subscription',
      billing: '/api/billing',
      courses: '/api/courses',
      api: '/api/v1/*'
    },
    documentation: 'https://github.com/13888285815/SelfStudy'
  });
});

// 404处理
app.use(notFound);

// 错误处理
app.use(errorHandler);

// 数据库连接
database.connectMongoDB();
database.connectRedis();

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await database.disconnect();
  process.exit(0);
});

module.exports = app;
