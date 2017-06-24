import {Component, OnInit, NgZone} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Statics} from './statics';
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
 
 ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges() 
  
      var socket = socketIo("wss://streamer.cryptocompare.com");
      socket.emit('SubAdd', { subs: ['2~Poloniex~BTC~USD'] } );
      socket.on("m", (message) => {
        this.response = message
        var arr: Array<string> = message.split('~')
        if (arr.length > 1){
      
         console.log(arr)
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
    
        
        console.log(this.type)
      }})
  }
    constructor(private statics: Statics, private _ngZone: NgZone) {
     this.type = 5
     this.globals = this.statics.globals
  
    }
  }