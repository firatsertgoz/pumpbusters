import { Component, Input } from '@angular/core';
import { Statics } from './statics'
@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {

    constructor(private statics: Statics){}

    keys(): Array<string> {
        return Object.keys(this.statics.alertedObj)
      }
}