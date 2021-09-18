import { createSlice } from '@reduxjs/toolkit'
import { api, User } from './auth'
import type { RootState } from 'store'

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload: { user, token } }) => {
        state.user = user
        state.token = token
        state.isAuthenticated = true
      },
    )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
