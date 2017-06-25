import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Statics} from './statics';
import {CurrencyPair} from './CurrencyPair'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  type
  exchangeName
  fromCurrency
  toCurrency
  flag
  price
  lastUpdate
  lastVolume
  lastVolumeTo
  lastTradeId
  volume24h
  volume24hTo
  maskInt
  response
  globals
  currencySubs = []
  currencyMap = {}
  alertedObj = {} //alerted currencies
  calculatedProfitStr;
  fromValue = 0;
  toValue = 0
 ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges()
     

     this.statics.currencies.forEach((currencyName, index )=> {
        this.currencyMap[currencyName] = new CurrencyPair(currencyName, this);
        this.currencySubs.push(`2~BitTrex~${currencyName}~BTC`)
     });
      var socket = socketIo("wss://streamer.cryptocompare.com");
      socket.emit('SubAdd', { subs: this.currencySubs } );
      socket.on("m", (message) => {
        this.response = message
        var arr: Array<string> = message.split('~')
        if (arr.length > 1){
          this.currencyMap[arr[2]].updateVolume(parseFloat(arr[8]))
          this.currencyMap[arr[2]].updatePrice(parseFloat(arr[5]))
          this.currencyMap[arr[2]].update24hrTo(parseFloat(arr[11]))
        
          this.type = arr[0]
          this.exchangeName = arr[1]
          this.fromCurrency = arr[2]
          this.toCurrency = arr[3]
          this.flag = arr[4]
          this.price = arr[5]
          this.lastUpdate = arr[6]
          this.lastVolume = arr[7]
          this.lastVolumeTo = arr[8]
          this.lastTradeId = arr[9]
          this.volume24h = arr[10]
          this.volume24hTo = arr[11]
          this.maskInt = arr[12]
      }})
      setInterval(()=>{ this.calculateIntervalResults(); }, 30000 );
  }
    constructor(private statics: Statics) {
     this.type = 5
     this.globals = this.statics.globals
     this.statics.alertedObj = {}
    }

    calculateIntervalResults(): void {
      this.statics.currencies.forEach((currencyName, idx) => {
        this.currencyMap[currencyName].calculateIntervalResult();
      });
    }

    callback(currencyName, criticalPointPrice): void {
      this.statics.alertedObj[currencyName] = {}
      var date = new Date();
      var timestampStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var timestamp = date.getMilliseconds();
      this.statics.alertedObj[currencyName] = {
        "name": currencyName,
        "criticalPointPrice": criticalPointPrice,
        "coinigyURL": "https://www.coinigy.com/main/markets/BTRX/"+ currencyName + "/BTC",
        "timestamp": timestamp,
        "timestampStr": timestampStr
      }
      var audio = new Audio('../assets/your-turn.mp3');
      audio.play();
     // alert('ALERT' + currencyName)
    }
    keys(): Array<string> {
      return Object.keys(this.statics.alertedObj).sort((a,b) => {
        if ( b["timestamp"] >  a["timestamp"]){
          return -1;
        } else return 1
      });
    }

    getName(key){
      return this.statics.alertedObj[key].name
    }
    getCriticalPointPrice(key){
      return this.statics.alertedObj[key].criticalPointPrice;
    }
    goToCoinigy(key){
      window.open(this.statics.alertedObj[key].coinigyURL, '_blank');
    }
    getTimestampStr(key) {
      return this.statics.alertedObj[key].timestampStr;
    }

    updateFromValue(fromValue){
      this.fromValue = parseFloat(fromValue);
      this.calculateProfitOrLoss();
    }
    updateToValue(toValue){
      this.toValue = parseFloat(toValue);
      this.calculateProfitOrLoss();
    }
    calculateProfitOrLoss(){
      // console.log(this.fromValue + ' ' + this.toValue)
      if (this.fromValue > 0 && this.toValue > 0){
        if (this.fromValue > this.toValue) {
          this.calculatedProfitStr =  "-%"+ (( 1 - (this.toValue / this.fromValue) ) * 100).toFixed(1)
        } else if (this.fromValue == this.toValue){
          this.calculatedProfitStr = "%0"
        } else {
         this.calculatedProfitStr =  "+%"+ (( (this.toValue / this.fromValue) - 1) * 100).toFixed(1)
        }
      } else {
        this.calculatedProfitStr = ""
      }
    }

  }