# GitHub仓库配置指南

## 当前状态

✅ 本地Git仓库已初始化
✅ 代码已提交到本地仓库
✅ GitHub远程仓库已添加
❌ 代码尚未推送到GitHub (需要认证配置)

## GitHub仓库信息

- 仓库地址: https://github.com/13888285815/SelfStudy
- 远程名称: origin
- 分支: main

## 推送代码到GitHub的步骤

### 方法1: 使用SSH密钥 (推荐)

#### 步骤1: 生成SSH密钥

```bash
# 生成新的SSH密钥 (如果还没有)
ssh-keygen -t ed25519 -C "13888285815@users.noreply.github.com"

# 或使用RSA密钥
ssh-keygen -t rsa -b 4096 -C "13888285815@users.noreply.github.com"
```

#### 步骤2: 启动ssh-agent并添加密钥

```bash
# 启动ssh-agent
eval "$(ssh-agent -s)"

# 添加私钥到ssh-agent
ssh-add ~/.ssh/id_ed25519
# 或
ssh-add ~/.ssh/id_rsa
```

#### 步骤3: 复制公钥

```bash
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub
# 或
cat ~/.ssh/id_rsa.pub
```

#### 步骤4: 在GitHub添加SSH密钥

1. 访问 https://github.com/settings/keys
2. 点击 "New SSH key"
3. 标题填写: SelfStudy-Mac
4. 将公钥内容粘贴到 "Key" 字段
5. 点击 "Add SSH key"

#### 步骤5: 更换远程仓库地址为SSH

```bash
cd /Users/zzx/WorkBuddy/20260324102029

# 更换为SSH地址
git remote set-url origin git@github.com:13888285815/SelfStudy.git

# 验证远程仓库地址
git remote -v
```

#### 步骤6: 推送代码

```bash
# 推送到GitHub
git push -u origin main
```

### 方法2: 使用Personal Access Token

#### 步骤1: 创建Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 设置:
   - Note: SelfStudy-Development
   - Expiration: 选择有效期 (建议90天或更长时间)
   - 勾选权限:
     - `repo` (完整仓库访问权限)
     - `workflow` (GitHub Actions权限,如需要)
4. 点击 "Generate token"
5. **重要**: 复制生成的token (只显示一次)

#### 步骤2: 使用token推送

```bash
cd /Users/zzx/WorkBuddy/20260324102029

# 方法A: 直接在URL中使用token
git remote set-url origin https://YOUR_TOKEN@github.com/13888285815/SelfStudy.git

# 推送
git push -u origin main

# 方法B: 使用git credential helper (推荐)
git config --global credential.helper store
git push -u origin main
# 会提示输入用户名和密码:
# Username: 13888285815
# Password: [粘贴你的token]
```

### 方法3: 使用GitHub CLI (gh)

#### 步骤1: 安装GitHub CLI

```bash
# macOS
brew install gh

# 验证安装
gh --version
```

#### 步骤2: 登录GitHub

```bash
gh auth login

# 选择:
# What account do you want to log into? -> GitHub.com
# What is your preferred protocol for Git operations? -> SSH 或 HTTPS
# Authenticate with your GitHub credentials? -> Login with a web browser
# 按提示在浏览器中完成认证
```

#### 步骤3: 推送代码

```bash
cd /Users/zzx/WorkBuddy/20260324102029

# 创建仓库 (如果还没有)
gh repo create 13888285815/SelfStudy --public --source=. --remote=origin --push

# 或直接推送
git push -u origin main
```

## 验证推送结果

推送成功后,访问以下地址查看代码:

https://github.com/13888285815/SelfStudy

## 后续开发工作流

### 日常开发

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 创建新分支 (可选,用于新功能)
git checkout -b feature/your-feature-name

# 3. 进行开发,提交代码
git add .
git commit -m "描述你的更改"

# 4. 推送到GitHub
git push origin feature/your-feature-name

# 5. 在GitHub上创建Pull Request (可选)

# 6. 合并到main分支后,拉取最新代码
git checkout main
git pull origin main
```

### 常用Git命令

```bash
# 查看状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 查看分支
git branch -a

# 撤销未提交的更改
git checkout -- filename

# 撤销最后的提交 (保留更改)
git reset --soft HEAD~1

# 完全撤销最后的提交 (删除更改)
git reset --hard HEAD~1
```

## GitHub Actions (可选)

如果需要自动部署或CI/CD,可以创建 `.github/workflows` 目录并添加工作流配置:

示例: 自动部署工作流 (`.github/workflows/deploy.yml`)

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to production
      run: |
        # 添加部署命令
        echo "Deploying..."
```

## 故障排除

### 问题1: Permission denied (publickey)

**原因**: SSH密钥未配置或未添加到GitHub

**解决方案**:
1. 检查SSH密钥: `ls -la ~/.ssh/`
2. 生成新密钥 (如没有)
3. 添加密钥到GitHub
4. 测试连接: `ssh -T git@github.com`

### 问题2: Authentication failed

**原因**: Token无效或过期

**解决方案**:
1. 重新生成Personal Access Token
2. 更新远程仓库URL
3. 或切换到SSH认证

### 问题3: fatal: remote origin already exists

**原因**: 远程仓库已存在

**解决方案**:
```bash
# 删除现有远程仓库
git remote remove origin

# 重新添加
git remote add origin git@github.com:13888285815/SelfStudy.git
```

### 问题4: 推送被拒绝 (non-fast-forward)

**原因**: 远程仓库有新的提交

**解决方案**:
```bash
# 拉取远程更新
git pull origin main --rebase

# 或强制推送 (谨慎使用)
git push -f origin main
```

## 项目仓库结构

推送成功后,仓库将包含以下文件:

```
SelfStudy/
├── client/                 # 前端代码
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── docs/                    # 文档
│   ├── API.md
│   └── DEPLOYMENT.md
├── server/                  # 后端代码
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── .env                     # 环境变量 (不推送)
├── .env.example            # 环境变量示例
├── .gitignore              # Git忽略文件
├── package.json            # 后端依赖
├── server.js               # 服务器入口
└── README.md               # 项目说明
```

## 下一步

推送成功后,可以:

1. 在GitHub上查看和浏览代码
2. 使用GitHub Issues跟踪bug和功能请求
3. 使用GitHub Wiki添加更多文档
4. 配置GitHub Pages托管前端
5. 设置GitHub Actions实现CI/CD

祝您开发顺利! 🚀
