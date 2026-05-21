import QRCode from "qrcode";

class QrCodeService {
  /**
   * Gera um QR Code em formato Base64 a partir de uma URL.
   */
  public async generate(url: string): Promise<string | null> {
    try {
      const qrDataUrl = await QRCode.toDataURL(url);
      return qrDataUrl;
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
      return null;
    }
  }
}

export const qrCodeService = new QrCodeService();
