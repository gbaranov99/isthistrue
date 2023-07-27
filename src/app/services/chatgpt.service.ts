import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { environment } from 'src/environments/environment';
import { USER_CLAIM_VERIFICATION_PROMPT, RETURNED_RESPONSE_FORMATTING_PROMPT } from '../constants/prompt';

@Injectable()
export class ChatGptService {

  async processClaim(claim: string) {
    const promptString = USER_CLAIM_VERIFICATION_PROMPT;
    const queryPayload = promptString.replace("{input_text}", claim);

    return this.queryChatGpt(queryPayload);
  }

  async formatJson(responseToFormat: string) {
    const promptString = RETURNED_RESPONSE_FORMATTING_PROMPT;
    const queryPayload = promptString.replace("{json_to_format}", responseToFormat);

    return this.queryChatGpt(queryPayload);
  }

  async queryChatGpt(queryPayload: string) {
    const configuration = new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [{"role": "system", "content": queryPayload}],
      max_tokens: 1000
    });

    if (completion?.data?.choices[0]?.message?.content) {
      return completion.data.choices[0].message?.content;
    } else {
      throw Error;
    }
  }
}
