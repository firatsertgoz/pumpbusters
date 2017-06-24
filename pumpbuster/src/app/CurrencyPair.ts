
export class CurrencyPair {
    volume24hTo : number
    lastVolumeTo : number
    price : number
    toCurrency : number
    fromCurrency : number
    exchangeName : string
    currentMinVolumeAgg : Array<number> = []
    currentMinPriceAgg : Array<number> = []
    lastPriceAverage : number
    lastVolumeAverage : number
    pricePercentageDifference : number
    volumePercentageDifference : Number
    initialized : boolean = false
    constructor(exchangeName : string) {
        this.exchangeName = exchangeName;
        this.lastPriceAverage = 0
        this.lastVolumeAverage = 0
        this.pricePercentageDifference = 5
        this.volumePercentageDifference = 5
    }

    updateVolume(lastVolumeTo : number){
      if(lastVolumeTo != undefined)
      this.currentMinVolumeAgg.push(lastVolumeTo)
    }

    updatePrice(price : number){
      if(price != undefined)
      this.currentMinPriceAgg.push(price)
    }

    calculateIntervalResult(){
       if (this.initialized == false){
         this.initialize()
         console.log("Initialized")
       }
       else{
        var currentPriceAgg = 0
        var currentVolumeAgg = 0
      if(this.lastPriceAverage != 0 && this.lastVolumeAverage != 0 && this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0)
      {
        for (let eachPrice of this.currentMinPriceAgg) {
            currentPriceAgg = currentPriceAgg + eachPrice
            console.log("Current Price Agg" + currentPriceAgg)
            }
            for (let eachVolume of this.currentMinVolumeAgg) {
                currentVolumeAgg += eachVolume
                }
            let currentPriceAverage  = currentPriceAgg/this.currentMinPriceAgg.length
            let currentVolumeAverage = currentVolumeAgg/this.currentMinVolumeAgg.length
            console.log("Current Prive Average =" + currentPriceAverage)
            let criticalPointPrice   =  ((currentPriceAverage/this.lastPriceAverage) * 100) - 100
            let criticialPointVolume =  ((currentVolumeAverage/this.lastVolumeAverage) * 100) - 100
            console.log("Critical Point Price = " + criticalPointPrice)
            if( criticalPointPrice > 1 && criticialPointVolume > 1)
            {
              console.log("PUMP ALERT FOR" + this.exchangeName)
            }
            this.lastPriceAverage = currentPriceAverage
            this.lastVolumeAverage = currentVolumeAverage
      }
    }
    }
    initialize()
    {
      var currentPriceAgg = 0
      var currentVolumeAgg = 0
      if(this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0)
      {
      for (let eachPrice of this.currentMinPriceAgg) {
          currentPriceAgg = currentPriceAgg + eachPrice
          }
          for (let eachVolume of this.currentMinVolumeAgg) {
              currentVolumeAgg += eachVolume
              }
      let currentPriceAverage  = currentPriceAgg/this.currentMinPriceAgg.length
      let currentVolumeAverage = currentVolumeAgg/this.currentMinVolumeAgg.length
      console.log("currentPriceAverage = " + currentPriceAverage)
      this.lastPriceAverage = currentPriceAverage
      this.lastVolumeAverage = currentVolumeAverage
      this.initialized = true
    }
  }
}
