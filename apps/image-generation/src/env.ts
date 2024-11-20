import { RequiredDependencies } from '@/domain/deps'

export type Variables = {
  DEPS: RequiredDependencies
}

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }
