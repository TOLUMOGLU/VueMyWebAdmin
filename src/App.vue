<template>
  <v-app>
    <HeaderComp v-if="!isAuthPage" />

    <v-main class="fill-height">
      <router-view />
    </v-main>

    <FooterComp v-if="!isAuthPage" />
  </v-app>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'

export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp
  },
  setup() {
    const route = useRoute()

    const isAuthPage = computed(() => route.name === 'login')

    return { isAuthPage }
  }
}
</script>
