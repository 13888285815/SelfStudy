# 部署指南

## 本地开发环境配置

### 1. 安装依赖

```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd client
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下内容：

```env
NODE_ENV=development
PORT=3000

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/selfstudy
REDIS_URL=redis://localhost:6379

# JWT密钥
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# API密钥前缀
API_KEY_PREFIX=sk_

# Stripe支付配置 (可选)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI API配置 (可选)
AI_API_ENDPOINT=https://api.openai.com/v1
OPENAI_API_KEY=sk-your-openai-api-key

# 管理员账户
ADMIN_EMAIL=admin@yndxw.com
ADMIN_PASSWORD=admin123
```

### 3. 启动数据库

确保MongoDB和Redis已安装并启动：

```bash
# macOS (使用Homebrew)
brew services start mongodb-community
brew services start redis

# Linux
sudo systemctl start mongod
sudo systemctl start redis

# Windows
# 使用MongoDB和Redis的Windows服务
```

### 4. 启动后端服务

```bash
npm run dev
```

后端服务将在 `http://localhost:3000` 启动

### 5. 启动前端服务

```bash
cd client
npm run dev
```

前端服务将在 `http://localhost:5173` 启动

## 部署到GitHub

项目已配置Git仓库,可以推送到GitHub:

```bash
# 查看远程仓库
git remote -v

# 推送到GitHub (需要配置GitHub认证)
git push -u origin main
```

### GitHub认证配置

#### 方法1: 使用SSH密钥

```bash
# 生成SSH密钥 (如果还没有)
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加SSH密钥到ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 复制公钥到GitHub
cat ~/.ssh/id_ed25519.pub

# 在GitHub设置中添加SSH密钥
# https://github.com/settings/keys

# 更换远程仓库地址为SSH
git remote set-url origin git@github.com:13888285815/SelfStudy.git

# 推送代码
git push -u origin main
```

#### 方法2: 使用Personal Access Token

```bash
# 在GitHub创建Personal Access Token
# Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
# 权限: repo, workflow

# 使用token推送
git remote set-url origin https://YOUR_TOKEN@github.com/13888285815/SelfStudy.git
git push -u origin main
```

## 生产环境部署

### 使用Docker部署

#### 1. 创建Dockerfile

后端Dockerfile (`Dockerfile.backend`):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY server ./server
COPY server.js ./
COPY .env ./

EXPOSE 3000

CMD ["node", "server.js"]
```

前端Dockerfile (`Dockerfile.frontend`):

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY client/package*.json ./
RUN npm ci

COPY client ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 创建Docker Compose文件

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
      - redis
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/selfstudy
      - REDIS_URL=redis://redis:6379

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
  redis_data:
```

#### 3. 启动服务

```bash
docker-compose up -d
```

### 使用云服务部署

#### 1. 后端部署 (使用Railway/Render/Heroku)

部署到Railway:
```bash
# 安装Railway CLI
npm install -g @railway/cli

# 登录Railway
railway login

# 初始化项目
railway init

# 配置环境变量
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_jwt_secret

# 部署
railway up
```

部署到Render:
- 创建新服务
- 连接GitHub仓库
- 配置环境变量
- 部署

#### 2. 前端部署 (使用Vercel/Netlify)

部署到Vercel:
```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
cd client
vercel
```

部署到Netlify:
```bash
# 构建命令: npm run build
# 发布目录: dist
```

## 数据库迁移

### MongoDB备份

```bash
# 备份数据库
mongodump --uri="mongodb://localhost:27017/selfstudy" --out=backup/

# 恢复数据库
mongorestore --uri="mongodb://localhost:27017/selfstudy" backup/
```

### Redis持久化

Redis已配置RDB和AOF持久化,无需手动备份

## 监控和日志

### 使用PM2管理进程

```bash
# 安装PM2
npm install -g pm2

# 启动后端
pm2 start server.js --name selfstudy-api

# 启动前端 (如果需要)
cd client
pm2 start "npm run dev" --name selfstudy-frontend

# 查看日志
pm2 logs

# 重启服务
pm2 restart selfstudy-api
```

### 日志管理

- 应用日志: `logs/` 目录
- Nginx日志: `/var/log/nginx/`
- MongoDB日志: `/var/log/mongodb/`

## 安全配置

### 1. 环境变量安全

- 不要将 `.env` 文件提交到Git
- 在生产环境使用强密码
- 定期更换JWT密钥

### 2. HTTPS配置

使用Let's Encrypt免费证书:

```bash
# 安装certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com

# 自动续期
sudo certbot renew --dry-run
```

### 3. 防火墙配置

```bash
# 只开放必要端口
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## 常见问题

### 1. 数据库连接失败

检查MongoDB和Redis是否启动:

```bash
# 检查MongoDB
sudo systemctl status mongod

# 检查Redis
sudo systemctl status redis

# 查看日志
sudo journalctl -u mongod -f
sudo journalctl -u redis -f
```

### 2. API密钥认证失败

确保:
- API Key格式正确 (sk_xxx)
- 用户订阅状态为active
- Token余额充足

### 3. Stripe支付失败

检查:
- Stripe密钥配置正确
- Webhook端点可访问
- 金额和货币格式正确

## 性能优化

### 1. 数据库优化

- 添加合适的索引
- 使用连接池
- 启用查询缓存

### 2. 应用优化

- 启用Gzip压缩
- 使用CDN加速静态资源
- 实现API响应缓存

### 3. 负载均衡

使用Nginx负载均衡:

```nginx
upstream backend {
    server backend1:3000;
    server backend2:3000;
    server backend3:3000;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

## 备份策略

### 数据备份

```bash
# 每日自动备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d)
mongodump --uri="mongodb://localhost:27017/selfstudy" --out=/backup/mongodb/$DATE

# 保留最近7天的备份
find /backup/mongodb/ -type d -mtime +7 -exec rm -rf {} \;
```

### 配置cron任务

```bash
# 每天凌晨2点执行备份
0 2 * * * /path/to/backup-script.sh
```
