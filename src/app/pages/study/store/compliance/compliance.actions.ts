import { Action } from '@ngrx/store'

export const LOAD_COMPLIANCE_DATA = '[Study] LOAD_COMPLIANCE_DATA'
export const LOAD_COMPLIANCE_DATA_SUCCESS =
  '[Study] LOAD_COMPLIANCE_DATA_SUCCESS'

export class LoadComplianceData implements Action {
  readonly type = LOAD_COMPLIANCE_DATA

  constructor(public payload: any) {}
}

export class LoadComplianceDataSuccess implements Action {
  readonly type = LOAD_COMPLIANCE_DATA_SUCCESS

  constructor(public payload: any) {} // TODO: Change to Compliance[] type
}

export type Actions = LoadComplianceData | LoadComplianceDataSuccess
