import {Component} from "react";

export default class Day extends Component {
    constructor(props) {
        super(props);
    }

    classes(){
        if(this.props.isSelected){
            return 'day selected'
        }
        return 'day'
    }

    render() {
        return (
            <div className={this.classes()}>{this.props.number}</div>
        );
    }
}