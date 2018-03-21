class TrainingCourse {
  constructor (title, trainer) {
    this.title = title
    this.trainer = trainer
    this.topics = []
  }

  get firstTopic(){
    if (this.topics.length === 0) {
    return undefined
    }
    return this.topics[0]
  }

  get lastTopic (){
    if (this.topics.length === 0) {
      return undefined
    }
    return this.topics[this.topics.length-1]
  }
  addTopic (title, date) {
    let topic = {
      title, date
    }
    this.topics.push(topic)
    this.topics.sort((a,b)=>a.date-b.date)
  }

  toString(){
    if (this.topics.length === 0) {
      return `Course "${this.title}" by ${this.trainer}\n`
    }

    let result=`Course "${this.title}" by ${this.trainer}\n`
    this.topics.forEach(t=>result+=` * ${t.title} - ${t.date}\n`)
    return result.trimRight()

  }
}

let js = new TrainingCourse("JS Intro", "Svetlin Nakov");
console.log("First topic: " + JSON.stringify(js.firstTopic));
console.log("Last topic: " + JSON.stringify(js.lastTopic));
console.log("" + js);

js.addTopic("Maps", new Date(2016, 9, 6, 18, 0));
js.addTopic("JS Overview", new Date(2016, 8, 27, 18, 0));
js.addTopic("Program Logic", new Date(2016, 8, 29, 18, 0));
js.addTopic("Arrays", new Date(2016, 9, 3, 18, 0));
console.log("First topic: " + JSON.stringify(js.firstTopic));
console.log("Last topic: " + JSON.stringify(js.lastTopic));
console.log("" + js);



