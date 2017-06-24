
export class CurrencyPair {
    volume24HTo : Number
    lastVolumeTo : Number
    price : Number
    toCurrency : Number
    fromCurrency : Number
    exchangeName : Number
    currentMinVolumeAgg : Array<Number>
    currentMinPriceAgg : Array<Number>
    lastPriceAverage : Number
    lastVolumeAverage : Number
    pricePercentageDifference : Number
    volumePercentageDifference : Number
    constructor(ExchangeName : String, FromCurrency : Number, ToCurrency : Number, Price: Number, LastVolumeTo: Number, Volume24HTo : Number) {
        this.exchangeName = ExchangeName;
        this.fromCurrency = FromCurrency;
        this.price = Price;
        this.toCurrency = ToCurrency;
        this.fromCurrency = FromCurrency;
        this.exchangeName = ExchangeName;
        this.volume24hTo = Volume24HTo
        this.lastVolumeTo = LastVolumeTo
        this.lastPriceAverage = 0
        this.lastVolumeAverage = 0
        this.pricePercentageDifference = 5
        this.volumePercentageDifference = 5
    }
    function updateVolume(LastVolumeTo : Number)
    {
      currentMinVolumeAgg.push(LastVolumeTo)
    }
    function updatePrice(Price : Number){
      currentMinPriceAgg.push(Price)
    }

    function calculateIntervalResult(){
        currentPriceAgg = 0
        currentVolumeAgg = 0
      if(lastPriceAverage != 0 && lastVolumeAverage != 0)
      {
        for (let eachPrice of currentMinPriceAgg) {
            currentPriceAgg += eachPrice
            }
            for (let eachVolume of currentMinVolumeAgg) {
                currentVolumeAgg += eachVolume
                }
            currentPriceAverage  = currentPriceAgg/currentMinPriceAgg.length
            currentVolumeAverage = currentVolumeAgg/currentMinVolumeAgg.length
            criticalPointPrice   =  ((currentPriceAverage/lastPriceAverage) * 100) - 100
            criticialPointVolume =  ((currentVolumeAverage/lastVolumeAverage) * 100) - 100
            if( criticalPointPrice > 5 && criticialPointVolume > 1)
            {
              console.log("PUMP ALERT FOR" + this.exchangeName)
            }
      }
    }
}
