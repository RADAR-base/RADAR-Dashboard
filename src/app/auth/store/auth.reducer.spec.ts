import * as authActions from './auth.actions'
import * as fromAuth from './auth.reducer'

describe('VolumeDataReducer', () => {
  describe('Logout action', () => {
    it('should return the default state', () => {
      const { initialState } = fromAuth
      const action = new authActions.Logout()
      const state = fromAuth.reducer(initialState, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Store Auth action', () => {
    it('should store data', () => {
      const { initialState } = fromAuth
      const action = new authActions.StoreAuth({
        token: '1ihi2u',
        user: { username: 'user', name: 'name', role: '0' }
      })
      const state = fromAuth.reducer(initialState, action)

      expect(state.user).toBeTruthy()
    })
  })

  describe('Login Failure action', () => {
    it('should store data', () => {
      const { initialState } = fromAuth
      const action = new authActions.LoginFailure({})
      const state = fromAuth.reducer(initialState, action)

      expect(state).toBe(initialState)
    })
  })
})
