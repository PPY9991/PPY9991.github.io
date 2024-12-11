# PPY 的个人技术博客

一个现代化的个人技术博客网站，采用响应式设计，支持中英文切换和暗黑模式。

## 在线预览

访问地址：[https://paangbaobao.cn](https://paangbaobao.cn)

## 主要特点

### 1. 视觉设计
- 现代简约的界面设计
- 流畅的动画效果
- 日间模式渐变底色
- 夜间模式星空背景
- 随机生成流星效果
- 3D 交互式头像
- 霓虹灯光效果
- 自适应的暗黑模式

### 2. 交互功能
- 优雅的语言切换开关
- 明暗主题切换
- 平滑滚动
- 返回顶部按钮
- 技能卡片悬停效果
- 社交媒体快速链接
- 邮箱和微信一键复制

### 3. 技术特性
- 响应式布局设计
- CSS Grid 和 Flexbox 布局
- CSS 自定义属性
- 原生 JavaScript 实现
- 本地化存储偏好设置
- 性能优化的动画效果
- 防抖动的 3D 交互

## 技术栈

### 前端技术
- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (ES6+)
- CSS 动画和过渡效果
- CSS 变量
- LocalStorage API
- RequestAnimationFrame 优化

### 第三方资源
- Font Awesome (图标)
- Google Fonts (Roboto)
- DevIcon (技能图标)

## 项目结构

```
/
├── index.html              # 主页面
├── css/
│   ├── style.css          # 主样式文件
│   └── dark-theme.css     # 暗黑主题样式
├── js/
│   ├── main.js           # 主要脚本文件
│   ├── translations.js   # 多语言翻译配置
│   └── i18n.js          # 国际化功能
└── images/               # 图片资源
```

## 功能详解

### 暗黑模式
- 自动检测系统主题偏好
- 手动切换主题
- 主题状态本地存储
- 平滑的过渡动画
- 星空背景效果
- 随机生成流星

### 多语言支持
- 中英文切换
- 语言偏好本地存储
- 平滑的切换动画
- 开关式切换按钮

### 3D 交互
- 头像悬停效果
- 性能优化的变换
- 防抖动处理
- 霓虹灯光效果
- 平滑的动画过渡

### 响应式设计
- 移动端优化
- 自适应布局
- 触摸友好的交互
- 优化的性能表现

## 性能优化

- 使用 `will-change` 提示
- RequestAnimationFrame 优化动画
- 防抖动处理
- 条件性动画加载
- 资源按需加载
- CSS 变量复用

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开发计划

- [ ] 添加更多交互动画
- [ ] 优化移动端体验
- [ ] 添加更多主题选项
- [ ] 优化加载性能
- [ ] 添加 PWA 支持

## 特效实现细节

### 流星效果 (Shooting Stars)

流星效果在暗色主题下自动启用，使用纯 CSS 动画实现运动轨迹，通过 JavaScript 控制生成逻辑。主要特点：

1. **生成控制**
   - 同屏流星数量：2-5颗
   - 生成频率：约每1.5-3秒检查一次
   - 生成概率：当流星数量在最小值以上时，每次检查有40%概率生成新流星
   - 位置随机：在屏幕右上方区域随机生成（top: 0-60%, right: 0-40%）

2. **动画参数**
   - 运动时长：5-8秒随机
   - 延迟时间：0-2秒随机
   - 大小缩放：0.7-1.2倍随机
   - 运动角度：基准-35度，±3度随机偏移

3. **性能优化**
   - 自动跟踪和限制活跃流星数量
   - 主题切换时自动清理
   - 动画结束后自动移除 DOM 元素
   - 使用 CSS transform 和 opacity 实现流畅动画

4. **实现代码**

```css
.shooting-star {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    animation: shooting-star-animation var(--duration, 6s) linear;
    transform-origin: right;
}

@keyframes shooting-star-animation {
    0% {
        width: 0;
        opacity: 0;
        transform: translateX(0) rotate(var(--star-angle));
    }
    10% {
        width: 100px;
        opacity: 1;
    }
    100% {
        width: 0;
        opacity: 0;
        transform: translateX(-1000px) rotate(var(--star-angle));
    }
}
```

主要配置参数：

```javascript
const config = {
    minStars: 2,           // 最小同屏流星数
    maxStars: 5,           // 最大同屏流星数
    genProbability: 0.4,   // 生成新流星的概率
    checkInterval: {        // 检查间隔（毫秒）
        min: 1500,
        max: 3000
    },
    position: {            // 生成位置范围
        top: { min: 0, max: 60 },
        right: { min: 0, max: 40 }
    },
    animation: {           // 动画参数
        duration: { min: 5, max: 8 },
        delay: { min: 0, max: 2 },
        scale: { min: 0.7, max: 1.2 },
        angle: { base: -35, variance: 3 }
    }
};
```

