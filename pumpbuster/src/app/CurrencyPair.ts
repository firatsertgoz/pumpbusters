
export class CurrencyPair {
  volume24hTo: number
  lastVolumeTo: number
  price: number
  toCurrency: number
  fromCurrency: number
  exchangeName: string
  currentMinVolumeAgg: Array<number> = []
  currentMinPriceAgg: Array<number> = []
  lastPriceAverage: number
  lastVolumeAverage: number
  pricePercentageDifference: number
  volumePercentageDifference: Number
  initialized: boolean = false
  callback //callback to call 
  constructor(exchangeName: string, callback) {
    this.exchangeName = exchangeName;
    this.lastPriceAverage = 0
    this.lastVolumeAverage = 0
    this.pricePercentageDifference = 5
    this.volumePercentageDifference = 5
    this.callback = callback
  }

  updateVolume(lastVolumeTo: number) {
    if (lastVolumeTo) {
      this.currentMinVolumeAgg.push(lastVolumeTo)
    }
  }

  updatePrice(price: number) {
    if (price && price < 10) {
      this.currentMinPriceAgg.push(price)
    }
  }
  update24hrTo(volume24Hr) {
    this.volume24hTo = volume24Hr
  }

  calculateIntervalResult() {
    if (this.initialized == false) {
      this.initialize()
    } else {
      var currentPriceAgg = 0
      var currentVolumeAgg = 0
      if (this.lastPriceAverage != 0 && this.lastVolumeAverage != 0 && this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0) {
        for (let eachPrice of this.currentMinPriceAgg) {
          if (eachPrice > 1) {
            console.log('price too big')
            console.log(this.exchangeName)
          }
          currentPriceAgg = currentPriceAgg + eachPrice
        }
        for (let eachVolume of this.currentMinVolumeAgg) {
          currentVolumeAgg += eachVolume
        }

        let currentPriceAverage = currentPriceAgg / this.currentMinPriceAgg.length

        // console.log('CURRENT PRICE AVG' + currentPriceAverage);
        // console.log('CURRENT PRICE AVERAGE' + currentPriceAverage);
        let currentVolumeAverage = currentVolumeAgg / this.currentMinVolumeAgg.length
        let criticalPointPrice = ((currentPriceAverage / this.lastPriceAverage) * 100) - 100
        let criticialPointVolume = ((currentVolumeAverage / this.lastVolumeAverage) * 100) - 100
        // console.log('CRITICAL POINT PRICE' + criticalPointPrice)
        if (criticalPointPrice > 0.001 && criticialPointVolume > 0.001 && this.volume24hTo > 50) {
          //alert("PUMP ALERT FOR " + this.exchangeName)
          this.callback.callback(this.exchangeName, criticalPointPrice, this.lastPriceAverage)
        }
        if (criticalPointPrice < -2 && criticialPointVolume > 3 && this.volume24hTo > 200) {
          this.callback.callback(this.exchangeName, criticalPointPrice, this.lastPriceAverage)
        }
        this.lastPriceAverage = currentPriceAverage
        this.lastVolumeAverage = currentVolumeAverage
      }
      this.currentMinVolumeAgg = []
      this.currentMinPriceAgg = []

    }
  }
  initialize() {
    if (this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0) {
      var currentPriceAgg = 0
      var currentVolumeAgg = 0
      for (let eachPrice of this.currentMinPriceAgg) {
        currentPriceAgg = currentPriceAgg + eachPrice
      }
      for (let eachVolume of this.currentMinVolumeAgg) {
        currentVolumeAgg += eachVolume
      }
      let currentPriceAverage = currentPriceAgg / this.currentMinPriceAgg.length
      let currentVolumeAverage = currentVolumeAgg / this.currentMinVolumeAgg.length
      this.lastPriceAverage = currentPriceAverage
      this.lastVolumeAverage = currentVolumeAverage
      this.initialized = true
    }
  }
}



