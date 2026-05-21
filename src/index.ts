import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as dietRouter } from "@/route";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(dietRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
});
