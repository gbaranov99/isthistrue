import { Component, OnInit} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public inputControl = new FormControl();
  public userClickedInputBool = false;
  public exampleInputs = [
    'The sky isn\'t blue',
    'The sky is blue',
    'The sky is falling',
    'The grass is greener',
    'The moon is cheese',
    'Trump won in 2020',
    'Biden won in 2020',
    'We\'ve met alien life',
    'AI will soon take over',
    'Yellow is the best color',
    'There\'s life on mars',
    'The Earth is flat',
    'The Earth is round'
  ];

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
      const chosenStringIdx = this.getRandomInt(this.exampleInputs.length);
      const chosenString = this.exampleInputs[chosenStringIdx];

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
