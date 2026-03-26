# 🚀 意念科技快速开始指南

## 📋 项目概述

意念科技是一个专业的在线学习平台,集成Crunchbase式的订阅机制与AI API Tokens精确计费系统。

### 核心功能
✅ 用户认证系统 (JWT + API Key)
✅ 订阅管理 (Free/Pro/Enterprise三层计划)
✅ AI API Token计费系统
✅ 课程管理系统
✅ OpenAI兼容API

### 技术栈
- **后端**: Node.js + Express + MongoDB + Redis
- **前端**: Vue.js 3 + Element Plus + Vite
- **支付**: Stripe

---

## 🔧 本地开发

### 1. 克隆仓库 (已存在)

```bash
cd /Users/zzx/WorkBuddy/20260324102029
```

### 2. 安装依赖

```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd client
npm install
```

### 3. 启动数据库

```bash
# MongoDB
brew services start mongodb-community

# Redis
brew services start redis
```

### 4. 配置环境变量

环境变量文件已创建 (`.env`),无需额外配置

### 5. 启动服务

**后端 (终端1):**
```bash
npm run dev
# 服务运行在: http://localhost:3000
```

**前端 (终端2):**
```bash
cd client
npm run dev
# 服务运行在: http://localhost:5173
```

### 6. 访问应用

- 🌐 前端: http://localhost:5173
- 📡 后端API: http://localhost:3000
- 📚 API文档: 查看 `docs/API.md`

---

## 📦 项目结构

```
selfstudy-platform/
├── server/              # 后端 (Express)
│   ├── models/         # 数据模型
│   ├── routes/         # API路由
│   ├── services/       # 业务逻辑
│   └── middleware/     # 中间件
├── client/              # 前端 (Vue 3)
│   └── src/
│       ├── views/      # 页面
│       ├── store/      # 状态管理
│       └── router/     # 路由
└── docs/                # 文档
```

---

## 🎯 核心功能使用

### 用户注册/登录

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 创建API Key

```bash
curl -X POST http://localhost:3000/api/auth/keys \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My App",
    "permissions": ["read", "write"]
  }'
```

### AI API调用 (OpenAI兼容)

```bash
curl -X POST http://localhost:3000/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

### 查询余额

```bash
curl http://localhost:3000/api/billing/balance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 💳 订阅计划

| 计划 | 价格 | 每月Token | 特性 |
|------|------|----------|------|
| Free | 免费 | 50,000 | 基础课程、社区支持 |
| Pro | ¥199/月 | 500,000 | 所有课程、邮件支持、优先响应 |
| Enterprise | ¥999/月 | 无限 | 专属客服、SLA保证、私有化部署 |

---

## 📖 完整文档

- **API文档**: `docs/API.md`
- **部署指南**: `docs/DEPLOYMENT.md`
- **GitHub配置**: `docs/GITHUB_SETUP.md`
- **项目总结**: `docs/PROJECT_SUMMARY.md`
- **项目说明**: `README.md`

---

## 🚀 推送到GitHub

代码已提交到本地Git仓库,需要配置GitHub认证后推送。

### 快速推送 (SSH方式)

```bash
# 1. 生成SSH密钥
ssh-keygen -t ed25519 -C "13888285815@users.noreply.github.com"

# 2. 复制公钥
cat ~/.ssh/id_ed25519.pub

# 3. 在GitHub添加密钥
# 访问: https://github.com/settings/keys

# 4. 更换远程地址
git remote set-url origin git@github.com:13888285815/SelfStudy.git

# 5. 推送
git push -u origin main
```

详细步骤请参考: `docs/GITHUB_SETUP.md`

---

## 📊 项目状态

✅ 所有核心功能已完成
✅ 代码已提交到本地Git (3次提交)
✅ 文档齐全 (4份文档)
⏳ 等待推送到GitHub

### Git提交历史
```
e375f8b docs: add comprehensive project summary
dc13555 docs: add GitHub setup and deployment guides
a7396d9 Initial commit: 意念科技在线学习平台
```

---

## 🛠️ 常用命令

### 开发
```bash
# 后端
npm run dev          # 启动开发服务器
npm start           # 生产环境启动

# 前端
cd client
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
```

### Git
```bash
git status          # 查看状态
git log --oneline   # 查看历史
git add .           # 添加所有更改
git commit -m "msg" # 提交
git push            # 推送到GitHub
```

### 数据库
```bash
# MongoDB
brew services start mongodb-community  # 启动
brew services stop mongodb-community   # 停止

# Redis
brew services start redis              # 启动
brew services stop redis               # 停止
```

---

## ⚠️ 注意事项

1. **环境变量**: `.env`文件已创建,生产环境请修改密钥
2. **数据库**: 确保MongoDB和Redis已启动
3. **GitHub**: 需要配置认证后才能推送代码
4. **Stripe**: 需要配置真实密钥才能使用支付功能
5. **OpenAI**: 需要配置API Key才能使用AI功能

---

## 🤝 贡献

欢迎提交Issue和Pull Request!

---

## 📞 支持

- GitHub: https://github.com/13888285815/SelfStudy
- Email: zzx@yndxw.com

---

**祝开发顺利! 🎉**
