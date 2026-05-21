# 🥗 Nutri-AI - Dieta Server

O **Nutri-AI** é uma API de alto desempenho construída em Node.js e TypeScript, que utiliza Inteligência Artificial (OpenAI) para gerar planos alimentares semanais personalizados. A aplicação utiliza *Server-Sent Events (SSE)* para entregar a resposta da IA em tempo real (streaming).

## 🚀 Funcionalidades

- **Planos Personalizados:** Gera dietas com base em Nome, Idade, Peso, Altura, Sexo e Objetivo.
- **Base de Conhecimento:** A IA utiliza um arquivo de diretrizes técnicas (`diretrizes.md`) para garantir cálculos precisos de macronutrientes e IMC.
- **Streaming de Resposta:** Entrega o texto via SSE, permitindo que o usuário veja a dieta sendo escrita instantaneamente.
- **Validação Rigorosa:** Uso de Zod para garantir que os dados de entrada estejam sempre corretos.
- **Arquitetura Moderna:** TypeScript com path aliases (`@/`), facilitando a manutenção e legibilidade.

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) (v20+)
- [Express](https://expressjs.com/)
- [OpenAI API](https://openai.com/) (GPT-4o-mini)
- [Zod](https://zod.dev/) (Validação de schemas)
- [TypeScript](https://www.typescriptlang.org/)
- [Tsc-Alias](https://github.com/mgechev/tsc-alias) (Resolução de caminhos no build)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)
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
   OPENAI_API_KEY=sua_chave_aqui
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
  "name": "João Silva",
  "age": 28,
  "weight": 85,
  "height": 180,
  "sex": "MASCULINO",
  "purpose": "HIPERTROFIA"
}
```

**Resposta:**
A resposta é um stream de dados (`text/event-stream`). Cada pedaço de texto é enviado no formato:
`data: conteúdo aqui`

Ao finalizar, a API envia:
`data: [DONE]`

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── controller/    # Lógica de controle das rotas
│   ├── lib/           # Clientes de serviços externos (OpenAI)
│   ├── schema/        # Schemas de validação (Zod)
│   ├── types/         # Definições de tipos e Enums
│   ├── agent.ts       # Lógica de integração com a IA
│   ├── prompt.ts      # Engenharia de prompts
│   └── index.ts       # Ponto de entrada da aplicação
├── knowledge/         # Base de conhecimento técnica (.md)
└── dist/              # Código compilado para produção
```

