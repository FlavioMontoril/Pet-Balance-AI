import { Router } from "express";
import * as dietPlanController from "@/controller/diet-plan-controller";
export const router = Router();

router.post("/api/diet-plan/", dietPlanController.default.handle);
