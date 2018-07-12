import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { MockSources } from '../../shared/testing/mocks/mock-sources'
import { reducers } from '../../store'
import { VolumeDataService } from './volume-data.service'

describe('VolumeDataService', () => {})
