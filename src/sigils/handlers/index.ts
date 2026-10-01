import type { HandlerMap } from './api'
import { handlers as BL } from './BL'
import { handlers as DU } from './DU'
import { handlers as GR } from './GR'
import { handlers as GY } from './GY'
import { handlers as OR } from './OR'
import { handlers as PU } from './PU'
import { handlers as RE } from './RE'
import { handlers as TE } from './TE'

export const HANDLERS: HandlerMap = { ...RE, ...OR, ...GR, ...BL, ...TE, ...PU, ...GY, ...DU }
