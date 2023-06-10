import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChatGptService } from '../../services/chatgpt.service';

@Component({
  selector: 'response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {

  public claim = "";
  public gptResponse: any;
  public isLoading = true;
  public gptJson = {
    Claim: '',
    Supporting: [],
    Opposing: [],
    IsThisTrue: false,
    Justification: ''
  };
  public failedProcessingJson = false;

  constructor(
    private route: ActivatedRoute,
    private chatGptService: ChatGptService,
    private router: Router,
    ) {
    this.route.queryParams.subscribe(params => {
      this.claim = decodeURI(params['claim']);
  });
    this.getGptResponse();
  }

  async getGptResponse() {
    this.gptResponse = await this.chatGptService.processClaim(this.claim);
    this.isLoading = false;
    this.processGptResponse();
  }

  processGptResponse() {
    try {
      this.gptJson = JSON.parse(this.gptResponse);
    } catch {
      try {
        // Currently a common bug for ChatGPT to forget to close JSON bracket
        this.gptResponse = this.gptResponse += "}";
        this.gptJson = JSON.parse(this.gptResponse);
      }
      catch {
        this.failedProcessingJson = true;
      }
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
