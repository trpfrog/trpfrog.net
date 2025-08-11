export type Variables = Record<string, never>

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }
