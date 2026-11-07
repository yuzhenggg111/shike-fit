# 轻脂航海图 · GitHub Pages 手机版

这是一个可以部署到 GitHub Pages 的纯静态减脂网页，主要针对手机使用。

## 部署到 GitHub

### 方式一：网页上传

1. 在 GitHub 新建一个仓库，例如 `leanflow`。
2. 把当前目录中的所有文件上传到仓库根目录，包括 `.github` 文件夹。
3. 打开仓库的 `Settings → Pages`。
4. 把 `Build and deployment` 的 Source 改成 **GitHub Actions**。
5. 推送到 `main` 分支，等待 `Deploy 轻脂航海图 to GitHub Pages` 完成。
6. 页面地址通常是：

```text
https://你的用户名.github.io/leanflow/
```

### 方式二：GitHub Desktop

1. 安装 GitHub Desktop。
2. 选择 `File → Add local repository`。
3. 选择当前目录。
4. 发布到 GitHub，并推送 `main` 分支。
5. 按上面的方式在 `Settings → Pages` 中选择 GitHub Actions。

仓库根目录已经包含 `.nojekyll`，不需要构建命令。

## 手机上使用

部署完成后：

### iPhone / Safari

1. 用 Safari 打开 Pages 地址。
2. 点击底部分享按钮。
3. 选择“添加到主屏幕”。

### Android / Chrome

1. 用 Chrome 打开 Pages 地址。
2. 打开浏览器菜单。
3. 选择“安装应用”或“添加到主屏幕”。

安装后会以独立 App 样式打开，已有页面资源可以离线加载。

## AI 照片识别

GitHub Pages 不能运行后端。默认使用国内可直接访问的 **DeepSeek 视觉模型**，不需要 Cloudflare。

### 1. DeepSeek 直连（推荐）

1. 登录 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys)。
2. 创建 API Key。
3. 在网页设置中选择“设备直连”。
4. AI 服务商选择“DeepSeek（国内视觉模型）”。
5. 模型保持默认 `deepseek-flash`。
6. Base URL 保持：

```text
https://api.deepseek.com
```

7. 填写 DeepSeek API Key，点击“保存 AI 配置并测试”。

说明：

- DeepSeek 的 `deepseek-flash` 支持图片输入。
- 接口使用 OpenAI 兼容的 Chat Completions 请求，可以直接传 Base64 图片。
- Key 只保存在当前手机浏览器。
- 请求直接从手机发往 DeepSeek。
- Key 不会上传到 GitHub，也不会写入仓库文件。

不要把 Key 发到聊天、截图或公开仓库中。

### 2. 阿里云百炼直连（可选）

在 AI 服务商中选择“阿里云百炼 Qwen-VL”，模型默认 `qwen3.8-max`，Base URL 为：

```text
https://dashscope.aliyuncs.com/compatible-mode/v1
```

### 3. OpenAI 直连（可选）

如果网络可以访问 `api.openai.com`，可以在 AI 服务商中切换为 OpenAI，使用 OpenAI 的视觉模型。

### 4. 安全代理（可选）

如果希望 Key 不进入手机，可以部署 [Cloudflare Worker](https://developers.cloudflare.com/workers/) 代理：

1. 在 Cloudflare 创建 Worker。
2. 把 `cloudflare-worker/worker.js` 粘贴进去。
3. 添加 Secret `OPENAI_API_KEY`。
4. 可选添加 `OPENAI_MODEL`，例如 `gpt-4.1-mini`。
5. 强烈建议添加 Secret `PROXY_TOKEN`，生成一个长随机口令。
6. 可选添加 `ALLOWED_ORIGIN`，填写你的 GitHub Pages 域名。
7. 部署后，在网页设置中选择“安全代理”，填写 Worker URL 和访问口令。

Worker URL 示例：

```text
https://leanflow-proxy.example.workers.dev
```

代理模式使用 `X-App-Token` 请求头校验访问口令，避免公开的 Worker URL 被随意消耗 API 额度。

## 数据保存在哪里

- 饮食、照片、体重和备注保存在当前浏览器的 IndexedDB。
- API Key 或代理口令保存在当前浏览器的 localStorage。
- GitHub Pages 只提供网页文件，不会接收或上传你的饮食数据。
- 换手机或清理浏览器数据前，请在设置中“导出备份”。

## 常见问题

### 打开后 AI 显示未配置

进入设置，选择“设备直连”，填写 Key，点击“保存 AI 配置并测试”。

### 设备直连测试失败

可能是网络、浏览器代理、Key 权限或模型访问权限导致。可以先打开安全代理模式。

### 手机上不能拍照

确认使用 HTTPS 地址访问 GitHub Pages，并允许浏览器使用相机。也可以从相册选择照片。

### 更新网页后手机仍显示旧版本

关闭网页后重新打开。Service Worker 使用网络优先缓存，联网时会自动获取新版本。

## API 参考

国内模式使用 DeepSeek 或阿里云百炼的 OpenAI 兼容接口；OpenAI 模式使用 Responses API：

- [DeepSeek Vision API 文档](https://api-docs.deepseek.com/guides/vision)
- [DeepSeek API Keys](https://platform.deepseek.com/api_keys)
- [阿里云百炼控制台](https://bailian.console.aliyun.com/)
- [阿里云百炼 API Key 文档](https://help.aliyun.com/zh/model-studio/get-api-key)
- [OpenAI Images and vision](https://platform.openai.com/docs/guides/images-vision)
- [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses/create)

## 免责声明

照片营养估算是近似值，实际份量、烹饪油和隐藏配料会造成误差。本工具用于趋势记录，不替代医生或注册营养师。
