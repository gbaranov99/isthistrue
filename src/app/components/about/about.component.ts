import { Component } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  public mobileView = false;

  constructor() {
    this.setScreenSize();
  }

  setScreenSize() {
    if (screen.width <= 750) {
      this.mobileView = true;
    }
  }
}
