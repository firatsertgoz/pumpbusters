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
    arrowDown = "fa fa-arrow-down red-arrow"
    arrowUp = "fa fa-arrow-up green-arrow"
    currentArrowVol = "fa fa-minus"
    currentArrowLast = "fa fa-minus"
    currentArrowBid = "fa fa-minus"
    currentArrowAsk = "fa fa-minus"
    currentArrowHigh = "fa fa-minus"
    currentArrowLow = "fa fa-minus"

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
                this.updateLast(this.last, response["result"][0]["Last"].toFixed(8));
                this.updateVol(this.vol, response["result"][0]["BaseVolume"].toFixed(8));
                this.updateBid(this.bid, response["result"][0]["Bid"].toFixed(8));
                this.updateAsk(this.ask, response["result"][0]["Ask"].toFixed(8));
                this.high = response["result"][0]["High"].toFixed(8);
                this.low = response["result"][0]["Low"].toFixed(8);

            })
        }
    }

    updateLast(prev: number, last: number) {
        if (this.last) {
            if (prev < last) {
                this.currentArrowLast = this.arrowUp;
                this.last = last;
            } else if (prev > last) {
                this.currentArrowLast = this.arrowDown;
                this.last = last;
            }
        } else {
            this.last = last;
        }
    }
    updateVol(prev: number, vol: number) {
        if (this.vol) {
            if (prev < vol) {
                this.currentArrowVol = this.arrowUp;
                this.vol = vol;
            } else if (prev > vol) {
                this.currentArrowVol = this.arrowDown;
                this.vol = vol;
            }
        } else {
            this.vol = vol;
        }
    }
    updateBid(prev: number, bid: number) {
        if (this.bid) {
            if (prev < bid) {
                this.currentArrowBid = this.arrowUp;
                this.bid = bid;
            } else if (prev > bid) {
                this.currentArrowBid = this.arrowDown;
                this.bid = bid;
            }
        } else {
            this.bid = bid;
        }
    }
    updateAsk(prev: number, ask: number) {
        if (this.ask) {
            if (prev < ask) {
                this.currentArrowAsk = this.arrowUp;
                this.ask = ask;
            } else if (prev > ask) {
                this.currentArrowAsk = this.arrowDown;
                this.ask = ask;
            }
        } else {
            this.ask = ask;
        }
    }

}