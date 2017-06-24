
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
    constructor(exchangeName : string) {
        this.exchangeName = exchangeName;
        this.lastPriceAverage = 0
        this.lastVolumeAverage = 0
        this.pricePercentageDifference = 5
        this.volumePercentageDifference = 5
    }
    
    updateVolume(lastVolumeTo : number){
      this.currentMinVolumeAgg.push(lastVolumeTo)
    }

    updatePrice(price : number){
      this.currentMinPriceAgg.push(price)
    }

    calculateIntervalResult(){
        var currentPriceAgg = 0
        var currentVolumeAgg = 0
      if(this.lastPriceAverage != 0 && this.lastVolumeAverage != 0)
      {
        for (let eachPrice of this.currentMinPriceAgg) {
            currentPriceAgg = currentPriceAgg + eachPrice
            }
            for (let eachVolume of this.currentMinVolumeAgg) {
                currentVolumeAgg += eachVolume
                }
            let currentPriceAverage  = currentPriceAgg/this.currentMinPriceAgg.length
            let currentVolumeAverage = currentVolumeAgg/this.currentMinVolumeAgg.length
            let criticalPointPrice   =  ((currentPriceAverage/this.lastPriceAverage) * 100) - 100
            let criticialPointVolume =  ((currentVolumeAverage/this.lastVolumeAverage) * 100) - 100
            if( criticalPointPrice > 5 && criticialPointVolume > 1)
            {
              console.log("PUMP ALERT FOR" + this.exchangeName)
            }
      }
    }
}
