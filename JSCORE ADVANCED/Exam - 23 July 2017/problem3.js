const status = {
  'Open': '\u2731',         //✱
  'In Progress': '\u219D ', //↝
  'Complete': '\u2714',     //✔
  'Overdue': '\u26A0'       //⚠
}

class Task {
  constructor (title, deadline) {
    this.title = title
    this.deadline = deadline
    this.status = 'Open'
  }

  get isOverdue () {
    if (this.status === 'Complete') return false
    return this.deadline < Date.now()
  }

  set deadline (deadline) {
    if (deadline < Date.now()) {
      throw new Error('cannot set date in past')
    }
    this._deadline = deadline
  }

  get deadline () { return this._deadline}

  static comparator (a, b) {

  }

  toString () {
    let icon = '\u2731'
    if (this.status === 'Complete') {
      icon = '\u2714'
    } else if (this.isOverdue) {
      icon = '\u26A0'
    } else if (this.status === 'In Progress') {
      icon = '\u219D'
    }
    return `[${icon}] ${this.title}` + (this.status !== 'Complete'
      ? (this.isOverdue
        ? ' (overdue)'
        : ` (deadline: ${this.deadline})`)
      : '')
  }

}

let date1 = new Date()
date1.setDate(date1.getDate() + 7) // Set date 7 days from now
let task1 = new Task('JS Homework', date1)
console.log(task1.toString())