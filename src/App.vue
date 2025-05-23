<template>
  <v-app>
    <!-- layout da olsun burada sadece router-view gelsin  -->
    <HeaderComp/>
    <v-main :class="'fill-height'">
      <router-view />
    </v-main>
    
    <FooterComp/>
  </v-app>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'

export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp
  },
}
</script>
