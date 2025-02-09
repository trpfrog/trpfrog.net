import type { StandardSchemaV1 } from '@standard-schema/spec'

type SafeValidateResult<T extends StandardSchemaV1> =
  | {
      success: true
      output: StandardSchemaV1.InferOutput<T>
    }
  | {
      success: false
      issues: readonly StandardSchemaV1.Issue[]
    }

/**
 * Validate the input with the schema and return the result.
 * @param schema
 * @param input
 * @returns
 */
export function safeValidate<T extends StandardSchemaV1>(
  schema: T,
  input: StandardSchemaV1.InferInput<T>,
): SafeValidateResult<T> {
  return safeValidateUnknown(schema, input)
}

/**
 * Validate the input with the schema and throw an error if the validation fails.
 * @param schema
 * @param input
 * @returns
 */
export function validate<T extends StandardSchemaV1>(
  schema: T,
  input: StandardSchemaV1.InferInput<T>,
): StandardSchemaV1.InferOutput<T> {
  return validateUnknown(schema, input)
}

/**
 * Non-typed version of safeValidate.
 * @param schema
 * @param input
 * @returns
 */
export function safeValidateUnknown<T extends StandardSchemaV1>(
  schema: T,
  input: unknown,
): SafeValidateResult<T> {
  const result = schema['~standard'].validate(input)
  if (result instanceof Promise) {
    throw new Error('validate is async')
  }

  if (result.issues) {
    return {
      success: false,
      issues: result.issues,
    }
  }

  return {
    success: true,
    output: result.value,
  }
}

/**
 * Non-typed version of validate.
 * @param schema
 * @param input
 * @returns
 */
export function validateUnknown<T extends StandardSchemaV1>(
  schema: T,
  input: unknown,
): StandardSchemaV1.InferOutput<T> {
  const result = safeValidateUnknown(schema, input)
  if (!result.success) {
    throw new Error(JSON.stringify(result.issues, null, 2))
  }
  return result.output
}

export function validate<T extends StandardSchemaV1>(
  schema: T,
  input: StandardSchemaV1.InferInput<T>,
): StandardSchemaV1.InferOutput<T> {
  return validateUnknown(schema, input)
}

export function safeValidate<T extends StandardSchemaV1>(
  schema: T,
  input: StandardSchemaV1.InferInput<T>,
): SafeValidateResult<T> {
  return safeValidateUnknown(schema, input)
}
