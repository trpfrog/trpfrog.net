import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { InvalidChatLLMOutputError } from '../../domain/services/llm'
import { createOpenAIChatLLMJson } from './llm'

function stubResponsesApi(text: string) {
  const fetchMock = vi.fn<typeof fetch>(async () =>
    Response.json({
      id: 'resp_1',
      created_at: 0,
      model: 'test-model',
      output: [
        {
          type: 'message',
          id: 'msg_1',
          role: 'assistant',
          content: [{ type: 'output_text', text, annotations: [] }],
        },
      ],
      usage: { input_tokens: 1, output_tokens: 1 },
    }),
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('createOpenAIChatLLMJson', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('accepts a chat with a system utterance and parses the JSON output', async () => {
    const fetchMock = stubResponsesApi('{"answer":"ok"}')
    const llm = createOpenAIChatLLMJson({ model: 'test-model', apiKey: 'dummy' })

    const result = await llm(
      [
        { role: 'system', text: 'system text' },
        { role: 'user', text: 'user text' },
      ],
      {
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['answer'],
          properties: { answer: { type: 'string' } },
        },
        schemaName: 'answer',
      },
    )

    expect(result).toMatchObject({ response: { answer: 'ok' }, modelName: 'test-model' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const body = JSON.stringify(fetchMock.mock.calls[0]?.[1]?.body)
    expect(body).toContain('system text')
    expect(body).toContain('user text')
  })

  it('reports unparsable model output as InvalidChatLLMOutputError', async () => {
    stubResponsesApi('not json')
    const llm = createOpenAIChatLLMJson({ model: 'test-model', apiKey: 'dummy' })

    await expect(
      llm([{ role: 'user', text: 'user text' }], {
        schema: { type: 'object' },
        schemaName: 'answer',
      }),
    ).rejects.toBeInstanceOf(InvalidChatLLMOutputError)
  })
})
