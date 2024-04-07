/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from 'openai';

const openai = new OpenAI({
  organization: 'org-x7bVMfUykE8aXiaziu65WQdn',
  apiKey: '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',
});

export async function main(data: { text: string }) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a virtual dj that assists in setting the mood for an event.',
      },
      { role: 'user', content: data.text },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

export async function parseSongFromRequest(song: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an expert at identifying poorly written song names and/or artists provided by users. Parse a song and artist if avaiable from the following string and give me it in the following format: {song: string, artist:string}, if youre not sure just return the orignal string in the aforementioned format.',
      },
      { role: 'user', content: song },
    ],
    model: 'gpt-3.5-turbo',
  });
  const result = completion.choices[0].message.content;
  return result;
}
