<template>
  <v-container fluid class="pa-0" style="background-color: white; height: 100vh; width: 100vw; position: relative;">
  <v-card
    elevation="6"
    class="overflow-hidden pa-4"
    style="border-radius: 12px; position: absolute; top: 50%; left: 0; width: 100%; transform: translateY(-50%);">
     <form @submit.prevent="submit">
    <v-row class="d-flex justify-center pa-4" style="gap: 15px;">
      <v-text-field
        v-model="state.firstName"
        :counter="10"
        :error-messages="v$.firstName.$errors.map(e => e.$message)"
        label="First Name *"
        required
        @blur="v$.firstName.$touch"
        @input="v$.firstName.$touch"
      ></v-text-field>
      <v-text-field
        v-model="state.lastName"
        :counter="10"
        :error-messages="v$.lastName.$errors.map(e => e.$message)"
        label="Last Name *"
        required
        @blur="v$.lastName.$touch"
        @input="v$.lastName.$touch"
      ></v-text-field>
    </v-row>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="E-mail *"
      required
      @blur="v$.email.$touch"
      @input="v$.email.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :items="items"
      :error-messages="v$.select.$errors.map(e => e.$message)"
      label="Item"
      required
      @blur="v$.select.$touch"
      @change="v$.select.$touch"
    ></v-select>

    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="message"
          :append-icon="message ? 'mdi-send' : 'mdi-microphone'"
          :append-inner-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
          :prepend-icon="icon"
          clear-icon="mdi-close-circle"
          label="Message"
          type="text"
          variant="filled"
          clearable
          @click:append="sendMessage"
          @click:append-inner="toggleMarker"
          @click:clear="clearMessage"
          @click:prepend="changeIcon"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-checkbox 
      v-model="state.checkbox"
      :error-messages="v$.checkbox.$errors.map(e => e.$message)"
      label="Do you agree?"
      required
      @blur="v$.checkbox.$touch"
      @change="v$.checkbox.$touch"
    ></v-checkbox>

    <v-btn 
      type="submit"
      class="me-4"
    >
      Submit
    </v-btn>
    <v-btn
      type="button"
      @click="clear"
    >
      Clear
    </v-btn>
  </form>
  </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

// checkbox için özel validator (checkbox true olmalı)
const requiredTrue = helpers.withMessage('You must agree', value => value === true)

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  select: null,
  checkbox: false,
}

const state = reactive({ ...initialState })

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  select: { required },
  checkbox: { requiredTrue }
}

const icons = [
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',
]

const v$ = useVuelidate(rules, state)

const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const icon = computed(() => icons[iconIndex.value])

function toggleMarker() {
  marker.value = !marker.value
}

function sendMessage() {
  resetIcon()
  clearMessage()
}

function clearMessage() {
  message.value = ''
}

function resetIcon() {
  iconIndex.value = 0
}

function changeIcon() {
  iconIndex.value = (iconIndex.value === icons.length - 1) ? 0 : iconIndex.value + 1
}

async function submit() {
  const isValid = await v$.value.$validate()
  if (isValid) {
    alert('Form is valid! Gönderim yapılabilir.')
    // API çağrısı vs burada yapılabilir
  } else {
    alert('Formda hatalar var, lütfen düzeltin.')
  }
}

function clear() {
  v$.value.$reset()
  Object.assign(state, initialState)
  clearMessage()
  resetIcon()
}
</script>
