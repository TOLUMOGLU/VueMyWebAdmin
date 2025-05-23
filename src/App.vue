<template>
  <v-app>
    <!-- Sadece kullanıcı login ise header ve footer göster -->
    <HeaderComp v-if="showLayout" />
    
    <!-- router-view her zaman görünsün, eğer layout yoksa tam ekran olsun -->
    <v-main :class="showLayout ? '' : 'fill-height'">
      <router-view />
    </v-main>
    
    <FooterComp v-if="showLayout" />
  </v-app>
</template>

<script>
import { computed } from 'vue'
import { useUserStore } from './stores/userStore'  // Pinia store yolunu kendi projenize göre ayarlayın
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'

export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp
  },
  setup() {
    const userStore = useUserStore()

    // login durumuna göre layout gösterilsin
    const showLayout = computed(() => userStore.isLoggedIn)

    return { showLayout }
  }
}
</script>
