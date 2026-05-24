import { Router } from "express";
import * as petGuideController from "@/controller/pet-guide-controller";
export const router = Router();

router.post("/api/pet-guide/", petGuideController.default.handle);
