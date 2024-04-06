import OpenAI from "openai";
// CLIENT_ID="eb0593fe0b664e90a240a4f8dfd7c4a2"
// CLIENT_SECRET="95e797b1eb1942aa81a3edb8b0e578ea"
const openai = new OpenAI({
  organization: "org-x7bVMfUykE8aXiaziu65WQdn",
  apiKey: "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",
});
export async function main(data: { text: string }) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a virtual dj that assists in setting the mood for an event.",
      },
      { role: "user", content: data.text },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}
