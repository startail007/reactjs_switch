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

var Switch = React.createClass({
    getInitialState: function() {
        return {open:(this.props.open==undefined)?false:this.props.open,enable:(this.props.enable==undefined)?true:this.props.enable,left:0,Mousedown:false};
    },
    componentWillMount: function () {
        this.LocX = 0;
        this.Obj = null;
        this.maxX = 0;
        this.move = false;
        this.time = 0;
    },
    onMouseDown: function(e) {
        if(this.state.enable){
            var now=new Date();
            this.time = now.getTime();
            this.move = false;
            this.LocX = e.clientX - Style(e.currentTarget).left;
            var Obj = e.currentTarget;
            this.maxX = Style(Obj.parentElement).width - Style(Obj).width;
            this.SetLeft(e.clientX - this.LocX);
            this.setState({Mousedown:true})
            EventUtil.addHandler(window, 'mouseup', this.onMouseUp);
            EventUtil.addHandler(e.currentTarget.parentElement, 'mousemove', this.onMouseMove);
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
        var now=new Date();
        var temp = now.getTime() - this.time
        if(temp < 250){
            this.setState({open:!this.state.open})
        }
        this.setState({Mousedown:false})
        EventUtil.removeHandler(window, 'mouseup', this.onMouseUp);
        EventUtil.removeHandler(e.currentTarget, 'mousemove', this.onMouseMove);
    },
    render: function() {
        var text = (this.state.open ? "開啟" : "關閉");
        var SwitchClass = "Switch " + (this.state.enable ? "" : "disable");
        var ButtonClass = "Button " + (this.state.open ? "active" : "");
        var title = (this.state.enable ? (this.state.open ? "開啟" : "關閉") : "禁用");
        var ButtonStyle = {};
        if(this.state.Mousedown){
            ButtonStyle.transition= 'all 0s';
            ButtonStyle.left = this.state.left + 'px';
        }
        return (
                <div className = {SwitchClass} title = {title}>  
                    <label className = {ButtonClass}  style = {ButtonStyle} onMouseDown = {this.onMouseDown}><div className = "text">{text}</div></label>
                </div> 
        );
    }
});
ReactDOM.render(
    <Switch open = {true} />,
    document.getElementById('example01')
);
ReactDOM.render(
    <Switch open = {false} />,
    document.getElementById('example02')
);
ReactDOM.render(
    <Switch open = {false} enable = {false}/>,
    document.getElementById('example03')
);