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

  public mobileView = false;
  public claim = "";
  public gptResponse = "";
  public isLoading = true;
  public failedProcessingJson = false;
  public failedApiCall = false;
  public errResponse = "";
  public gptJson = {
    Claim: '',
    Supporting: [],
    Opposing: [],
    IsThisTrue: false,
    Justification: ''
  };

  constructor(
    private route: ActivatedRoute,
    private chatGptService: ChatGptService,
    private router: Router,
    ) {
    this.route.queryParams.subscribe(params => {
      this.claim = decodeURI(params['claim']);
    });
    this.setScreenSize();
    this.getGptResponse();
  }

  setScreenSize() {
    if (screen.width <= 750) {
      this.mobileView = true;
    }
  }

  async getGptResponse() {
    this.gptResponse = await this.chatGptService.processClaim(this.claim)
      .catch((err : Error) => {
        this.failedApiCall = true;
        this.errResponse = err.message;
        this.isLoading = false;
      }) as string;

    if (!this.failedApiCall) {
      this.processGptResponse();
    }
  }

  getSupportOpposeList(gptList : object | string) {
    if (typeof gptList === 'object') {
      return JSON.stringify(gptList, null,'\t');
    } else {
      return gptList;
    }
  }

  async parseResponse() {
    this.gptResponse = this.gptResponse.replace('```', '');
    this.gptResponse = this.gptResponse.replace(/json/i, '');
    this.gptJson = JSON.parse(this.gptResponse);
    this.isLoading = false;
  }

  async processGptResponse() {
    try {
      this.parseResponse();
    } catch {
      // If ChatGPT returns incorrect JSON formatting,
      // Send the response back to ChatGPT to properly format it
      try {
        this.gptResponse = await this.chatGptService.formatJson(this.gptResponse)
          .catch((err : Error) => {
            this.failedApiCall = true;
            this.errResponse = err.message;
            this.isLoading = false;
          }) as string;
        
        this.parseResponse();
      } catch {
        this.failedProcessingJson = true;
        this.isLoading = false;
      }
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
