// Worker bindings inferred from cloudflare.config.ts. Edit the config, not this file.
import type { InferEnv, UnwrapConfig } from 'cf/config'

import type config from './cloudflare.config'

type WorkerConfig = UnwrapConfig<UnwrapConfig<typeof config>['worker']>

export type Bindings = InferEnv<WorkerConfig>
