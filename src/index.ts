import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as dietRouter } from "@/route";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta de uploads internos
const publicPath = process.env.PUBLIC_SAVE_PATH || "./uploads";
app.use("/public", express.static(publicPath));

app.use(dietRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
});
