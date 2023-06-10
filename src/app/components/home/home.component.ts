import { Component, OnInit} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EXAMPLE_CLAIMS } from 'src/app/constants/exampleClaims';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public inputControl = new FormControl();
  public userClickedInputBool = false;
  public exampleClaims = EXAMPLE_CLAIMS;
  isThisTrueForm = this.formBuilder.group({
    claim: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.inputControl.setValue('');
    this.simulateTyping();
  }

  userClickedInput() {
    this.userClickedInputBool = true;
    this.inputControl.setValue('');
  }

  async onSubmit() {
    this.router.navigate(['/response/'], {
      queryParams: { claim: encodeURI(this.inputControl.value)}
    });
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async simulateTyping() {

    while(true) {
      const chosenStringIdx = this.getRandomInt(this.exampleClaims.length);
      const chosenString = this.exampleClaims[chosenStringIdx];

      await this.typingWord(chosenString);
      await this.delay(3000);
      await this.deletingWord(chosenString);
      await this.delay(1000);
    }
  }

  async typingWord(chosenString: string) {
    let i = 0;
    return new Promise((resolve, reject) => { 
      const intervalTyping = setInterval(() => {
        if (i < chosenString.length && !this.userClickedInputBool) {
          this.inputControl.setValue(this.inputControl.value + chosenString[i]);
          i++;
        } else {
          clearInterval(intervalTyping);
          resolve(true);
        }
      }, 100);
    });
  }

  async deletingWord(chosenString: string) {
    let i = 0;
    return new Promise((resolve, reject) => { 
      const intervalTyping = setInterval(() => {
        if (i < chosenString.length && !this.userClickedInputBool) {
          this.inputControl.setValue(this.inputControl.value.slice(0, -1));
          i++;
        } else {
          clearInterval(intervalTyping);
          resolve(true);
        }
      }, 50);
    });
  }
}
