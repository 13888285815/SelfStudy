# 意念科技 API 文档

## 基础信息

- Base URL: `http://localhost:3000`
- 认证方式: JWT Token 或 API Key
- 响应格式: JSON

## 认证相关 API

### 1. 用户注册

**POST** `/api/auth/register`

**请求体:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "profile": {
    "fullName": "Test User"
  }
}
```

**响应:**
```json
{
  "success": true,
  "message": "注册成功",
  "data": {
    "user": {
      "_id": "...",
      "username": "testuser",
      "email": "test@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 2. 用户登录

**POST** `/api/auth/login`

**请求体:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**响应:**
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

### 3. 获取当前用户信息

**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "username": "testuser",
      "email": "test@example.com",
      "subscription": {
        "plan": "free",
        "status": "active"
      },
      "tokenBalance": 50000
    }
  }
}
```

### 4. 创建 API Key

**POST** `/api/auth/keys`

**Headers:**
```
Authorization: Bearer {token}
```

**请求体:**
```json
{
  "name": "My App",
  "permissions": ["read", "write"]
}
```

**响应:**
```json
{
  "success": true,
  "message": "API Key创建成功",
  "data": {
    "apiKey": "sk_1234567890abcdef...",
    "keyId": "...",
    "name": "My App",
    "permissions": ["read", "write"]
  }
}
```

### 5. 获取 API Keys 列表

**GET** `/api/auth/keys`

**Headers:**
```
Authorization: Bearer {token}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "keys": [
      {
        "keyId": "...",
        "keyPrefix": "sk_12345678",
        "name": "My App",
        "permissions": ["read", "write"],
        "lastUsedAt": "2024-03-26T10:00:00Z",
        "createdAt": "2024-03-26T10:00:00Z"
      }
    ]
  }
}
```

## 订阅相关 API

### 1. 获取所有订阅计划

**GET** `/api/subscription/plans`

**响应:**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "name": "Free",
        "slug": "free",
        "description": "免费计划",
        "pricing": {
          "monthly": { "amount": 0, "currency": "CNY" }
        },
        "tokens": {
          "monthly": 50000
        },
        "features": [
          { "name": "每月50,000 Tokens", "included": true }
        ]
      }
    ]
  }
}
```

### 2. 创建订阅

**POST** `/api/subscription/create`

**Headers:**
```
Authorization: Bearer {token}
```

**请求体:**
```json
{
  "plan": "pro",
  "period": "monthly"
}
```

**响应:**
```json
{
  "success": true,
  "message": "订阅创建成功",
  "data": {
    "user": { ... },
    "subscription": { ... }
  }
}
```

### 3. 升级订阅

**POST** `/api/subscription/upgrade`

**Headers:**
```
Authorization: Bearer {token}
```

**请求体:**
```json
{
  "targetPlan": "enterprise"
}
```

### 4. 取消订阅

**POST** `/api/subscription/cancel`

**Headers:**
```
Authorization: Bearer {token}
```

## 计费相关 API

### 1. 获取余额

**GET** `/api/billing/balance`

**Headers:**
```
Authorization: Bearer {token}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "balance": 50000,
    "totalUsed": 10000,
    "monthlyUsed": 5000,
    "lastBillingDate": "2024-03-01T00:00:00Z"
  }
}
```

### 2. 获取使用量统计

**GET** `/api/billing/usage?days=30`

**Headers:**
```
Authorization: Bearer {token}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "totalTokens": 100000,
    "promptTokens": 60000,
    "completionTokens": 40000,
    "requestCount": 500,
    "avgResponseTime": 1500,
    "period": {
      "start": "2024-02-26T00:00:00Z",
      "end": "2024-03-26T00:00:00Z",
      "days": 30
    }
  }
}
```

### 3. 获取账单列表

**GET** `/api/billing/invoices?page=1&limit=10`

**Headers:**
```
Authorization: Bearer {token}
```

### 4. 生成使用量发票

