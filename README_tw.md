## 不是你的語言？  
[English](README.md) | [简体中文](README_zh.md) | **繁體中文**  

## 專案概述
這僅僅只是一個簡單的個人網頁專案

## 檔案結構
- `index.html`：主頁面檔案，包含HTML結構和部分內聯腳本。
- `styles.css`：外部CSS檔案，包含頁面的樣式。
- `scripts.js`：外部JavaScript檔案，包含頁面的互動邏輯。
- `403.html`... ：錯誤頁面。
- `dark-mode-check.js`：外部JavaScript檔案，包含附加元件偵測與禁用。

## 技術棧
- HTML5
- CSS3
- JavaScript (ES6+)

## 程式碼註釋
- 詳見檔案

## 功能說明
1. 背景圖片隨機切換：
    - 每次頁面加載時，會從`backgroundImages`隊列中隨機選擇一張圖片作為背景（正在尋找新的圖床，現圖床已過期）。
    - 背景圖片會同時應用於`body`和`.blur-background`元素。
2. 打字效果：
    - 頁面加載時，標題會以打字效果逐字顯示「Hi!歡迎來到這裡」。
    - 每個字元的顯示間隔為170毫秒，打字完成後會有700毫秒的延遲。
3. 滑鼠特效：
    - 滑鼠移動時，會跟隨一些白色圓點，圓點會圍繞滑鼠旋轉。
    - 點擊頁面時，會在點擊位置生成煙花效果，煙花粒子會隨機顏色並逐漸消失。
4. 櫻花飄落特效：
    - 頁面加載時會有櫻花飄落的特效，該特效通過外部JavaScript檔案實現。
5. 附加元件偵測：
    - 由於`Dark Reader`附加元件對此網站的背景模糊特效的適配效果不佳，當偵測到用戶使用此附加元件時，將臨時禁用此附加元件。（但是此偵測不工作，所以即將廢除）

## 依賴項
- 櫻花飄落特效：通過`https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js`引入。

## 聲明
- 除另有聲明，所有開放公共編輯的內容均使用 [MIT License](https://mit-license.org/) 協定。
- 特別感謝由[GitHub](https://github.com)提供的網頁託管服務。
- 特別感謝[DeepSeek](https://www.deepseek.com)提供的技術支持。
- 最終歸屬權由文檔撰寫者所有。
