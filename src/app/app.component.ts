import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Statics } from './statics';
import { CurrencyPair } from './CurrencyPair';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}