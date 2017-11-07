import { MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import { ENV } from '../../../environments/environment'

export const metaReducers: MetaReducer<{}>[] = !ENV.PROD ? [storeFreeze] : []
