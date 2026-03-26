# 意念科技 - Crunchbase式订阅验证系统

## 概述

意念科技采用类似Crunchbase的分层订阅机制，提供Free、Pro、Enterprise三个等级的订阅计划，并配备完整的验证系统和AI API Tokens计费模式。

## 订阅计划

### Free Plan（免费版）

**费用**: 免费

**配额**:
- 每月 50,000 AI API Tokens
- 基础课程访问权限
- 标准API响应速度
- 社区支持

**限制**:
- 无法访问高级课程
- 无优先响应
- 无邮件支持
- 无使用统计导出

### Pro Plan（专业版）

**费用**: ¥199/月（年付享8折优惠）

**配额**:
- 每月 500,000 AI API Tokens
- 所有课程访问权限
- 优先API响应（<100ms）
- 邮件技术支持
- 高级数据分析
- 使用统计导出

**特权**:
- 专属API Key标识
- 提前体验新功能
- 定制化学习路径推荐

### Enterprise Plan（企业版）

**费用**: ¥999/月（支持定制化报价）

**配额**:
- 无限AI API Tokens
- 所有课程访问权限
- 最高优先级API响应（<50ms）
- 专属客户经理
- 7x24小时技术支持
- SLA服务保证
- 私有化部署选项

**特权**:
- 专属API网关
- 自定义域名
- 团队协作功能
- 管理员权限控制
- 详细的财务报表

## 订阅验证系统

### 1. API Key 验证机制

所有AI API调用必须使用有效的API Key进行身份验证：

```javascript
// 请求头格式
{
  "Authorization": "Bearer sk_your_api_key_here",
  "Content-Type": "application/json"
}
```

**验证流程**:
1. 提取API Key
2. 在Redis缓存中查找（提高性能）
3. 缓存未命中则查询MongoDB
4. 验证API Key是否激活且未过期
5. 检查订阅计划和配额
6. 返回验证结果

### 2. Token配额验证

在每次API调用前验证用户的Token配额：

```javascript
// 验证逻辑
async function validateTokenQuota(userId, tokensNeeded) {
  const user = await User.findById(userId);
  const subscription = await Subscription.findOne({ userId });
  
  // 检查当月已用配额
  if (subscription.tokensUsed + tokensNeeded > subscription.tokensLimit) {
    throw new Error('Token配额不足，请升级订阅计划');
  }
  
  return true;
}
```

### 3. 订阅状态验证

每次API调用验证用户的订阅状态：

- 订阅是否激活
- 订阅是否过期
- 支付是否成功
- 是否有逾期未付账单

### 4. 速率限制

根据订阅计划实施不同的速率限制：

| 订阅计划 | 速率限制 |
|---------|---------|
| Free | 60次/分钟 |
| Pro | 300次/分钟 |
| Enterprise | 无限制 |

## AI API Tokens计费模式

### 计费规则

#### GPT-4
- 输入：¥0.03 / 1K tokens
- 输出：¥0.06 / 1K tokens

#### GPT-4-32K
- 输入：¥0.06 / 1K tokens
- 输出：¥0.12 / 1K tokens

#### GPT-3.5-Turbo
- 输入：¥0.0015 / 1K tokens
- 输出：¥0.002 / 1K tokens

#### Text-Embedding-Ada-002
- 固定：¥0.0001 / 1K tokens

### Token计算

```javascript
// 使用tiktoken库精确计算tokens
import { encoding_for_model } from '@dqbd/tiktoken';

const encoding = encoding_for_model('gpt-3.5-turbo');
const tokens = encoding.encode(your_text).length;
encoding.free();
```

### 实时计费流程

1. **请求接收**: 用户发起API请求
2. **Token计算**: 计算输入tokens
3. **配额验证**: 检查用户剩余配额
4. **调用OpenAI**: 转发请求到OpenAI API
5. **响应处理**: 计算输出tokens
6. **扣费**: 从用户配额中扣除tokens
7. **记录**: 记录使用日志到APILog表
8. **返回**: 返回结果给用户

### 扣费示例

```javascript
async function deductTokens(userId, model, inputTokens, outputTokens) {
  const pricing = {
    'gpt-4': { input: 30, output: 60 },          // 每1000 tokens的价格（分）
    'gpt-4-32k': { input: 60, output: 120 },
    'gpt-3.5-turbo': { input: 1.5, output: 2 },
    'text-embedding-ada-002': { fixed: 0.1 }
  };
  
  const modelPricing = pricing[model];
  const cost = (inputTokens / 1000) * modelPricing.input + 
               (outputTokens / 1000) * modelPricing.output;
  
  // 扣除配额
  await Subscription.updateOne(
    { userId },
    { 
      $inc: { tokensUsed: inputTokens + outputTokens },
      $set: { lastUsageAt: new Date() }
    }
  );
  
  // 记录API调用
  await APILog.create({
    userId,
    model,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    cost,
    timestamp: new Date()
  });
  
  return cost;
}
```

