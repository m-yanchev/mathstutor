type OffsetOptions = {
    month?: number,
    week?: number,
    day?: number,
    hour?: number,
    minute?: number
}

type OffsetFromBeginningType = "week"

export type FormatType = "day.month" | "hour:minute"

export default class TimeDate {

    _date: Date

    constructor(timeStamp: number) {
        this._date = new Date(timeStamp)
    }

    static create(timeStamp: number): TimeDate {
        return new TimeDate(timeStamp)
    }

    static createBySec(timeStampSec: number): TimeDate {
        return new TimeDate(timeStampSec * 1000)
    }

    static get now(): TimeDate {
        return new TimeDate(Date.now())
    }

    get date(): Date {
        return this._date
    }

    get timeStamp(): number {
        return this._date.valueOf()
    }

    get minute(): number {
        return this._date.getMinutes()
    }

    get hour(): number {
        return this._date.getHours()
    }

    get day(): number {
        return this._date.getDate()
    }

    get month(): number {
        return this._date.getMonth()
    }

    get weekDay(): number {
        return this._date.getDay()
    }

    format(type: FormatType): string {
        const toString = value => (value < 10 ? "0" : "") + value
        switch (type) {
            case "day.month":
                return `${toString(this.day)}.${toString(this.month + 1)}`
            case "hour:minute" :
                return `${toString(this.hour)}:${toString(this.minute)}`
        }
    }

    offset({month, week, day, hour, minute} : OffsetOptions): TimeDate {
        const offsetMS = (minute ? minute * 60000 : 0) + (hour ? hour * 60 * 60000 : 0) +
            (day ? day * 24 * 60 * 60000 : 0) + (week ? week * 7 * 24 * 60 * 60000 : 0)
        let timeStamp = this._date.valueOf() + offsetMS
        if (month) {
            const date = new Date(timeStamp)
            timeStamp = date.setMonth(date.getMonth() + month)
        }
        return TimeDate.create(timeStamp)
    }

    offsetFromBeginning(something: OffsetFromBeginningType, options: OffsetOptions): TimeDate {
        const day = this._date.getDay()
        const hour = this._date.getHours()
        const minute = this._date.getMinutes()
        const second = this._date.getSeconds()
        const milliSecond = this._date.getMilliseconds()
        let timeStamp = this._date.valueOf()
        switch (something) {
            case "week":
                timeStamp = timeStamp - milliSecond - second * 1000 - minute * 60 * 1000 - hour * 60 * 60 * 1000 -
                    day * 24 * 60 * 60 * 1000
        }
        return TimeDate.create(timeStamp).offset(options)
    }

    earlierThan(timeDate: TimeDate): boolean {
        return this._date < timeDate.date
    }

    dayCountTo(timeDate: TimeDate): number {
        const dayMS = 1000 * 60 * 60 * 24
        return Math.floor(+timeDate.date / dayMS) - Math.floor(+this.date / dayMS) + 1
    }
}