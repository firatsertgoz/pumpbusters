import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Globals } from './globals';
import { CurrencyPair } from './CurrencyPair';
import { ApiService } from './api.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {
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
  currencySubs = []
  currencyMap = {}
  alertedObj = {} //alerted currencies
  calculatedProfitStr;
  fromValue = 0;
  toValue = 0
  currentCurrency = ""
  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
    this.globals.currencies.forEach((currencyName, index) => {
      this.currencyMap[currencyName] = new CurrencyPair(currencyName, this);
      this.currencySubs.push(`2~BitTrex~${currencyName}~BTC`)
    });
    var socket = socketIo("wss://streamer.cryptocompare.com");
    socket.emit('SubAdd', { subs: this.currencySubs });
    socket.on("m", (message) => {
      this.response = message
      var arr: Array<string> = message.split('~')
      if (arr.length > 1 && this.currencyMap[arr[2]]) {
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
      }
    })
    setInterval(() => { this.calculateIntervalResults(); }, 5000);
  }
  constructor(private globals: Globals, private apiService: ApiService) {
    this.globals.alertedObj = {}
  }

  calculateIntervalResults(): void {
    this.globals.currencies.forEach((currencyName, idx) => {
      this.currencyMap[currencyName].calculateIntervalResult();
    });
  }

  callback(currencyName, criticalPointPrice, lastaverage): void {
    this.globals.alertedObj[currencyName] = {}
    var date = new Date();
    var timestampStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var timestamp = date.getMilliseconds();
    this.globals.alertedObj[currencyName] = {
      "name": currencyName,
      "criticalPointPrice": criticalPointPrice,
      "timestamp": timestamp,
      "timestampStr": timestampStr,
      "lastaverage": lastaverage
    }
    var audio = new Audio('../assets/your-turn.mp3');
    audio.play();
    // window.open("https://bittrex.com/Market/Index?MarketName=BTC-" + currencyName, '_blank');
    var posneg = "pump"
    if (criticalPointPrice < 0) {
      posneg = "dump"
    }
    var utterance = new SpeechSynthesisUtterance(currencyName + posneg);
    window.speechSynthesis.speak(utterance);
  }
  keys(): Array<string> {
    return Object.keys(this.globals.alertedObj)
  }

  getName(key) {
    return this.globals.alertedObj[key].name
  }
  getCriticalPointPrice(key) {
    return this.globals.alertedObj[key].criticalPointPrice;
  }
  getTimestampStr(key) {
    return this.globals.alertedObj[key].timestampStr;
  }
  getLastAverage(key) {
    return this.globals.alertedObj[key].lastaverage;
  }
  selectCurrency(key) {
    this.globals.selectedCurrency = this.globals.alertedObj[key].name
  }
  openInBittrex(currencyName){
     window.open("https://bittrex.com/Market/Index?MarketName=BTC-" + currencyName, '_blank');
  }
}