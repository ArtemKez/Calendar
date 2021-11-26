import React, {Component} from "react";
import Week from "./Week";
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfMonth from 'date-fns/startOfMonth'

import WeekDays from "./Week/WeekDays";

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            monthInfo: {},
            weeks: {},
        }
    }
    async componentDidMount() {
        await this.setState({
            date: Date.now()
        })
        await this.getMonthInfo()
    }
    async getMonthInfo() {
        const weeksCount = getWeeksInMonth(this.state.date);
        const lastDay = lastDayOfMonth(this.state.date);
        const firstDay = startOfMonth(this.state.date);
        await this.setState({monthInfo: {weeksCount, lastDay, firstDay}})
    }
    monthDayNum(num) {
        const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return arr[num % 12];
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
    weekDayByNum(num) {
        const arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return arr[num % 7];
    }
    todayMonthDay = () => {
        return new Date().getDate() || ' '
    }
    todayWeekDay = () => {
        return this.weekDayByNum(new Date().getUTCDay())
    }
    weeks() {
        console.log(this.weeksArr().map(week => {
            return <Week key={JSON.stringify(week)} days={week}/>
        }))
        return this.weeksArr().map(week => {
            return <Week key={JSON.stringify(week)} days={week}/>
        })
    }
    render() {
        return (
            <div className={'calendar'}>
                <div className={'block-color'}>
                    <div className={'current-day-of-week'}>{this.todayWeekDay()}</div>
                    <div className={'current-day'}>{this.todayMonthDay()}</div>
                </div>
                <div>
                    <div className={'current-date'}>{this.monthDayNum(new Date().getMonth())} {new Date().getFullYear()}</div>
                    <div className={'calendar-days'}>
                        <WeekDays/>
                        {this.weeks()}
                    </div>
                </div>
            </div>
        )
    }
}
