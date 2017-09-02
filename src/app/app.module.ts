import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Globals } from './globals';
import { ApiService } from './api.service';
import { QuotesComponent } from './quote.component';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Globals, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
