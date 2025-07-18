## 不是你的语言？  
[English](README.md) | **简体中文** | [繁體中文](README_tw.md)  

## 项目概述
这是仅仅只是一个简单的个人网页项目

## 文件结构
- `index.html`：主页面文件，包含HTML结构和部分内联脚本。
- `styles.css`：外部CSS文件，包含页面的样式。
- `scripts.js`：外部JavaScript文件，包含页面的交互逻辑。
- `403.html`... ：错误页面。
- `dark-mode-check.js`：外部JavaScript文件，包含插件检测与禁用。

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)

## 代码注释
- 详见文件

## 功能说明
1. 背景图片随机切换：
    - 每次页面加载时，会从`backgroundImages`数组中随机选择一张图片作为背景（正在寻找新的图床，现图床以过期）。
    - 背景图片会同时应用于`body`和`.blur-background`元素。
2. 打字效果：
    - 页面加载时，标题会以打字效果逐字显示“Hi!欢迎来到这里”。
    - 每个字符的显示间隔为170毫秒，打字完成后会有700毫秒的延迟。
3. 鼠标特效：
    - 鼠标移动时，会跟随一些白色圆点，圆点会围绕鼠标旋转。
    - 点击页面时，会在点击位置生成烟花效果，烟花粒子会随机颜色并逐渐消失。
4. 樱花飘落特效：
    - 页面加载时会有樱花飘落的特效，该特效通过外部JavaScript文件实现。
5. 插件检测：
    - 由于`Dark Reader`插件对此网站的背景模糊特效的适配效果不佳，当检测到用户使用此插件时，将临时禁用此插件。（但是此检测不工作，所以即将废除）

## 依赖项
- 樱花飘落特效：通过`https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js`引入。

## 声明
- 除另有声明，所有开放公共编辑的内容均使用 [MIT License](https://mit-license.org/) 协议。
- 特别感谢由[GitHub](https://github.com)提供的网页托管服务。
- 特别感谢[DeepSeek](https://www.deepseek.com)提供的技术支持。
- 最终归属权由文档撰写者所有。
