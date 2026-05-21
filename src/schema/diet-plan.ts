import { PurposeEnum, SexEnum } from "@/types/diet-types";
import { z } from "zod";

export const dietPlanSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimo de 2 carácteres" })
    .max(30, { message: "Máximo de 30 carácteres" }),
  age: z.number().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  sex: z.nativeEnum(SexEnum),
  purpose: z.nativeEnum(PurposeEnum),
});
export type DietPlanSchema = z.infer<typeof dietPlanSchema>;
