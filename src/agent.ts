import { openAIClient } from "@/lib/openAI-client";
import { fileService } from "@/lib/file-service";
import { pdfService } from "@/lib/pdf-service";
import { qrCodeService } from "@/lib/qr-code-service";
import { buildSystemPrompt, buildUserPrompt } from "@/prompt";
import { DietPlanSchema } from "@/schema/diet-plan";
import fs from "fs";

export async function* generateDietPlan(data: DietPlanSchema) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  const response = await openAIClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `${buildSystemPrompt()}\n\nDiretrizes Técnicas:\n${diretrizes}`,
      },
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

  // Lógica pós-streaming
  try {
    // 1. Salva o TXT
    const savedPath = await fileService.saveDietToFile(data.name, fullResponse);

    if (savedPath) {
      console.log(`[FileService] Plano salvo com sucesso: ${savedPath}`);
    }

    // 2. Gera o PDF
    const pdfFileName = await pdfService.generateDietPdf(
      data.name,
      fullResponse,
    );

    if (pdfFileName) {
      const host = process.env.HOST;
      const port = process.env.PORT;
      const pdfUrl = `http://${host}:${port}/public/${pdfFileName}`;

      const qrCodeBase64 = await qrCodeService.generate(pdfUrl);

      if (qrCodeBase64) {
        // Envia o QR Code no final do stream para o frontend capturar
        yield `---QRCODE_START---${qrCodeBase64}---QRCODE_END---`;
      }
    }
  } catch (error) {
    console.error("[ERROR] Erro no fluxo pós-geração:", error);
  }
}
