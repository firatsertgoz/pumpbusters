import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Globals } from './globals';
import { CurrencyPair } from './CurrencyPair';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private globals: Globals){
  }
}