import { UseCases } from './wire'
export type Variables = {
  UCS: UseCases
}

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }
