import { ActivityLevelEnum, PetGoalEnum, SpeciesEnum } from "@/types/diet-types";
import { z } from "zod";

export const petPlanSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Mínimo de 2 caracteres" })
    .max(30, { message: "Máximo de 30 caracteres" }),
  species: z.nativeEnum(SpeciesEnum),
  breed: z.string().min(2, { message: "Informe a raça ou SRD" }),
  age: z.number().positive(),
  weight: z.number().positive(),
  activityLevel: z.nativeEnum(ActivityLevelEnum),
  goal: z.nativeEnum(PetGoalEnum),
});

export type PetPlanSchema = z.infer<typeof petPlanSchema>;
