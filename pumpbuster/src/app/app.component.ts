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

 ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges()

     this.statics.currencies.forEach((currencyName, index )=> {
        this.currencyMap[currencyName] = new CurrencyPair(currencyName)
        this.currencySubs.push(`2~BitTrex~${currencyName}~BTC`)
     });
      var socket = socketIo("wss://streamer.cryptocompare.com");
      socket.emit('SubAdd', { subs: this.currencySubs } );
      socket.on("m", (message) => {
        this.response = message
        var arr: Array<string> = message.split('~')
        if (arr.length > 1){

        this.statics.currencies.forEach((currencyName, index) => {
          if (currencyName === arr[2]){
            console.log("New Currency Name = " + currencyName)
            console.log("Upcoming Volume Update = " +arr[8])
            console.log("Upcoming Price Update = "+ arr[5])
            this.currencyMap[currencyName].updateVolume(arr[8])
            this.currencyMap[currencyName].updatePrice(arr[5])
          }
        });

        //  console.log(arr)
        //  this.type = arr[0]
        //  this.exchangeName = arr[1]
        //  this.fromCurrency = arr[2]
        //  this.toCurrency = arr[3]
        //  this.flag = arr[4]
        //  this.price = arr[5]
        //  this.lastUpdate = arr[6]
        //  this.lastVolume = arr[7]
        //  this.lastVolumeTo = arr[8]
        //  this.lastTradeId = arr[9]
        //  this.volume24h = arr[10]
        //  this.volume24hTo = arr[11]
        //  this.maskInt = arr[12]


        console.log(this.type)
      }})
      setTimeout(function(){ this.calculateIntervalResults(); }, 300000);
  }
    constructor(private statics: Statics) {
     this.type = 5
     this.globals = this.statics.globals
    }

    calculateIntervalResults(): void {
      this.statics.currencies.forEach((currencyName, idx) => {
        this.currencyMap[currencyName].calculateIntervalResult();
      });
    }

  }
