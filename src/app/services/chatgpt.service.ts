import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { environment } from 'src/environments/environment';
import { PROMPT_STRING } from '../constants/prompt';

@Injectable()
export class ChatGptService {

  async processClaim(claim: string) {
    const configuration = new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const promptString = PROMPT_STRING;
    const promptClaim = promptString.replace("{input_text}", claim);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": promptClaim}],
      max_tokens: 1000
    });
    return completion.data.choices[0].message?.content
  }

}