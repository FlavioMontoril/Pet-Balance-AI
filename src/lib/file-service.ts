import fs from "fs";
import path from "path";

class FileService {
  private get savePath() {
    return process.env.SAVE_PATH as string;
  }

  /**
   * Salva o conteúdo em um arquivo .txt no diretório configurado.
   * @param name Nome do pet para compor o nome do arquivo.
   * @param content Conteúdo textual do guia.
   */
  public async savePetGuideToFile(name: string, content: string): Promise<string | null> {
    try {
      const targetDir = this.savePath;
      // Normaliza o nome para o arquivo (remove espaços e coloca em lowercase)
      const sanitizedName = name.replace(/\s+/g, "-").toLowerCase();
      const fileName = `pet-guide-${sanitizedName}-${Date.now()}.txt`;
      const filePath = path.join(targetDir, fileName);

      // Garante que o diretório existe
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Escreve o arquivo
      fs.writeFileSync(filePath, content, "utf-8");
      
      return filePath;
    } catch (error) {
      console.error("Erro no FileService ao salvar arquivo:", error);
      return null;
    }
  }
}

export const fileService = new FileService();
