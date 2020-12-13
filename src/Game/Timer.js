import { updateTimer, endGame } from "../Interface/Action"

export class Timer {
    constructor() {
        // const beginDateString = 'January 1 2020 00:00:00 GMT+0200';
        // this.beginDate = new Date(beginDateString)
        // const endDateString = 'January 1 2020 00:30:00 GMT+0200';
        // this.endDate = new Date(endDateString)
        this.nbMin = 40
        this.timerString = "00:40"
    }

    start() {
        const timerInterval = setInterval(() => {
            this.nbMin--
            if (this.nbMin == 0) {
                endGame(0)
                clearInterval(timerInterval)
            } else {
                this.timerString = this.addMinute()
                updateTimer(this)
            }
        }, 60000)
    }

    addMinute() {
        let newString = "00:"
        if (this.nbMin < 10) {
            newString += "0" + this.nbMin
        } else {
            newString += this.nbMin
        }
        return newString
    }
}