import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  number = 0;
  actualNumber = 0;

  handleButtonClick() {
    this.actualNumber = this.number
  }
}
