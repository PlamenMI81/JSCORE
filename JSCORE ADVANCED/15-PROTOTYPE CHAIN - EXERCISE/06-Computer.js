function createComputerHierarchy () {
  class Keyboard {
    constructor (manufacturer, responseTime) {
      this.manufacturer = manufacturer
      this.responseTime = responseTime
    }
  }

  class Monitor {
    constructor (manufacturer, width, height) {
      this.manufacturer = manufacturer
      this.width = width
      this.height = height
    }
  }

  class Battery {
    constructor (manufacturer, expectedLife) {
      this.manufacturer = manufacturer
      this.expectedLife = expectedLife
    }
  }

  class Computer {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace) {
      if (new.target === Computer) {
        throw new TypeError('Abstract class cannot be instantiated directly')
      }
      this.manufacturer = manufacturer
      this.processorSpeed = processorSpeed
      this.ram = ram
      this.hardDiskSpace = hardDiskSpace
    }
  }

  class Laptop extends Computer {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace)
      this.weight = weight
      this.color = color
      this.battery = battery
    }

    set battery (bat) {
      if (!(bat instanceof Battery)) {
        throw TypeError(bat+' is not battery')
      }
      this._battery = bat
    }

    get battery () {
      return this._battery
    }
  }
  class Desktop extends Computer {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace, keyboard,monitor) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace)
      this.keyboard = keyboard
      this.monitor = monitor
    }

    set keyboard (kbd) {
      if (!(kbd instanceof Keyboard)) {
        throw TypeError(kbd+' is not keyboard')
      }
      this._keyboard = kbd
    }

    get keyboard () {
      return this._keyboard
    }

    set monitor (mnt) {
      if (!(mnt instanceof Monitor)) {
        throw TypeError(mnt+' is not monitor')
      }
      this._monitor = mnt
    }

    get monitor () {
      return this._monitor
    }
  }

  return {
    Battery,
    Keyboard,
    Monitor,
    Computer,
    Laptop,
    Desktop
  }
}
