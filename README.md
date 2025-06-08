## Is it not your language?  
[**English**](README.md) | [简体中文](README_cn.md) | [繁體中文](README_tw.md)  

## Project Overview  
This is just a simple personal webpage project.  

## File Structure  
- `index.html`: Main page file, containing HTML structure and some inline scripts.  
- `styles.css`: External CSS file, containing page styles.  
- `scripts.js`: External JavaScript file, containing interactive logic.  
- `403.html`...: Error page.  
- `dark-mode-check.js`: External JavaScript file, containing plugin detection and disabling.  

## Tech Stack  
- HTML5  
- CSS3  
- JavaScript (ES6+)  

## Code Comments  
- See files for details.  

## Features  
1. **Random Background Switching**:  
   - Each time the page loads, a random image is selected from the `backgroundImages` array as the background (currently seeking a new image host as the current one has expired).  
   - The background image is applied to both the `body` and `.blur-background` elements.  
2. **Typing Effect**:  
   - On page load, the title displays "Hi! Welcome here" with a typing animation.  
   - Each character appears with a 170ms delay, followed by a 700ms pause after completion.  
3. **Mouse Effects**:  
   - White dots follow the mouse cursor and rotate around it.  
   - Clicking the page generates a firework effect at the click position, with particles in random colors that fade gradually.  
4. **Cherry Blossom Falling Effect**:  
   - A cherry blossom falling animation is triggered on page load, implemented via an external JavaScript file.  
5. **Plugin Detection**:  
   - Due to poor compatibility with the `Dark Reader` plugin (which affects the background blur effect), the plugin is temporarily disabled when detected. (Note: This detection is currently non-functional and will soon be removed.)  

## Dependencies  
- Cherry Blossom Effect: Imported via `https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js`.  

## Declaration  
- Unless otherwise stated, all publicly editable content is licensed under the [MIT License](https://mit-license.org/).  
- Special thanks to [GitHub](https://github.com) for providing web hosting services.  
- Special thanks to [DeepSeek](https://www.deepseek.com) for technical support.  
- Final ownership belongs to the document author.  
