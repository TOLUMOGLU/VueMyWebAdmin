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
import { ref, onMounted} from 'vue'
import { useContactStore } from '@/stores/contactStore'

// Tablo başlıkları
const headers = [
  { title: 'Ad Soyad', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Mesaj', value: 'message' },
]

const store = useContactStore()
const contacts = ref([])

const loadData = async () => {
  await store.fetchContacts()
  contacts.value = store.contacts.map(contact => ({
    ...contact,
    isEditing: false
  }))
}
onMounted(() => {
  loadData()

})

</script>
