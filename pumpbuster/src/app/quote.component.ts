import { Component, Input } from '@angular/core';
import { ApiService } from './api.service';

@Component({
    selector: 'quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css']
})

export class QuotesComponent {

    last: number;
    vol: number;
    bid: number;
    ask: number;
    high: number;
    low: number;

    constructor(private apiService: ApiService) { }
    _currency: string;
    updater

    @Input('selectedCurrency')
    set currency(changedValue: string) {
        this._currency = changedValue;
        if (this.updater) {
            clearInterval(this.updater)
        }
        this.quoteUpdater();
        this.updater = setInterval(() => { this.quoteUpdater(); }, 3000);
    }

    quoteUpdater() {

        if (this._currency) {
            this.apiService.getQuote(this._currency).then(response => {
                this.last = response["result"][0]["Last"];
                this.vol = response["result"][0]["BaseVolume"];
                this.bid = response["result"][0]["Bid"];
                this.ask = response["result"][0]["Ask"];
                this.high = response["result"][0]["High"];
                this.low = response["result"][0]["Low"];

            })
        }
    }

}