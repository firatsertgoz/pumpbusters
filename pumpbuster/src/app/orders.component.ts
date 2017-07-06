import { Component, Input } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent {

  _currency: string
  apiKey: string
  needApiKey = true

  constructor(private apiService: ApiService) { }

  @Input('selectedCurrency')
  set currency(changedValue: string) {
    this._currency = changedValue;
  }

  saveApiKey(apiKey) {
    this.apiKey = apiKey;
    this.needApiKey = false;
    console.log("APIKEY: " + this.apiKey);
  }


  isOrdersHidden(): boolean {
    if (this.needApiKey) {
      return true
    }

    if (!this._currency) {
      return true;
    }
  }

  updateBTC() {
    this.apiService.getBalance(this.apiKey, "BTC");
  }


}