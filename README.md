# 🐾 PetBalance AI - Guia de Saúde e Nutrição Animal

O **PetBalance AI** é uma API de alto desempenho construída em Node.js e TypeScript, que utiliza Inteligência Artificial (OpenAI) para gerar guias personalizados de saúde, nutrição e atividades para cães e gatos. A aplicação utiliza _Server-Sent Events (SSE)_ para entregar a resposta da IA em tempo real e conta com geração automática de PDF e QR Code para facilitar o acesso dos tutores no dia a dia.

## 🚀 Funcionalidades

- **Guias Personalizados:** Gera planos baseados em espécie, raça, idade, peso, nível de atividade e objetivo de saúde.
- **Base de Conhecimento Veterinária:** A IA utiliza diretrizes técnicas (`diretrizes.md`) baseadas em fórmulas reais de Manutenção Energética (MER) para garantir precisão nas porções de alimento.
- **Streaming de Resposta:** Entrega o guia via SSE, permitindo que o tutor veja as recomendações sendo escritas instantaneamente.
- **Persistência Híbrida:**
  - **Arquivo TXT:** Salvo automaticamente em uma pasta configurada para histórico.
  - **Arquivo PDF:** Guia formatado profissionalmente salvo na pasta `./uploads`.
- **QR Code Inteligente:** Gera um QR Code que aponta para o PDF, ideal para fixar no pote de ração ou geladeira para consulta rápida das porções.
- **Validação Rigorosa:** Uso de Zod para garantir que os dados do pet estejam sempre corretos.

## 🔄 Fluxo do Usuário

1. O usuário informa os dados do pet: **nome, peso, raça, idade, nível de atividade e meta**.
2. O sistema calcula a taxa metabólica e quanto de calorias o corpo do pet queima atualmente, com base nas diretrizes veterinárias.
3. A IA gera um plano personalizado de saúde e nutrição.
4. O guia é entregue em tempo real via streaming (SSE) e disponibilizado em PDF com um QR Code para acesso rápido.

## 🛠️ Tecnologias Utilizadas

- [Node.js]
- [Express]
- [Zod]
- [TypeScript]
  [Tsc-Alias](Resolução de caminhos no build)
- [OpenAI API](https://openai.com/) (GPT-4o-mini)
- [PDFKit](http://pdfkit.org/) (Geração de documentos PDF)
- [QRCode](https://github.com/soldair/node-qrcode) (Geração de códigos QR)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js]
- [Yarn] ou [NPM]
- Chave de API da [OpenAI]

## 🔧 Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/dieta-server.git
   cd dieta-server
   ```

2. Instale as dependências: `yarn install`.
3. Configure o `.env` (use o `.env.example` como base):
   ```env
   PORT=0000
   HOST=0.0.0.0               # Seu IP na rede local
   OPENAI_API_KEY=sua_chave_aqui
   SAVE_PATH=./history             # Onde salvar os arquivos TXT
   PUBLIC_SAVE_PATH=./uploads      # Onde salvar os PDFs
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

### Gerar Guia do Pet

`POST /api/pet-guide/`

**Corpo da Requisição (JSON):**

```json
{
  "name": "Rex",
  "species": "CÃO",
  "breed": "Golden Retriever",
  "age": 5,
  "weight": 32.5,
  "activityLevel": "MODERADO",
  "goal": "MANUTENÇÃO"
}
```
**Resposta:**
A resposta é um stream de dados (`text/event-stream`). Ao final do texto da dieta, o servidor envia o QR Code em formato Base64 delimitado por tags especiais:
`data: ---QRCODE_START---<base64_data>---QRCODE_END---`

Ao finalizar completamente o processo, a API envia:
`data: [DONE]`

## 📂 Estrutura do Projeto

```text
src/
├── controller/    # Lógica de controle das requisições
├── lib/           # Serviços externos (OpenAI, PDF, QR Code, File System)
├── middlewares/   # Interceptadores de requisições
├── schema/        # Esquemas de validação de dados (Zod)
├── types/         # Definições de tipos TypeScript
├── utils/         # Funções utilitárias (Ex: Configuração de SSE)
├── agent.ts       # Lógica de integração com a IA
├── index.ts       # Inicialização do servidor Express
├── prompt.ts      # Engenharia de prompt para a IA
└── route.ts       # Definição dos endpoints da API
knowledge/         # Base de conhecimento técnica (Diretrizes Nutricionais)
uploads/           # Armazenamento de PDFs e QR Codes gerados
```

## 📄 Autor

Desenvolvido por **Flávio Montoril**.

## ⚠️ Aviso Legal

Este sistema foi desenvolvido por um **desenvolvedor de software** utilizando inteligência artificial e **não foi criado por um médico veterinário**. 

As recomendações geradas são baseadas em diretrizes gerais e fórmulas nutricionais, mas não substituem a avaliação profissional. **Antes de seguir qualquer plano gerado por esta ferramenta, o tutor deve obrigatoriamente levar o pet a um veterinário ou nutricionista animal para uma avaliação completa.**

O desenvolvedor **não se responsabiliza** por quaisquer danos, problemas de saúde ou prejuízos causados ao animal decorrentes do uso das informações fornecidas por este sistema. O uso desta ferramenta é de inteira responsabilidade do tutor.

