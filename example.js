var Switch = React.createClass({
    getInitialState: function() {
        return {open:(this.props.open==undefined)?false:this.props.open,enable:(this.props.enable==undefined)?true:this.props.enable};
    },
    onClick: function(e) {
        if(this.state.enable){
            this.setState({open: !this.state.open});
        }
    },
    render: function() {
        var text = (this.state.open ? "開啟" : "關閉");
        console.log(this.state.enable)
        var SwitchClass = "Switch " + (this.state.enable ? "" : "disable");
        var ButtonClass = "Button " + (this.state.open ? "active" : "");
        var title = (this.state.enable ? (this.state.open ? "開啟" : "關閉") : "禁用");
        return (
                <div className = {SwitchClass} onClick = {this.onClick} title = {title}>  
                    <label className = {ButtonClass}><div className = "text">{text}</div></label>
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