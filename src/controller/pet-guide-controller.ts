import { Request, Response } from "express";
import { petPlanSchema } from "@/schema/diet-plan";
import { z } from "zod";
import { generatePetGuide } from "@/agent";
import { setupSSE } from "@/utils/setupSSE";

class PetGuideController {
  public async handle(req: Request, res: Response) {
    try {
      const bodySchema = petPlanSchema.parse(req.body);

      // 2. Só configura os headers DEPOIS que o Zod aprovar os dados
      setupSSE(res);

      const stream = generatePetGuide(bodySchema);

      for await (const chunk of stream) {
        if (chunk.startsWith("---QRCODE_START---")) {
          res.write(`data: ${chunk}\n\n`);
        } else {
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
}
export default new PetGuideController();
