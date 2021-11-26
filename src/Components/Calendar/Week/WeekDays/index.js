import React, {Component} from "react";

export default class WeekDays extends Component{

    render() {
        return (
            <div className={'week red-letters'}>
                <div className={'day'}>s</div>
                <div className={'day'}>m</div>
                <div className={'day'}>t</div>
                <div className={'day'}>w</div>
                <div className={'day'}>t</div>
                <div className={'day'}>f</div>
                <div className={'day'}>s</div>
            </div>
        )
    }
}