import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import  { Configuration, OpenAIApi } from "openai";

@Injectable()
export class ChatGptService {

  constructor(private http: HttpClient) {}

  async processClaim(claim: string) {
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": claim}],
      max_tokens: 1000
    });
    return completion.data.choices[0].message?.content
  }

}