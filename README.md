# SelfStudy 在线学习平台

一个类似51zxw.net的专业在线学习平台，集成Crunchbase式的订阅机制和AI API Tokens计费模式。

## 功能特性

### 核心功能 (来自51zxw.net)
- 多领域课程分类：办公软件、平面设计、室内设计、机械设计、影视动画、程序开发等
- 视频课程在线播放
- 学习进度跟踪
- 课程评价和问答系统
- 教师入驻平台
- 移动端支持

### 订阅系统 (参考Crunchbase)
- 分层定价模式 (Free/Pro/Enterprise)
- API访问权限管理
- 使用量和配额限制
- 自动订阅续费
- 免费试用

### AI API Tokens计费
- 精确的API调用追踪
- Token消耗统计
- 实时余额查询
- 用量预警
- 详细账单生成
- API Key管理

## 技术栈

### 后端
- **Node.js + Express** - Web框架
- **MongoDB + Mongoose** - 数据库
- **Redis** - 缓存和会话管理
- **JWT** - 身份认证
- **Stripe** - 支付处理
- **Socket.io** - 实时通信

### 前端
- **Vue.js 3** - 用户界面
- **Element Plus** - UI组件库
- **Axios** - HTTP客户端
- **Video.js** - 视频播放器

## 项目结构

```
selfstudy-platform/
├── client/                 # 前端代码
│   ├── src/
│   │   ├── components/    # Vue组件
│   │   ├── views/         # 页面视图
│   │   ├── router/        # 路由配置
│   │   ├── store/         # 状态管理
│   │   └── api/           # API调用
├── server/                # 后端代码
│   ├── config/           # 配置文件
│   ├── controllers/     # 控制器
│   ├── models/           # 数据模型
│   ├── routes/           # 路由
│   ├── middleware/       # 中间件
│   ├── services/         # 业务逻辑
│   └── utils/            # 工具函数
├── uploads/              # 上传文件
└── docs/                 # 文档
```

## 快速开始

详细安装和运行说明请查看 [QUICK_START.md](./QUICK_START.md)

### 前置要求
- Node.js 18+
- MongoDB 7+
- Redis 7+

### 一键启动

```bash
# 1. 安装依赖
npm install
cd client && npm install && cd ..

# 2. 启动数据库
brew services start mongodb-community
brew services start redis

# 3. 启动后端
npm run dev

# 4. 启动前端 (新终端)
cd client && npm run dev
```

访问:
- 前端: http://localhost:5173
- 后端API: http://localhost:3000

## 详细文档

- 📖 [快速开始指南](./QUICK_START.md) - 5分钟快速上手
- 📘 [完整API文档](./docs/API.md) - 所有API端点详细说明
- 📦 [部署指南](./docs/DEPLOYMENT.md) - Docker、云服务部署
- 🔧 [GitHub配置](./docs/GITHUB_SETUP.md) - 推送代码到GitHub
- 📊 [项目总结](./docs/PROJECT_SUMMARY.md) - 功能、技术栈、统计

## API文档

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/refresh` - 刷新Token
- `POST /api/auth/logout` - 用户登出

### 用户管理
- `GET /api/user/profile` - 获取用户信息
- `PUT /api/user/profile` - 更新用户信息
- `GET /api/user/subscription` - 获取订阅状态
- `POST /api/user/subscription/upgrade` - 升级订阅

### API Key管理
- `POST /api/keys/create` - 创建API Key
- `GET /api/keys` - 获取API Key列表
- `DELETE /api/keys/:id` - 删除API Key
- `GET /api/keys/:id/usage` - 查询使用量

### 计费系统
- `GET /api/billing/balance` - 查询余额
- `GET /api/billing/usage` - 查询使用量统计
- `GET /api/billing/invoices` - 获取账单列表
- `GET /api/billing/invoices/:id` - 获取账单详情

### 课程管理
- `GET /api/courses` - 获取课程列表
- `GET /api/courses/:id` - 获取课程详情
- `GET /api/courses/:id/lessons` - 获取课程章节
- `POST /api/courses/:id/progress` - 更新学习进度

### AI API (需要API Key认证)
- `POST /api/v1/chat/completions` - AI对话完成
- `POST /api/v1/embeddings` - 向量嵌入
- `GET /api/v1/models` - 获取模型列表

## 订阅计划

### Free Plan (免费)
- 每月 50,000 Tokens
- 访问基础课程
- 标准API响应速度
- 社区支持

### Pro Plan ($29/月)
- 每月 500,000 Tokens
- 访问所有课程
- 优先API响应
- 邮件支持
- 高级分析

### Enterprise Plan ($99/月)
- 无限Tokens
- 定制化解决方案
- 专属客户经理
- SLA保证
- 私有化部署

## 安全特性

- JWT Token认证
- API Key机制
- Rate Limiting
- CORS配置
- 密码加密 (bcrypt)
- SQL注入防护
- XSS防护

## 开发指南

### 添加新课程类别

1. 在 `server/models/Category.js` 中添加类别模型
2. 更新前端路由配置
3. 添加相应的API端点

### 实现新的API计费规则

在 `server/services/billingService.js` 中添加新的计费规则：

```javascript
async calculateTokensUsage(endpoint, model, input, output) {
  // 实现你的计费逻辑
}
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

- Email: support@yinian.tech
- GitHub: https://github.com/13888285815/SelfStudy
