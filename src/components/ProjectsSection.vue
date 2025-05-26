<template>
  <v-container fluid class="pa-0" style="background-color: #f2eae3; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <!-- Başlık -->
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Projects</strong></h1>
      </v-col>

      <!-- Açıklama -->
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text”
          or double click me to add your own content and make changes to the font.
        </p>
      </v-col>

      <!-- Proje Kartları -->
      <v-col
        v-for="(project, index) in projects"
        :key="index"
        cols="12"
        md="10"
        lg="8"
        class="mb-6 pa-4 text-left"
      >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text>
            <v-row>
              <!-- Sol taraf -->
              <v-col cols="12" md="6" class="pa-6">
                <div v-if="!project.editing">
                  <v-card-title class="text-h6 pa-4">{{ project.title }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-4">{{ project.role }}</v-card-subtitle>
                  <p class="pa-4">{{ project.description }}</p>
                </div>
                <div v-else>
                  <v-text-field v-model="project.title" label="Project Title" class="pa-2" />
                  <v-text-field v-model="project.role" label="Role Title" class="pa-2" />
                  <v-textarea v-model="project.description" label="Description" class="pa-2" />
                </div>

                <!-- Butonlar -->
                <v-btn
                  v-if="!project.editing"
                  color="primary"
                  class="ma-2"
                  @click="project.editing = true"
                >
                  Düzenle
                </v-btn>
                <v-btn
                  v-else
                  color="success"
                  class="ma-2"
                  @click="saveProject(index)"
                >
                  Kaydet
                </v-btn>
                <v-btn
                  color="error"
                  class="ma-2"
                  @click="deleteProject(index)"
                >
                  Sil
                </v-btn>
              </v-col>

              <!-- Sağ taraf -->
              <v-col cols="12" md="6" class="d-flex align-center justify-end">
                <img
                  class="pa-0"
                  :src="project.image"
                  alt="Project image"
                  style="max-width: 100%; height: auto;"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'

const projects = reactive([
  {
    title: 'Project name 01',
    role: 'Role Title',
    description: 'Click here to add your own text and edit me.',
    image: 'https://avatars.mds.yandex.net/i?id=2a00000179f5ece0391cd85e6c09c8dfb4fb-4914134-images-thumbs&n=13',
    editing: false,
  },
  {
    title: 'Project name 02',
    role: 'Role Title',
    description: 'Click here to add your own text and edit me.',
    image: 'https://avatars.mds.yandex.net/i?id=2a00000179f5ece0391cd85e6c09c8dfb4fb-4914134-images-thumbs&n=13',
    editing: false,
  },
  {
    title: 'Project name 03',
    role: 'Role Title',
    description: 'Click here to add your own text and edit me.',
    image: 'https://avatars.mds.yandex.net/i?id=2a00000179f5ece0391cd85e6c09c8dfb4fb-4914134-images-thumbs&n=13',
    editing: false,
  },
])

const saveProject = (index) => {
  projects[index].editing = false
}

const deleteProject = (index) => {
  projects.splice(index, 1)
}
</script>
