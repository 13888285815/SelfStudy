# 意念科技项目总结

## 项目概述

已成功创建一个类似51zxw.net的在线学习平台(意念科技),集成了Crunchbase式的订阅机制和AI API Tokens计费模式。

## 完成的功能模块

### ✅ 1. 后端核心系统

#### 用户认证系统 (`server/services/authService.js`)
- 用户注册/登录/登出
- JWT Token认证
- API Key管理 (创建、删除、查询)
- 密码加密 (bcrypt)
- 会话管理

#### 订阅管理系统 (`server/services/subscriptionService.js`)
- 三层订阅计划 (Free/Pro/Enterprise)
- 分层定价模式 (参考Crunchbase)
- Stripe支付集成
- 订阅升级/取消
- Webhook处理

#### 计费系统 (`server/services/billingService.js`)
- 精确的API Token追踪
- Token消耗统计
- 实时余额查询
- 使用量预警
- 账单生成

### ✅ 2. 数据模型 (`server/models/`)

- **User**: 用户信息、订阅状态、Token余额
- **Course**: 课程信息、章节管理、学习进度
- **Category**: 课程分类
- **SubscriptionPlan**: 订阅计划配置
- **APILog**: API调用日志
- **Invoice**: 账单管理
- **Review**: 课程评价

### ✅ 3. API路由 (`server/routes/`)

- `/api/auth/*` - 认证相关
- `/api/subscription/*` - 订阅管理
- `/api/billing/*` - 计费管理
- `/api/courses/*` - 课程管理
- `/api/v1/*` - AI API (OpenAI兼容)

### ✅ 4. 前端基础架构 (`client/`)

- Vue 3 + Vite构建
- Element Plus UI组件库
- Pinia状态管理
- Vue Router路由
- Axios HTTP客户端

### ✅ 5. 中间件 (`server/middleware/`)

- JWT认证
- API Key认证
- 角色权限控制
- 订阅计划验证
- Token余额检查
- Rate Limiting (限流)
- 错误处理

### ✅ 6. 文档系统

- **README.md**: 项目说明和快速开始
- **docs/API.md**: 完整API文档
- **docs/DEPLOYMENT.md**: 部署指南
- **docs/GITHUB_SETUP.md**: GitHub配置指南
- **docs/PROJECT_SUMMARY.md**: 项目总结

### ✅ 7. Git仓库配置

- 本地Git仓库初始化
- 所有代码已提交
- GitHub远程仓库配置
- 详细的推送指南文档

## 技术栈

### 后端
- Node.js 18+
- Express.js 4.x
- MongoDB (Mongoose)
- Redis
- JWT
- Stripe
- Bcrypt.js

### 前端
- Vue.js 3
- Vite
- Element Plus
- Pinia
- Vue Router
- Axios
- Video.js
- ECharts

## 订阅计划 (参考Crunchbase)

| 计划 | 价格 | 每月Token | 特性 |
|------|------|----------|------|
| Free | 免费 | 50,000 | 基础课程、社区支持 |
| Pro | ¥199/月 | 500,000 | 所有课程、邮件支持、优先响应 |
| Enterprise | ¥999/月 | 无限 | 专属客服、SLA保证、私有化部署 |

## AI API Token计费

### 支持的模型
- GPT-4
- GPT-4-32K
- GPT-3.5-Turbo
- Text-Embedding-Ada-002

### 计费规则
| 模型 | 输入Token | 输出Token |
|------|-----------|-----------|
| GPT-4 | $0.03/1K | $0.06/1K |
| GPT-4-32K | $0.06/1K | $0.12/1K |
| GPT-3.5-Turbo | $0.0015/1K | $0.002/1K |
| Text-Embedding | $0.0001/1K | $0 |

### API特性
- OpenAI API兼容格式
- 实时Token扣费
- 使用量统计
- 详细日志记录
- 余额不足预警

## 项目目录结构

```
yinian-tech/
├── server/                      # 后端代码
│   ├── config/                 # 配置文件
│   │   └── database.js        # 数据库配置
│   ├── models/                 # 数据模型 (7个)
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Category.js
│   │   ├── SubscriptionPlan.js
│   │   ├── APILog.js
│   │   ├── Invoice.js
│   │   ├── Review.js
│   │   └── index.js
│   ├── controllers/            # 控制器 (预留)
│   ├── routes/                # 路由 (6个)
│   │   ├── auth.js
│   │   ├── subscription.js
│   │   ├── billing.js
│   │   ├── courses.js
│   │   ├── api.js
│   │   └── index.js
│   ├── services/              # 业务逻辑 (3个)
│   │   ├── authService.js
│   │   ├── subscriptionService.js
│   │   └── billingService.js
│   ├── middleware/            # 中间件 (4个)
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   └── app.js                 # Express应用
├── client/                    # 前端代码
│   ├── src/
│   │   ├── components/        # Vue组件 (预留)
│   │   ├── views/            # 页面视图
│   │   │   └── Home.vue
│   │   ├── router/           # 路由
│   │   │   └── index.js
│   │   ├── store/            # 状态管理
│   │   │   └── user.js
│   │   ├── api/              # API调用 (预留)
│   │   ├── App.vue           # 主组件
│   │   └── main.js           # 入口文件
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docs/                      # 文档
│   ├── API.md                # API文档
│   ├── DEPLOYMENT.md         # 部署指南
│   ├── GITHUB_SETUP.md       # GitHub配置
│   └── PROJECT_SUMMARY.md    # 项目总结
├── uploads/                   # 上传文件目录
├── public/                    # 静态文件
├── .env                       # 环境变量
├── .env.example              # 环境变量示例
├── .gitignore                # Git忽略文件
├── package.json              # 后端依赖
├── server.js                 # 服务器入口
└── README.md                 # 项目说明
```

