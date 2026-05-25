import { Router } from "express";
import { router as petGuide } from "@/routes/pet-guide";
export const router = Router();

router.use("/api/pet-guide/", petGuide);
