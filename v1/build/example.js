var EventUtil = {
  addHandler: function(element, type, handler, bool) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, bool | false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler, bool) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, bool | false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = undefined;
    }
  }
};

var Style = function(pElement) {
  return {
    get left() {
      return Number(pElement.style.left.replace('px', '') || pElement.offsetLeft);
    },
    set left(pValue) {
      pElement.style.left = pValue + 'px';
    },
    get top() {
      return Number(pElement.style.top.replace('px', '') || pElement.offsetTop);
    },
    set top(pValue) {
      pElement.style.top = pValue + 'px';
    },
    get width() {
      return Number(pElement.style.width.replace('px', '') || pElement.clientWidth);
    },
    set width(pValue) {
      pElement.style.width = pValue + 'px';
    },
    get height() {
      return Number(pElement.style.height.replace('px', '') || pElement.clientHeight);
    },
    set height(pValue) {
      pElement.style.height = pValue + 'px';
    },
  };
};


var Switch = React.createClass({displayName: "Switch",
    getInitialState: function() {
        return {open:(this.props.open==undefined)?false:this.props.open,enable:(this.props.enable==undefined)?true:this.props.enable,left:0,Mousedown:false,openText:this.props.openText || "",closeText:this.props.closeText || "",ChangeFun:this.props.onChange};
    },
    componentWillMount: function () {
        this.LocX = 0;
        this.maxX = 0;
        this.move = false;
        this.time = 0;
        //this.list = new EventTarget();
    },
    componentWillUnmount:function(){
    },
    componentDidUpdate: function(prevProps, prevState){
        if(!this.state.Mousedown){
            if(this.state.ChangeFun){
                this.state.ChangeFun.call(this,this.state.open);
            }
        }
    },
    OnChange:function(pFun){
        //Switch01.
        this.setState({ChangeFun:pFun});
    },
    onMouseDown: function(e) {
        if(this.state.enable){
            this.time = e.timeStamp;
            this.move = false;
            this.LocX = e.clientX - Style(this.refs.button).left;
            this.maxX = Style(this.refs.switch).width - Style(this.refs.button).width;
            this.SetLeft(e.clientX - this.LocX);
            this.setState({Mousedown:true})
            EventUtil.addHandler(window, 'mouseup', this.onMouseUp);
            EventUtil.addHandler(this.refs.switch, 'mousemove', this.onMouseMove);
        }
    },    
    SetLeft:function(value){
        var X = Math.min(Math.max(value,0),this.maxX);
        this.setState({left:X,open:X/this.maxX>=0.5});  
    },
    onMouseMove: function(e) {
        if(this.state.Mousedown){   
            this.move = true;
            this.SetLeft(e.clientX - this.LocX);       
        }
    },
    onMouseUp: function(e) {
        var temp = e.timeStamp - this.time
        if(temp < 250){
            this.setState({open:!this.state.open})
        }
        this.setState({Mousedown:false})
        EventUtil.removeHandler(window, 'mouseup', this.onMouseUp);
        EventUtil.removeHandler(this.refs.switch, 'mousemove', this.onMouseMove);
    },
    render: function() {
        var text = (this.state.open ? this.state.openText : this.state.closeText);
        var SwitchClass = "Switch " + (this.state.enable ? "" : "disable");
        var ButtonClass = "Button " + (this.state.open ? "active" : "");
        var title = (this.state.enable ? (this.state.open ? this.state.openText : this.state.closeText) : "禁用");        
        if(this.state.Mousedown){
            var ButtonStyle = {transition:'all 0s',left:this.state.left + 'px'};
        }
        return (
                React.createElement("div", {ref: "switch", className: SwitchClass, title: title}, 
                    React.createElement("label", {ref: "button", className: ButtonClass, style: ButtonStyle, onMouseDown: this.onMouseDown}, React.createElement("div", {className: "text"}, text))
                ) 
        );
    }
});
var Switch01 = ReactDOM.render(
    React.createElement(Switch, {open: true, openText: "開啟", closeText: "關閉", onChange: Switch01_OnChange}),
    document.getElementById('example01')
);
function Switch01_OnChange(bool){
    console.log(bool);
}
ReactDOM.render(
    React.createElement(Switch, {open: false}),
    document.getElementById('example02')
);
ReactDOM.render(
    React.createElement(Switch, {open: false, enable: false}),
    document.getElementById('example03')
);