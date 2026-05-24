import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

class PdfService {
  private get savePath() {
    return process.env.PUBLIC_SAVE_PATH || "./uploads";
  }

  /**
   * Converte o texto do guia em um arquivo PDF.
   */
  public async generatePetPdf(name: string, content: string): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        const sanitizedName = name.replace(/\s+/g, "-").toLowerCase();
        const fileName = `pet-guide-${sanitizedName}-${Date.now()}.pdf`;
        const filePath = path.join(this.savePath, fileName);

        // Garante que o diretório existe
        if (!fs.existsSync(this.savePath)) {
          fs.mkdirSync(this.savePath, { recursive: true });
        }

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Estilização básica do PDF
        doc.fontSize(20).text("PetBalance AI - Guia Personalizado", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Pet: ${name}`);
        doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`);
        doc.moveDown();
        doc.fontSize(12).text(content);

        doc.end();

        stream.on("finish", () => {
          resolve(fileName); // Retorna apenas o nome do arquivo para compor a URL depois
        });
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        resolve(null);
      }
    });
  }
}

export const pdfService = new PdfService();
