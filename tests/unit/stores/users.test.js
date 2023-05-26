import { useUserStore } from '@/stores/user'
import { createPinia, setActivePinia } from 'pinia'

describe('state', () => {
  beforeEach(() => {
    /*
    Using setActivePinia allows us to leave useUserStore() as it is, without arguments.
    Otherwise we'd have to provide the store each time.
    */
    setActivePinia(createPinia())
  })

  it("keeps track if the user's logged in", () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })
})

describe('actions', () => {
  beforeEach(() => {
    /*
    Using setActivePinia allows us to leave useUserStore() as it is, without arguments.
    Otherwise we'd have to provide the store each time.
    */
    setActivePinia(createPinia())
  })
  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.loginUser()
      expect(store.isLoggedIn).toBe(true)
    })
  })
})
