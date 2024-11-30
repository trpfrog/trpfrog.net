import { Usecases } from './wire'

export type Variables = {
  UCS: Usecases
}

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }
