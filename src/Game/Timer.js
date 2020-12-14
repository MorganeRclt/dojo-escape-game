import { updateTimer, endGame } from "../Interface/Action"
import { say } from "../Interface/Text"

export class Timer {
    constructor(world) {
        // const beginDateString = 'January 1 2020 00:00:00 GMT+0200';
        // this.beginDate = new Date(beginDateString)
        // const endDateString = 'January 1 2020 00:30:00 GMT+0200';
        // this.endDate = new Date(endDateString)
        this.nbMin = 45
        this.timerString = "45 minutes left"
        this.world = world
    }

    start() {
        const timerInterval = setInterval(() => {
            this.nbMin--
            if (this.nbMin == 0) {
                endGame(0, this.world)
                clearInterval(timerInterval)
            } else {
                this.timerString = this.rmMinute()
                updateTimer(this)
            }
        }, 60000)
    }

    rmMinute() {
        let newString = ""
        if (this.nbMin < 10) {
            newString += "0" + this.nbMin
        } else {
            newString += this.nbMin
        }
        newString += " minutes left"
        return newString
    }

    rmMinuteClue(nbMinToRm) {
        this.nbMin -= nbMinToRm
        if (this.nbMin <= 0) {
            endGame(0, this.world)
        } else {
            let newString = ""
            if (this.nbMin < 10) {
                newString += "0" + this.nbMin
            } else {
                newString += this.nbMin
            }
            newString += " minutes left"
            this.timerString = newString
            updateTimer(this)
            say(`${this.world.player.name} uses a clue : -1 minute.`)
        }
    }
}