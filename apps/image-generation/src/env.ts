import type { Bindings } from '../worker-configuration'
import type { UseCases } from './wire'
export type Variables = {
  UCS: UseCases
}

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }
