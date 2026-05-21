import { Request, Response } from "express";
import { dietPlanSchema } from "@/schema/diet-plan";
import { z } from "zod";
import { generateDietPlan } from "@/agent";

class DietPlanController {
  public async handle(req: Request, res: Response) {
    try {
      const bodySchema = dietPlanSchema.parse(req.body);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      res.flushHeaders();

      const stream = generateDietPlan(bodySchema);

      for await (const chunk of stream) {
        res.write(`data: ${chunk}\n\n`);
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
export default new DietPlanController();
