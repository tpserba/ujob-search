<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-grey-1 px-8">
        <RouterLink to="/" class="flex h-full items-center text-xl">Corp Careers</RouterLink>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li class="ml-9 h-full first:ml-0" v-for="menuItem in menuItems" :key="menuItem.text">
              <RouterLink :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="h-ful ml-auto flex items-center">
          <ProfileImage v-if="userStore.isLoggedIn" />
          <ActionButton v-else :is-primary="false" text="Sign in" @click="loginUser" />
        </div>
      </div>
      <SubNav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from '@/components/shared/ActionButton.vue'
import ProfileImage from '@/components/navigation/ProfileImage.vue'
import SubNav from '@/components/navigation/SubNav.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    SubNav
  },
  data() {
    return {
      menuItems: [
        {
          text: 'Teams',
          url: '/'
        },
        {
          text: 'Location',
          url: '/'
        },
        {
          text: 'Life at Corp',
          url: '/'
        },
        {
          text: 'How we hire',
          url: '/'
        },
        {
          text: 'Students',
          url: '/'
        },
        {
          text: 'Jobs',
          url: '/jobs/results'
        }
      ]
    }
  },
  computed: {
    headerHeightClass() {
      return {
        'h-16': !this.userStore.isLoggedIn,
        'h-32': this.userStore.isLoggedIn
      }
    },
    ...mapStores(userUserStore)
  },
  methods: {
    loginUser() {
      this.userStore.isLoggedIn = true
    }
  }
}
</script>

<style></style>
