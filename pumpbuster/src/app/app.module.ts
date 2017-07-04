import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Statics } from './statics';
import { OrdersComponent } from './orders.component';
import { ApiService } from './api.service';
import { QuotesComponent } from './quote.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    QuotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Statics, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
