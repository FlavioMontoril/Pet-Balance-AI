import { openAIClient } from "@/lib/openAI-client";
import { buildSystemPrompt, buildUserPrompt } from "@/prompt";
import { DietPlanSchema } from "@/schema/diet-plan";
import fs from "fs";

export async function* generateDietPlan(data: DietPlanSchema) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  const response = await openAIClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `${buildSystemPrompt()}\n\nDiretrizes Técnicas:\n${diretrizes}` },
      { role: "user", content: buildUserPrompt(data) },
    ],
    temperature: 0.6,
    stream: true,
  });

  let fullResponse = "";
  //YELD pode interromper a  execução e retornar de onde parou.
  //É como o return, porem pausa a função em vez de encerrá-las
  for await (const chunk of response) {
    const _data = chunk?.choices[0]?.delta?.content;
    if (_data) {
      fullResponse += _data;
      yield _data;
    }
  }
  console.log(fullResponse);
  // console.log(response.choices[0]?.message);
}
