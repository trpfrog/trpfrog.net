import { toShuffledArray } from '@trpfrog.net/utils'
import dedent from 'ts-dedent'
import { z } from 'zod'

import type { ImagePrompt } from '../domain/entities/generation-result'
import type { ChatLLMJson, ChatUtterance } from '../domain/services/llm'

type OutputWithReasoning = {
  basic: {
    reasoning: string
    prompt: string
  }
  creative: {
    reasoning: string
    prompt: string
  }
  polished: {
    reasoning: string
    prompt: string
  }
  final: {
    reasoning: string
    prompt: string
  }
  translated: string
}

export type { OutputWithReasoning as __internal_OutputWithReasoning }

const FinalPromptSchema = z.object({
  final: z.object({
    prompt: z.string(),
  }),
  translated: z.string(),
})

export function generatePromptFromWordsUseCase(deps: { jsonChatbot: ChatLLMJson }) {
  return async (sourceWords: string[]): Promise<ImagePrompt> => {
    if (sourceWords.length <= 0) {
      throw new Error('Invalid input words')
    }

    const promptPrefix = 'an icon of trpfrog'

    // Few-shot learning
    const chat: ChatUtterance[] = [
      {
        role: 'system',
        text: dedent`
          ### Your Task: Create an Engaging and Effective Image-Generation Prompt

          Your primary responsibility is to generate a visually engaging, creative, and coherent image-generation prompt for Stable Diffusion. Follow the step-by-step process below:

          #### Phase 1: Understand the Input Words
          - Carefully review the provided input words.
          - **You are not required to use all words.** Focus on selecting words that create the most compelling and coherent scene.
          - Adhere to content guidelines (e.g., SFW, inclusivity) while maintaining the potential for humor or visual appeal.

          #### Phase 2: Develop the "Basic" Prompt
          - **Purpose**: Build a simple, straightforward description based on the input words.
          - **Guideline**: Start the prompt with "${promptPrefix}" and incorporate some input words.
          - **Brainstorming**: Longer prompts are acceptable at this stage to explore ideas and establish a foundation for creativity.

          #### Phase 3: Expand with the "Creative" Prompt
          - **Purpose**: Introduce unique, funny, or unexpected elements to make the scene visually or conceptually engaging.
          - **Guideline**: Start the prompt with "${promptPrefix}" and feel free to create a longer description for brainstorming purposes.
          - **Focus**: Experiment with styles, modifiers, and additional details that enhance the scene while ensuring appropriateness and coherence.

          #### Phase 4: Refine into the "Polished" Prompt
          - **Purpose**: Streamline the creative draft into a concise, visually coherent description with approximately 20 words.
          - **Guideline**: Start the prompt with "${promptPrefix}".
          - **Refinement**: Reduce unnecessary details, ensure clarity, and maintain humor or visual intrigue. Explain how your edits improve the scene.

          #### Phase 5: Write the "Final" Prompt
          - **Purpose**: Condense the "polished" description into a prompt of **15 words or fewer.**
          - **Guideline**: The final prompt must start with "${promptPrefix}".
          - **Focus**: Prioritize clarity, visual impact, and simplicity. Explain why this version is the most effective.

          #### Phase 6: Translate the Prompt into Japanese
          - Translate the final prompt into Japanese prompt.
          - Ensure that **"trpfrog" is translated as "つまみさん".**
          - Maintain the same tone, humor, and visual intent in the translation.

          ### Tips for Writing Image Generation Prompts
          - **Be Descriptive**: Stable Diffusion performs best with specific, detailed descriptions of objects, environments, and styles.
          - **Highlight Key Elements**: Focus on the most critical aspects of the scene to guide the model effectively.
          - **Experiment with Modifiers**: Use words like "photorealistic", "vivid colors", "dramatic lighting", or "fantasy style" to influence the output.
          - **Balance Detail and Simplicity**: Avoid overloading the prompt with excessive details; prioritize coherence and clarity.
          - **Leverage Lighting and Mood**: Words like "soft lighting", "golden hour", or "ethereal glow" can add depth and atmosphere.
          - **Add Context for Realism**: Include plausible actions, interactions, or environments to make the scene feel grounded.

          ### Additional Notes
          - **Flexibility**: You are not required to use every input word. Instead, focus on selecting words that contribute to the best visual output.
          - **Brainstorming**: Longer prompts are encouraged in the "basic" and "creative" phases to allow for idea exploration.
          - **Critical Reasoning**:
            - Highlight what worked well or poorly in each phase.
            - Clearly explain your rationale for decisions and edits.
            - Keep the prompt visually striking, engaging, and humorous.

          ### Output Format:
          Provide your answer in JSON format:
          {
            "basic": {
              "reasoning": "Explanation for the phase",
              "prompt": "A longer brainstorming prompt starting with '${promptPrefix}'."
            },
            "creative": {
              "reasoning": "Explanation for the phase",
              "prompt": "A longer and more creative version starting with '${promptPrefix}'."
            },
            "polished": {
              "reasoning": "Explanation for the phase",
              "prompt": "A refined version starting with '${promptPrefix}' and about 15 words."
            },
            "final": {
              "reasoning": "Explanation for why this is the best version",
              "prompt": "A concise and engaging version with 10 words or fewer starting with '${promptPrefix}'."
            },
            "translated": "The Japanese translation of the final prompt, ensuring '${promptPrefix}' is 'つまみさ��の画像'."
          }
        `,
      },
      {
        role: 'user',
        text: toShuffledArray([...sourceWords.slice(3), 'wizard', 'castle']).join(', '),
      },
      {
        role: 'assistant',
        text: JSON.stringify({
          basic: {
            reasoning:
              'A simple prompt introducing trpfrog in a castle setting with a wizard, establishing the base scene.',
            prompt: `${promptPrefix} near a castle with a wizard`,
          },
          creative: {
            reasoning:
              "Adding glowing spells and ambient effects builds a magical atmosphere, enhancing the scene's visual appeal.",
            prompt: `${promptPrefix} near an ancient castle as a wizard casts glowing spells under moonlight`,
          },
          polished: {
            reasoning:
              'Focusing on the glowing spells and moonlight creates an immersive and visually compelling atmosphere.',
            prompt: `${promptPrefix} by a castle, a wizard casting glowing spells under moonlight`,
          },
          final: {
            reasoning:
              'This concise version retains key elements while ensuring clarity and a magical theme.',
            prompt: `${promptPrefix} by a castle, wizard casting glowing spells under moonlight`,
          },
          translated: `古城のそばで月光の下、魔法を使う魔術師と一緒のつまみさんの画像`,
        } satisfies OutputWithReasoning),
      },
      {
        role: 'user',
        text: toShuffledArray([...sourceWords.slice(2), 'floating', 'geometric shapes']).join(', '),
      },
      {
        role: 'assistant',
        text: JSON.stringify({
          basic: {
            reasoning:
              'A straightforward depiction of trpfrog among geometric shapes, setting the foundation for a surreal scene.',
            prompt: `${promptPrefix} floating among geometric shapes`,
          },
          creative: {
            reasoning:
              'Glowing effects on the shapes and a surreal background make the scene more dynamic and engaging.',
            prompt: `${promptPrefix} floating weightlessly among glowing geometric shapes in a surreal, ethereal space`,
          },
          polished: {
            reasoning:
              'Soft lighting and color effects refine the surreal feel, balancing vibrancy with visual cohesion.',
            prompt: `${promptPrefix} floating in surreal space with glowing shapes and soft colorful light`,
          },
          final: {
            reasoning:
              'This version simplifies the surreal elements while maintaining clarity and atmosphere.',
            prompt: `${promptPrefix} floating in surreal space with glowing shapes`,
          },
          translated: `超現実的な空間で光る幾何学的な形に囲まれるつまみさんの画像`,
        } satisfies OutputWithReasoning),
      },
      {
        role: 'user',
        text: toShuffledArray([...sourceWords.slice(2), 'market', 'fruit']).join(', '),
      },
      {
        role: 'assistant',
        text: JSON.stringify({
          basic: {
            reasoning:
              'A simple prompt placing trpfrog in a market with fruit, building the scene concept.',
            prompt: `${promptPrefix} in a market with fruit`,
          },
          creative: {
            reasoning:
              'Adding vendors and activity creates a lively and colorful market environment.',
            prompt: `${promptPrefix} walking through a bustling market surrounded by fruit and chatting vendors`,
          },
          polished: {
            reasoning:
              'Refining with bustling streets and vibrant energy makes the market feel more immersive.',
            prompt: `${promptPrefix} in a lively market with fruit, vendors, and bustling streets`,
          },
          final: {
            reasoning:
              'This version highlights key elements of the vibrant market scene succinctly.',
            prompt: `${promptPrefix} in a market with fruit and busy vendors`,
          },
          translated: `市場で果物と忙しい屋台に囲まれるつまみさんの画像`,
        } satisfies OutputWithReasoning),
      },
      {
        role: 'user',
        text: toShuffledArray(sourceWords).join(', '),
      },
    ]

    const { response: rawJson, modelName } = await deps.jsonChatbot(chat)

    const parsedResponse = FinalPromptSchema.passthrough().safeParse(rawJson)

    if (!parsedResponse.success) {
      throw new Error('Failed to parse chatbot response JSON')
    }

    return {
      ...parsedResponse.data,
      translated: parsedResponse.data.translated,
      text: parsedResponse.data.final.prompt.trim().toLowerCase().replace(/\.+$/, ''),
      author: modelName.trim(),
    }
  }
}
