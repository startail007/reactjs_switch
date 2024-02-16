開關功能(switch)
=========================
### 演示
[線上觀看](http://startail007.github.io/reactjs_switch/v1/index.html)
### 設置
|設置|默認值|描述|
|---|---|---|
|openText|`""`|開啟文字|
|closeText|`""`|關閉文字|
|open|`false`|開關,值(true或false)|
|enable|`true`|啟動,值(true或false)|
### 事件
|設置|描述|
|---|---|
|onChange(bool)|切換開關觸發|
### 默認風格
該組件會自動嵌入了一些必要的風格。
```css
.Switch{
    float: left;
    position: relative;
    display: block;
    min-width: 500px;
    min-height: 30px;
    background-color: #e8e8e8;
    --Switch-border-radius:10px;
    --Switch-border-width:1px;
    border-radius: var(--Switch-border-radius);
    border-style: solid;
    border-width: var(--Switch-border-width);
    border-color: #c7c7c7;
    -webkit-user-select:none;
}
.Switch > .Button{
    --Button-border-radius:calc(var(--Switch-border-radius) - var(--Switch-border-width));
    position: absolute;    
    display:flex;
    align-items:center;
    justify-content:center;    
    left: 0%;
    --width:50%;
    width: var(--width);
    height: 100%;
    background-color: #727272;
    border-radius: var(--Button-border-radius);
    transition: left .5s ease-out,background-color .5s ease-out;
}
.Switch > .Button > text{

}

.Switch > .Button.active{
    left: calc(100% - var(--width));
    background-color: #5ac0ff;
}
.Switch.disable{
    background-color: #8e8e8e;
}
.Switch.disable > .Button{
    background-color: #717171;
}
.Switch.disable > .Button.active{
    background-color: #717171;
}
```
### 例
```javascript
var Switch01 = ReactDOM.render(
    <Switch open = {true} openText = {"開啟"} closeText = {"關閉"} onChange = {Switch01_OnChange}/>,
    document.getElementById('example01')
);
function Switch01_OnChange(bool){
    console.log(bool);
}
```
### 許可
MIT