**POST** `/api/billing/invoices/generate`

**Headers:**
```
Authorization: Bearer {token}
```

## 课程相关 API

### 1. 获取课程列表

**GET** `/api/courses?page=1&limit=12&category=&difficulty=&search=&sort=createdAt&order=desc`

**响应:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "_id": "...",
        "title": "Vue.js 3.0 完全指南",
        "description": "...",
        "category": { "name": "程序开发", "slug": "programming" },
        "instructor": {
          "username": "teacher",
          "profile": { "fullName": "张老师" }
        },
        "stats": {
          "enrollmentCount": 1000,
          "averageRating": 4.8
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "totalPages": 9
    }
  }
}
```

### 2. 获取课程详情

**GET** `/api/courses/:id`

**响应:**
```json
{
  "success": true,
  "data": {
    "course": {
      "_id": "...",
      "title": "...",
      "description": "...",
      "lessons": [
        {
          "_id": "...",
          "title": "第1章：课程介绍",
          "videoUrl": "...",
          "duration": 1800,
          "isFree": true
        }
      ]
    }
  }
}
```

### 3. 更新学习进度

**POST** `/api/courses/:id/progress`

**Headers:**
```
Authorization: Bearer {token}
```

**请求体:**
```json
{
  "lessonId": "...",
  "progress": 50
}
```

## AI API (兼容 OpenAI)

### 1. 聊天完成

**POST** `/api/v1/chat/completions`

**Headers:**
```
Authorization: Bearer {api_key}
Content-Type: application/json
```

**请求体:**
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "你是一个有帮助的助手。"
    },
    {
      "role": "user",
      "content": "你好！"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**响应:**
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好！很高兴见到你。有什么可以帮助你的吗？"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 15,
    "total_tokens": 35
  }
}
```

### 2. 文本嵌入

**POST** `/api/v1/embeddings`

**Headers:**
```
Authorization: Bearer {api_key}
Content-Type: application/json
```

**请求体:**
```json
{
  "model": "text-embedding-ada-002",
  "input": "Hello, world!",
  "encoding_format": "float"
}
```

**响应:**
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [0.1, 0.2, 0.3, ...],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 4,
    "total_tokens": 4
  }
}
```

### 3. 获取模型列表

**GET** `/api/models`

**Headers:**
```
Authorization: Bearer {api_key}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "object": "list",
    "data": [
      {
        "id": "gpt-4",
        "object": "model",
        "created": 1699015354,
        "owned_by": "openai",
        "tokens": {
          "context": 8192,
          "maxOutput": 4096
        }
      }
    ]
  }
}
```

## 错误响应格式

所有错误响应遵循以下格式:

```json
{
  "success": false,
  "message": "错误描述",
  "errors": ["错误详情列表"]
}
```

**HTTP 状态码:**
- 200: 成功
- 201: 创建成功
- 400: 请求错误
- 401: 未认证
- 403: 权限不足
- 404: 资源不存在
- 409: 资源冲突
- 429: 请求过多
- 500: 服务器错误

## 计费说明

### Token 计费

所有 API 调用都会消耗 Tokens:

| 模型 | 输入 Token 价格 | 输出 Token 价格 |
|------|---------------|-----------------|
| GPT-4 | $0.03/1K | $0.06/1K |
| GPT-4-32K | $0.06/1K | $0.12/1K |
| GPT-3.5-Turbo | $0.0015/1K | $0.002/1K |
| Text-Embedding-Ada-002 | $0.0001/1K | $0 |

### 订阅计划 Token 配额

| 计划 | 每月 Token | 每日 API 调用 |
|------|-----------|--------------|
| Free | 50,000 | 100 |
| Pro | 500,000 | 1,000 |
| Enterprise | 无限 | 无限 |

## 限流规则

- 基本接口: 100 请求 / 15 分钟
- API 接口: 60 请求 / 分钟
- 登录: 5 次 / 15 分钟
- 注册: 3 次 / 小时
