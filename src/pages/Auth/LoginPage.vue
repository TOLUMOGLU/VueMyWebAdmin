<template>
  <div class="login-wrapper d-flex align-center justify-center fill-height">
    <v-sheet
      class="pa-6"
      max-width="700"
      min-width="400"
      elevation="10"
      rounded
      style="background-color: white;"
    >
      <div class="text-center mb-6">
        <v-icon color="primary" size="48">mdi-account-circle</v-icon>
        <h2 class="font-weight-medium mt-2">Welcome Back</h2>
        <p class="text-subtitle-2 text-grey-darken-1">Please log in to your account</p>
      </div>

      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="userName"
          :rules="rules"
          label="Username"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="rules"
          label="Password"
          prepend-inner-icon="mdi-lock"
          type="password"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <v-btn
          :loading="loading"
          class="mt-4"
          color="primary"
          block
          type="submit"
        >
          Log In
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const userName = ref('')
const password = ref('')

const rules = [
  v => !!v || 'This field is required.'
]

async function submit() {
  loading.value = true
  try {
    const success = await userStore.login(userName.value, password.value)
    if (success) {
      alert('Giriş başarılı! Hoşgeldin ' + userName.value + ' 😊')
      router.push('/dashboard')
    } else {
      alert('Kullanıcı adı veya şifre yanlış!')
    }
  } catch (error) {
    alert('Sunucu hatası, lütfen tekrar deneyin.')
  } finally {
    loading.value = false
  }
}

</script>


<style scoped>
.login-wrapper {
  background: linear-gradient(to right, #79d3f7, #acb6e5);
}
</style>
