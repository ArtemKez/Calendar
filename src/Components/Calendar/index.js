import React, {Component} from "react";
import Week from "./Week";
import Day from "./Week/Day";
import WeekDays from "./Week/WeekDays";

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    nextMonth = () => {

    }

    prevMonth = () => {

    }

    weeksArr = () => {
        return [
            [
                null,
                null,
                null,
                {
                    number: 1
                },
                {
                    number: 2
                },
                {
                    number: 3
                },
                {
                    number: 4
                },
            ],
            [
                {
                    number: 5
                },
                {
                    number: 6
                },
                {
                    number: 7
                },
                {
                    number: 8
                },
                {
                    number: 9
                },
                {
                    number: 10
                },
                {
                    number: 11
                },
            ],
            [
                {
                    number: 12
                },
                {
                    number: 13
                },
                {
                    number: 14
                },
                {
                    number: 15
                },
                {
                    number: 16
                },
                {
                    number: 17
                },
                {
                    number: 18
                },
            ],
            [
                {
                    number: 19
                },
                {
                    number: 20
                },
                {
                    number: 21
                },
                {
                    number: 22
                },
                {
                    number: 23
                },
                {
                    number: 24
                },
                {
                    number: 25
                },
            ],
            [
                {
                    number: 26
                },
                {
                    number: 27
                },
                {
                    number: 28
                },
                {
                    number: 29
                },
                {
                    number: 30
                },
                {
                    number: 31,
                    isSelected: true
                },
                null
            ],
        ]
    }

    weeks() {
        return this.weeksArr().map(week => {
            return <Week days={week}/>
        })
    }

    render() {
        return (
            <div className={'calendar'}>
                <div className={'block-color'}>
                    <div className={'current-day-of-week'}>friday</div>
                    <div className={'current-day'}>31</div>
                </div>
                <div>
                    <div className={'current-date'}>july 2020</div>
                    <div className={'calendar-days'}>
                        <WeekDays />
                        {this.weeks()}
                    </div>
                </div>
            </div>
        )
    }
}
