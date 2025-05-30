<template>
  <v-app-bar app color="white" elevation="1" class="pa-2">
    <v-row no-gutters class="w-100 align-center justify-space-between ma-0">
      
      <v-col cols="12" md="4" class="d-flex align-center justify-start pa-0">
        <div class="d-flex align-center flex-wrap ml-2 ml-md-4">
          <span class="text-h6 text-md-h4 font-weight-bold mr-2">
            Azime Tolumoğlu
          </span>
          <span class="text-subtitle-2 text-md-subtitle-1 font-weight-light">
            / SOFTWARE ENGINEER
          </span>
        </div>
      </v-col>

      <v-col cols="12" md="8" class="d-none d-md-flex justify-end align-center pa-0">
        <v-btn variant="text" color="black" @click="$emit('navigate', 'about-me')">ABOUT ME</v-btn>
        <v-btn variant="text" color="black" @click="$emit('navigate', 'resume')">RESUME</v-btn>
        <v-btn variant="text" color="black" @click="$emit('navigate', 'projects')">PROJECTS</v-btn>
        <v-btn variant="text" color="black" @click="$emit('navigate', 'contact')">CONTACT</v-btn>
        <v-btn variant="text" color="black" @click="logout">LOG-OUT</v-btn>
      </v-col>

      <v-col cols="12" class="d-flex d-md-none justify-end align-center pa-0">
        <v-btn icon @click="drawer = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      class="d-md-none"
    >
      <v-list nav>
        <v-list-item @click="$emit('navigate', 'about-me'); drawer = false">
          <v-list-item-title>ABOUT ME</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('navigate', 'resume'); drawer = false">
          <v-list-item-title>RESUME</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('navigate', 'projects'); drawer = false">
          <v-list-item-title>PROJECTS</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('navigate', 'contact'); drawer = false">
          <v-list-item-title>CONTACT</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>LOG-OUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore' 
import router from '@/router';

const drawer = ref(false)

async function logout() {
  const logoutstore = useUserStore();
  logoutstore.logout();
  router.push("/"); 
}
</script>

<style scoped>
.v-btn:focus,
.v-btn:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
</style>
