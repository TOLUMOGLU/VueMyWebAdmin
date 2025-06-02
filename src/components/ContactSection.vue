<template>
  <v-container>
    <v-card elevation="3" class="pa-6">
      <v-card-title class="text-h6 font-weight-bold">Contact Başvuruları</v-card-title>
      <v-data-table
        :headers="headers"
        :items="contacts"
        class="elevation-1"
        density="comfortable"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.checkbox="{ item }">
          <v-icon :color="item.checkbox ? 'green' : 'red'">
            {{ item.checkbox ? 'mdi-check-circle' : 'mdi-close-circle' }}
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Tablo başlıkları
const headers = [
  { title: 'Ad', value: 'firstName' },
  { title: 'Soyad', value: 'lastName' },
  { title: 'Email', value: 'email' },
  { title: 'Seçilen', value: 'select' },
  { title: 'Mesaj', value: 'message' },
  { title: 'Onayladı mı?', value: 'checkbox' },
]

// Sahte veri örneği
const contacts = ref([
  {
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    select: 'Item 2',
    message: 'Merhaba!',
    checkbox: true,
  },
  {
    firstName: 'Zeynep',
    lastName: 'Demir',
    email: 'zeynep@example.com',
    select: 'Item 1',
    message: 'Yardım alabilir miyim?',
    checkbox: false,
  },
])
</script>
