
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
      if (lastVolumeTo){
        this.currentMinVolumeAgg.push(lastVolumeTo)
      }
    }

    updatePrice(price : number){
      if (price) {
        this.currentMinPriceAgg.push(price)
      }
    }

    calculateIntervalResult(){
       if (this.initialized == false){
         this.initialize()
       } else {
          var currentPriceAgg = 0
          var currentVolumeAgg = 0
        if(this.lastPriceAverage != 0 && this.lastVolumeAverage != 0 && this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0)
        {
          for (let eachPrice of this.currentMinPriceAgg) {
              if (eachPrice > 1){
                console.log('price too big')
                console.log(this.exchangeName)
              }
              currentPriceAgg = currentPriceAgg + eachPrice
            }
              for (let eachVolume of this.currentMinVolumeAgg) {
                  currentVolumeAgg += eachVolume
                }
             
              let currentPriceAverage  = currentPriceAgg/this.currentMinPriceAgg.length
                 
              console.log('CURRENT PRICE AVG' + currentPriceAverage);
              console.log('CURRENT PRICE AVERAGE' + currentPriceAverage);
              let currentVolumeAverage = currentVolumeAgg/this.currentMinVolumeAgg.length
              let criticalPointPrice   =  ((currentPriceAverage/this.lastPriceAverage) * 100) - 100
              let criticialPointVolume =  ((currentVolumeAverage/this.lastVolumeAverage) * 100) - 100
              console.log('CRITICAL POINT PRICE' + criticalPointPrice)
              if( criticalPointPrice > 1 && criticialPointVolume > 1)
              {
                alert("PUMP ALERT FOR " + this.exchangeName)
              }
              this.lastPriceAverage =  currentPriceAverage
              this.lastVolumeAverage =  currentVolumeAverage
        }
        this.currentMinVolumeAgg = []
        this.currentMinPriceAgg = []
       }
    }
    initialize()
    {
      console.log(this.currentMinPriceAgg.length);
      if(this.currentMinPriceAgg.length > 0 && this.currentMinVolumeAgg.length > 0){
       
      var currentPriceAgg = 0
      var currentVolumeAgg = 0
      for (let eachPrice of this.currentMinPriceAgg) {
          console.log(eachPrice)
          currentPriceAgg = currentPriceAgg + eachPrice
          }
          for (let eachVolume of this.currentMinVolumeAgg) {
              currentVolumeAgg += eachVolume
              }
      let currentPriceAverage  = currentPriceAgg/this.currentMinPriceAgg.length
      let currentVolumeAverage = currentVolumeAgg/this.currentMinVolumeAgg.length
      this.lastPriceAverage = currentPriceAverage
      this.lastVolumeAverage = currentVolumeAverage
      this.initialized = true
    }
    }
}