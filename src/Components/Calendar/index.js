import React, {Component} from "react";
import Week from "./Week";
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfMonth from 'date-fns/startOfMonth'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import isToday from 'date-fns/isToday'
import WeekDays from "./Week/WeekDays";

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            monthInfo: {},
            weeks: {},
            today: new Date(),
            selectedMonth: []
        }
    }

    async componentDidMount() {
        await this.setState({
            date: Date.now()
        })
        await this.getMonthInfo();
        await this.generateMonth();
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
        this.setState({})
    }
    prevMonth = () => {
        this.setState({})
    }
    weeksArr = () => {
        return [
            [
                {
                    key: -3
                },
                {
                    key: -2
                },
                {
                    key: -1
                },
                {
                    number: 1,
                    key: 1
                },
                {
                    number: 2,
                    key: 2
                },
                {
                    number: 3,
                    key: 3
                },
                {
                    number: 4,
                    key: 4
                },
            ],
            [
                {
                    number: 5,
                    key: 5
                },
                {
                    number: 6,
                    key: 6
                },
                {
                    number: 7,
                    key: 7
                },
                {
                    number: 8,
                    key: 8
                },
                {
                    number: 9,
                    key: 9
                },
                {
                    number: 10,
                    key: 10
                },
                {
                    number: 11,
                    key: 11
                },
            ],
            [
                {
                    number: 12,
                    key: 12
                },
                {
                    number: 13,
                    key: 13
                },
                {
                    number: 14,
                    key: 14
                },
                {
                    number: 15,
                    key: 15
                },
                {
                    number: 16,
                    key: 16
                },
                {
                    number: 17,
                    key: 17
                },
                {
                    number: 18,
                    key: 18
                },
            ],
            [
                {
                    number: 19,
                    key: 19
                },
                {
                    number: 20,
                    key: 20
                },
                {
                    number: 21,
                    key: 21
                },
                {
                    number: 22,
                    key: 22
                },
                {
                    number: 23,
                    key: 23
                },
                {
                    number: 24,
                    key: 24
                },
                {
                    number: 25,
                    key: 25
                },
            ],
            [
                {
                    number: 26,
                    key: 26
                },
                {
                    number: 27,
                    key: 27
                },
                {
                    number: 28,
                    key: 28
                },
                {
                    number: 29,
                    key: 29
                },
                {
                    number: 30,
                    key: 30
                },
                {
                    number: 31,
                    isSelected: true,
                    key: 31
                },
                {
                    key: 32
                }
                // null
            ],
        ]
    }

    weekDayByNum(num) {
        const arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return arr[num % 7];
    }

    todayMonthDay = () => {
        return this.state.today.getDate() || ' '
    }
    todayWeekDay = () => {
        return this.weekDayByNum(this.state.today.getUTCDay())
    }

    weeks() {
        return this.state.selectedMonth.map(week => {
            return <Week key={`week_${week[0]['key']}`}
                         days={week}/>
        })
    }

    generateMonth = () => {
        let month = []
        const monthInfo = this.state.monthInfo;
        const firstDayIndex = monthInfo.firstDay.getDay();
        const numberOfDaysInMonth = monthInfo.lastDay.getDate();
        let date = subDays(this.state.monthInfo.firstDay, firstDayIndex);
        let monthDay = 1

        for (let i = 0; i < this.state.monthInfo.weeksCount; i++) {
            const week = (new Array(7)).fill(null);
            for (let j = 0; j < 7; j++) {
                const day = {
                    number: null,
                    isSelected: isToday(date),
                    key: date.getTime()
                }
                date = addDays(date, 1)
                if (
                    (i === 0 && j >= firstDayIndex)
                    || i > 0 && monthDay <= numberOfDaysInMonth
                ) {
                    day.number = monthDay
                    monthDay++;
                }
                week[j] = day;
            }
            month.push(week);
        }
        console.log(month);
        this.setState({
            selectedMonth: month
        })
    }

    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }

    render() {
        return (
            <>
                <div className={'calendar'}>
                    <div className={'block-color'}>
                        <div className={'current-day-of-week'}>{this.todayWeekDay()}</div>
                        <div className={'current-day'}>{this.todayMonthDay()}</div>
                    </div>
                    <div>
                        <div
                            className={'current-date'}>{this.monthDayNum(new Date().getMonth())} {new Date().getFullYear()}</div>
                        <div className={'calendar-days'}>
                            <WeekDays/>
                            {this.weeks()}
                        </div>
                    </div>
                </div>
                <button onClick={this.generateMonth}>OtherMonth</button>
            </>
        )
    }
}
