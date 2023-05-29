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

  it('stores orgs that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedOrgs).toEqual([])
  })

  it('stores job types that a user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
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

  describe('ADD_SELECTED_ORGS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGS(['org1', 'org2'])
      expect(store.selectedOrgs).toEqual(['org1', 'org2'])
    })
  })

  describe('ADD_SELECTED_JOB_TYPES', () => {})
})
