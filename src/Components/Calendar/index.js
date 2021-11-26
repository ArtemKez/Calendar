import React, {Component} from "react";
import Week from "./Week";
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfMonth from 'date-fns/startOfMonth'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import isToday from 'date-fns/isToday'
import setDate from 'date-fns/setDate'
import WeekDays from "./Week/WeekDays";

import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'

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
            date: setDate(Date.now(), 1)
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

    monthDayNum() {
        let num = this.state && this.state.date && this.state.date && this.state.date.getMonth && this.state.date.getMonth() !== null
            ? this.state.date.getMonth()
            : (new Date()).getMonth();
        const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return arr[num];
    }

    nextMonth = async () => {
        await this.setState({
            date: addMonths(this.state.date, 1)
        })
        await this.getMonthInfo();
        await this.generateMonth();

    }
    prevMonth = async () => {
        await this.setState({
            date: subMonths(this.state.date, 1)
        })
        await this.getMonthInfo();
        await this.generateMonth();
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
                    || (i > 0 && monthDay <= numberOfDaysInMonth)
                ) {
                    day.number = monthDay
                    monthDay++;
                }
                week[j] = day;
            }
            month.push(week);
        }
        this.setState({
            selectedMonth: month
        })
    }

    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }

    fullYear() {
        return (this.state && this.state.date && this.state.date.getFullYear && this.state.date.getFullYear()) || (new Date()).getFullYear();
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
                        <div className={'current-date'}>
                            <button onClick={this.prevMonth}>{'<'}</button>
                            {this.monthDayNum()} {this.fullYear()}
                            <button onClick={this.nextMonth}>{'>'}</button>
                        </div>
                        <div className={'calendar-days'}>
                            <WeekDays/>
                            {this.weeks()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
