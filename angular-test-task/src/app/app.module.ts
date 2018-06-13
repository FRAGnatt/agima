import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { AnimatedNumberComponent } from './animated-number/animated-number.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimatedNumberComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
