# 🥗 Nutri-AI - Dieta Server

O **Nutri-AI** é uma API de alto desempenho construída em Node.js e TypeScript, que utiliza Inteligência Artificial (OpenAI) para gerar planos alimentares semanais personalizados. A aplicação utiliza _Server-Sent Events (SSE)_ para entregar a resposta da IA em tempo real e agora conta com geração automática de PDF e QR Code para acesso móvel.

## 🚀 Funcionalidades

- **Planos Personalizados:** Gera dietas com base em Nome, Idade, Peso, Altura, Sexo e Objetivo.
- **Base de Conhecimento:** A IA utiliza um arquivo de diretrizes técnicas (`diretrizes.md`) para garantir precisão nutricional e cálculos corretos de macronutrientes e IMC.
- **Streaming de Resposta:** Entrega o texto via SSE, permitindo que o usuário veja a dieta sendo escrita instantaneamente.
- **Persistência Híbrida:**
  - **Arquivo TXT:** Salvo automaticamente em uma pasta pessoal configurada fora do projeto (ex: Meus Documentos).
  - **Arquivo PDF:** Gerado com formatação profissional e salvo na pasta `./uploads` interna.
- **QR Code Inteligente:** Gera um QR Code no final do stream que aponta para o PDF na rede local, permitindo o acesso imediato via celular.
- **Validação Rigorosa:** Uso de Zod para garantir que os dados de entrada estejam sempre corretos.
- **Arquitetura Moderna:** TypeScript com path aliases (`@/`) e separação clara de responsabilidades através de Services.

## 🛠️ Tecnologias Utilizadas

- [Node.js]
- [Express]
- [Zod]
- [TypeScript]
- [Tsc-Alias](Resolução de caminhos no build)
- [OpenAI API](https://openai.com/) (GPT-4o-mini)
- [PDFKit](http://pdfkit.org/) (Geração de documentos PDF)
- [QRCode](https://github.com/soldair/node-qrcode) (Geração de códigos QR)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js]
- [Yarn]
- Uma chave de API da [OpenAI](https://platform.openai.com/)

## 🔧 Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/dieta-server.git
   cd dieta-server
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```env
   PORT=3333
   HOST=192.168.1.XX               # Seu IP na rede local para o QR Code
   OPENAI_API_KEY=sua_chave_aqui
   SAVE_PATH=/caminho/pessoal/txt  # Onde salvar os arquivos TXT
   PUBLIC_SAVE_PATH=./uploads      # Onde salvar os PDFs públicos
   ```

## 🏃 Como Rodar

### Modo de Desenvolvimento

```bash
yarn start:dev
```

### Modo de Produção

```bash
yarn build
yarn start:prod
```

## 📡 API Endpoints

### Gerar Plano de Dieta

`POST /api/diet-plan/`

**Corpo da Requisição (JSON):**

```json
{
  "name": "Paciente 1",
  "age": 28,
  "weight": 85,
  "height": 180,
  "sex": "MASCULINO",
  "purpose": "HIPERTROFIA"
}
```

**Resposta:**
A resposta é um stream de dados (`text/event-stream`). Ao final do texto da dieta, o servidor envia o QR Code em formato Base64 delimitado por tags especiais:
`data: ---QRCODE_START---<base64_data>---QRCODE_END---`

Ao finalizar completamente o processo, a API envia:
`data: [DONE]`

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── controller/    # Lógica de controle das rotas (Express)
│   ├── lib/           # Services (OpenAI, File, Pdf, QrCode)
│   ├── schema/        # Schemas de validação de dados (Zod)
│   ├── types/         # Definições de tipos e Enums
│   ├── agent.ts       # Orquestração da IA e fluxos pós-geração
│   ├── prompt.ts      # Engenharia de prompts para a IA
│   └── index.ts       # Ponto de entrada e configuração do servidor
├── knowledge/         # Base de conhecimento técnica (.md)
├── uploads/           # Pasta de arquivos públicos (ignorada pelo Git)
└── dist/              # Código compilado para produção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
