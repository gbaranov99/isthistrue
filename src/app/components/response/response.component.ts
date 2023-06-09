import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGptService } from '../../services/chatgpt.service';

@Component({
  selector: 'response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {

  public claim = "";
  public gptResponse: any;

  constructor(private route: ActivatedRoute,
              private chatGptService: ChatGptService,
    ) {
    this.route.queryParams.subscribe(params => {
      this.claim = decodeURI(params['claim']);
  });
    this.getGptResponse();
  }

  async getGptResponse() {
    this.gptResponse = await this.chatGptService.processClaim(this.claim);
    console.log(this.gptResponse)
  }
}