## 代码统计

- **总文件数**: 36个
- **代码行数**: 约5,300行
- **后端文件**: 23个
- **前端文件**: 8个
- **文档文件**: 4个

## 核心API端点

### 认证相关
- POST `/api/auth/register` - 用户注册
- POST `/api/auth/login` - 用户登录
- POST `/api/auth/keys` - 创建API Key
- GET `/api/auth/keys` - 获取API Keys
- DELETE `/api/auth/keys/:id` - 删除API Key

### 订阅相关
- GET `/api/subscription/plans` - 获取订阅计划
- POST `/api/subscription/create` - 创建订阅
- POST `/api/subscription/upgrade` - 升级订阅
- POST `/api/subscription/cancel` - 取消订阅

### 计费相关
- GET `/api/billing/balance` - 查询余额
- GET `/api/billing/usage` - 查询使用量
- GET `/api/billing/invoices` - 获取账单

### 课程相关
- GET `/api/courses` - 获取课程列表
- GET `/api/courses/:id` - 获取课程详情
- POST `/api/courses/:id/progress` - 更新学习进度

### AI API (OpenAI兼容)
- POST `/api/v1/chat/completions` - 聊天完成
- POST `/api/v1/embeddings` - 文本嵌入
- GET `/api/models` - 获取模型列表

## 待完成的功能

### 前端页面 (需补充)
- [ ] 登录/注册页面
- [ ] 课程列表页
- [ ] 课程详情页
- [ ] 视频播放器
- [ ] 用户资料页
- [ ] 订阅管理页
- [ ] 计费统计页
- [ ] API Key管理页

### 后端功能 (可扩展)
- [ ] 视频文件上传
- [ ] 课程审核流程
- [ ] 评论系统
- [ ] 问答系统
- [ ] 实时聊天
- [ ] 管理员后台

### 部署相关
- [ ] Docker配置
- [ ] CI/CD流程
- [ ] 监控系统
- [ ] 日志系统
- [ ] 备份策略

## 快速开始

### 1. 安装依赖
```bash
npm install
cd client && npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件,填入实际配置
```

### 3. 启动数据库
```bash
# MongoDB
brew services start mongodb-community

# Redis
brew services start redis
```

### 4. 启动服务
```bash
# 后端
npm run dev

# 前端 (新终端)
cd client
npm run dev
```

### 5. 访问应用
- 后端API: http://localhost:3000
- 前端界面: http://localhost:5173
- API文档: 查看 `docs/API.md`

## 推送到GitHub

由于GitHub需要认证,请参考 `docs/GITHUB_SETUP.md` 文档完成以下步骤之一:

### 方法1: SSH密钥 (推荐)
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "13888285815@users.noreply.github.com"

# 在GitHub添加公钥: https://github.com/settings/keys

# 更换远程地址
git remote set-url origin git@github.com:13888285815/SelfStudy.git

# 推送
git push -u origin main
```

### 方法2: Personal Access Token
```bash
# 在GitHub创建token: https://github.com/settings/tokens

# 使用token推送
git remote set-url origin https://YOUR_TOKEN@github.com/13888285815/SelfStudy.git
git push -u origin main
```

### 方法3: GitHub CLI
```bash
# 安装gh
brew install gh

# 登录
gh auth login

# 推送
git push -u origin main
```

## 参考资源

### 51zxw.net特点
- 多领域课程分类
- 视频在线播放
- 学习进度跟踪
- 教师入驻平台
- 社区问答

### Crunchbase特点
- 分层定价模式
- API访问权限
- 使用量配额
- 自动订阅续费
- 免费试用

### OpenAI API
- RESTful API设计
- Token计费模式
- 实时响应
- 详细使用统计

## 下一步建议

1. **完成前端页面**: 根据后端API开发完整的Vue组件
2. **集成真实AI API**: 配置OpenAI API Key实现真实AI调用
3. **添加测试**: 编写单元测试和集成测试
4. **优化性能**: 添加缓存、优化查询
5. **部署上线**: 使用Docker或云服务部署
6. **完善文档**: 添加更多使用示例和FAQ

## 联系方式

- GitHub: https://github.com/13888285815/SelfStudy
- Email: zzx@yndxw.com

## 许可证

MIT License

---

**项目状态**: ✅ 核心功能已完成,代码已提交到本地Git仓库,等待推送到GitHub
**创建时间**: 2026-03-26
**最后更新**: 2026-03-26
