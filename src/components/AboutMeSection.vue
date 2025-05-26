<template>
  <v-container
    fluid
    class="pa-0 d-flex align-center justify-center"
    style="background: linear-gradient(to right, #f2eae3 33.3%, white 33.3%); min-height: 100vh;"
  >
    <v-col class="pa-12" cols="12" md="10" style="height: auto;">
      <v-row no-gutters style="height: 100%;">
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-center justify-center pa-8 ma-0"
          style="background-color: #e6dace; min-height: 60vh; position: relative; border-radius: 0;"
        >
          <v-img
            src="https://avatars.mds.yandex.net/i?id=2a00000179f5ece0391cd85e6c09c8dfb4fb-4914134-images-thumbs&n=13"
            alt="Azime Tolumoğlu"
            class="mb-4 pa-2 pa-md-6"
            cover
            style="border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 150px; max-height: 150px; width: 100%; height: auto;"
          ></v-img>

          <div class="text-center pa-2 pa-md-6">
            <h2 v-if="!isEditing" class="mb-1 font-weight-bold text-black">{{ name }}</h2>
            <v-text-field v-else v-model="name" label="Ad" hide-details dense style="min-width: 250px;"></v-text-field>

            <h2 v-if="!isEditing" class="mb-3 font-weight-bold text-black">{{ surname }}</h2>
            <v-text-field v-else v-model="surname" label="Soyad" hide-details dense style="min-width: 250px;"></v-text-field>

            <h3 v-if="!isEditing" class="mb-3 font-italic">{{ title }}</h3>
            <v-text-field v-else v-model="title" label="Ünvan" hide-details dense style="min-width: 250px;"></v-text-field>
          </div>

          <div
            class="d-flex justify-center align-center"
            style="gap: 16px; background-color: white; width: 100%; margin-top: auto; padding: 0; position: absolute; bottom: 0; left: 0; border-top: 1px solid #a99f8f; border-radius: 0 0 12px 12px;"
          >
            <v-btn icon variant="text" href="https://www.linkedin.com/in/azime-tolumo%C4%9Flu/" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="https://github.com/TOLUMOGLU" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'github']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="https://medium.com/@tolumogluazime2" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="mailto:info@mysite.com" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="8" class="pa-4 text-left" style="height: 100%;">
          <h1 class="pa-2"><strong>Hello</strong></h1>
          <h2 class="mb-4 pa-2">Here's who I am &amp; what I do</h2>

          <div class="d-flex justify-start mb-4 pa-2" style="gap: 20px;">
            <v-btn color="primary" href="#resume" rounded>Resume</v-btn>
            <v-btn href="#projects" rounded>Projects</v-btn>
          </div>

          <p v-if="!isEditing" class="pa-2">{{ description }}</p>
          <v-textarea v-else v-model="description" class="pa-2" auto-grow label="Hakkımda" outlined></v-textarea>

          <div class="d-flex pa-2" style="gap: 10px;">
            <v-btn v-if="!isEditing" color="primary" @click="editProfile">Düzenle</v-btn>
            <template v-else>
              <v-btn color="success" @click="saveProfile">Kaydet</v-btn>
              <v-btn color="error" @click="cancelEdit">İptal</v-btn>
            </template>
          </div>
        </v-col>

      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const isEditing = ref(false)

const name = ref('Azime')
const surname = ref('Tolumoğlu')
const title = ref('SOFTWARE ENGINEER')
const description = ref(`I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.`)

// Orijinal verileri sakla
const original = {
  name: name.value,
  surname: surname.value,
  title: title.value,
  description: description.value
}

function editProfile() {
  isEditing.value = true
}

function saveProfile() {
  isEditing.value = false
  original.name = name.value
  original.surname = surname.value
  original.title = title.value
  original.description = description.value
  // Buraya API isteği de eklenebilir
}

function cancelEdit() {
  name.value = original.name
  surname.value = original.surname
  title.value = original.title
  description.value = original.description
  isEditing.value = false
}
</script>
