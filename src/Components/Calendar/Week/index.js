import {Component} from "react";
import Day from "./Day";

export default class Week extends Component {
    
    days() {
        return this.props.days.map((day, index) => {
            return <Day number={day?.number} key={day.key} isSelected={day?.isSelected}/>
        })
    }

    render() {
        return (
            <div className={'week'}>
                {this.days()}
            </div>
        );
    }
}