## 账单和发票系统

### 自动计费周期

- **月度订阅**: 每月1号自动扣费
- **年度订阅**: 每年订阅到期日自动扣费
- **按需计费**: 每月1号结算超出配额的费用

### 账单生成

每月自动生成月度账单，包含：

- 订阅费用明细
- API调用量统计
- Tokens使用详情
- 超额费用（如有）
- 优惠和折扣
- 总计金额

### 发票开具

- Pro用户：自动开具电子发票
- Enterprise用户：可申请增值税专用发票
- 发票格式：PDF格式，包含所有税务信息

## 余额不足预警机制

### 预警阈值

- **配额剩余80%**: 发送邮件提醒
- **配额剩余50%**: 发送邮件+短信提醒
- **配额剩余10%**: 发送紧急提醒，推荐升级订阅
- **配额耗尽**: 立即暂停API访问，直到充值或升级

### 预警通知

```javascript
async function checkQuotaAndNotify(userId) {
  const user = await User.findById(userId).populate('subscription');
  const { tokensUsed, tokensLimit } = user.subscription;
  const usagePercent = (tokensUsed / tokensLimit) * 100;
  
  if (usagePercent >= 80) {
    await sendEmail(user.email, {
      subject: '意念科技 - API配额预警',
      template: 'quota-warning',
      data: { usagePercent, remainingTokens: tokensLimit - tokensUsed }
    });
    
    if (usagePercent >= 50) {
      await sendSMS(user.phone, `您的API配额已使用${Math.round(usagePercent)}%，请及时充值`);
    }
  }
}
```

## 使用统计分析

### 实时统计

- 今日Tokens使用量
- 本月Tokens使用量
- API调用次数
- 平均响应时间
- 成功/失败率

### 历史统计

- 按日/周/月趋势图
- 模型使用占比
- 成本分析
- 预测下月用量

### 导出功能

Pro及以上用户可导出：

- CSV格式使用记录
- 详细API调用日志
- 成本分析报告
- PDF格式月度报表

## 管理后台

### 用户管理

- 查看所有用户及其订阅状态
- 手动升级/降级订阅
- 调整Token配额
- 查看使用详情

### 财务管理

- 收入统计
- 订阅续费率
- 退款处理
- 发票管理

### 系统监控

- API调用量监控
- 系统性能监控
- 异常告警
- 容量规划

## 安全特性

### API Key安全

- 每个用户最多创建5个API Key
- API Key可随时撤销
- 支持设置API Key过期时间
- API Key权限分级（只读/读写）

### 数据加密

- API Key使用bcrypt加密存储
- 支付信息不存储，直接通过Stripe处理
- 敏感日志脱敏显示

### 访问控制

- 基于角色的访问控制（RBAC）
- IP白名单（Enterprise功能）
- OAuth 2.0认证
- 双因素认证（2FA）

## 集成示例

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer sk_your_api_key',
    'Content-Type': 'application/json'
}

data = {
    'model': 'gpt-3.5-turbo',
    'messages': [
        {'role': 'user', 'content': '你好！'}
    ]
}

response = requests.post(
    'https://api.yinian.tech/v1/chat/completions',
    headers=headers,
    json=data
)

print(response.json())
```

### JavaScript

```javascript
const response = await fetch('https://api.yinian.tech/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: '你好！' }
    ]
  })
});

const data = await response.json();
console.log(data);
```

### curl

```bash
curl -X POST https://api.yinian.tech/v1/chat/completions \
  -H "Authorization: Bearer sk_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "你好！"}
    ]
  }'
```

## 常见问题

### Q1: 如何查看我的API使用量？

A: 登录意念科技后台，进入"API管理"→"使用统计"，可查看实时和历史使用数据。

### Q2: Tokens配额可以累积到下月吗？

A: 不可以，每月1号重置配额。建议合理规划使用量或升级订阅计划。

### Q3: 如何升级或降级订阅？

A: 在后台"订阅管理"中直接操作，系统会自动计算差价并处理。

### Q4: API Key泄露了怎么办？

A: 立即在后台撤销该Key并创建新的Key。建议定期更换API Key。

### Q5: Enterprise版支持定制化吗？

A: 支持，请联系我们的销售团队 discuss@yinian.tech，我们将根据您的需求提供定制方案。

## 技术支持

- **在线文档**: https://docs.yinian.tech
- **技术支持邮箱**: support@yinian.tech
- **企业咨询**: discuss@yinian.tech
- **工作时间**: 周一至周五 9:00-18:00（北京时间）

---

© 2026 意念科技 | 网站版本 v2026.03.26 | 滇ICP备10000001号-1
