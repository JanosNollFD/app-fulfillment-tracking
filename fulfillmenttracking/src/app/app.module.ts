import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderinputComponent } from './orderinput/orderinput.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderlistComponent,
    OrderinputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
