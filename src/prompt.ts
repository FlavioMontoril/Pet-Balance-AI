import { PetPlanSchema } from "./schema/diet-plan";

export function buildSystemPrompt() {
  return [
    `Você é o PetBalance AI, um assistente especializado em saúde e nutrição para cães e gatos.
    Sua missão é criar guias personalizados de alimentação e bem-estar.
    
    Regras fixas:
    - Sempre responda em texto markdown legível para humanos.
    - Use # para títulos e - para itens de lista.
    - Calcule a Necessidade Energética de Repouso (NER) e a de Manutenção (NEM) com base no peso e atividade.
    - Informe claramente a quantidade total de calorias por dia.
    - Sugira uma rotina diária de alimentação e exercícios/atividades.
    - SEMPRE inclua uma lista de alimentos proibidos para a espécie.
    - NUNCA sugira medicamentos ou diagnósticos médicos; foque em nutrição e estilo de vida.
    - Se a raça for informada, inclua uma curiosidade ou cuidado específico comum a essa raça.
    - Não responda em JSON, apenas markdown legível.
    - Finalize com uma mensagem carinhosa para o pet pelo nome.`,
  ].join("\n");
}

export function buildUserPrompt(input: PetPlanSchema) {
  return [
    "Gere um guia completo de saúde e nutrição para o seguinte pet:",
    `- Nome: ${input.name}`,
    `- Espécie: ${input.species}`,
    `- Raça: ${input.breed}`,
    `- Idade: ${input.age} anos`,
    `- Peso: ${input.weight} kg`,
    `- Nível de Atividade: ${input.activityLevel}`,
    `- Objetivo: ${input.goal}`,
  ].join("\n");
}

export function buildDocSystemPrompt(doc: string) {
  return `Diretrizes Técnicas Veterinárias: ${doc}`;
}
