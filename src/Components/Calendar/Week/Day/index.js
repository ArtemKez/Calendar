import {Component} from "react";

export default class Day extends Component {
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